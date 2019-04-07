<template>
  <div>
    <a-table
      bordered
      :rowClassName="rowClass"
      :dataSource="table.dataSource"
      :columns="table.columns"
      :pagination= "false"
      :size="table.size"
      :loading="table.tableIsLoading"
      :scroll="table.scrollSize"
      :rowSelection="table.rowSelection"
    >
        <span slot="actionCell" slot-scope="text,record,index" >
          <!--<a href="javascript:;" @click="showModal('query',record)">查看</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
          <!--<a href="javascript:;">删除</a>-->
          <!--</a-popconfirm>-->
          <!--<a href="javascript:;" @click="showModal('jc',record)">检查</a>-->
        </span>
      <span slot="jcCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('jcList',record)">{{text}}</a>
        </span>
      <span slot="fcCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('fcList',record)">{{text}}</a>
        </span>
      <span slot="fcwcCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('fcwcList',record)">{{text}}</a>
        </span>
      <span slot="yhCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('yhList',record)">{{text}}</a>
        </span>
      <span slot="zgCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('zgList',record)">{{text}}</a>
        </span>
      <span slot="defaultcustomRender" slot-scope="text,record,index">
          <template>
            <a-tooltip :mouseEnterDelay="0.8">
              <template slot='title'>
                {{text}}
              </template>
              <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{text}}</div>
            </a-tooltip>
          </template>
        </span>
    </a-table>
    <div class="bottom-pagination-warpper">
      <a-pagination
        v-model="pagination.current"
        style="float:right;"
        :total="pagination.total"
        :pageSizeOptions="pagination.pageSizeOptions"
        :pageSize="pagination.pageSize"
        showSizeChanger
        showQuickJumper
        :showTotal="total =>`共${total}条数据`"
        @change="changeCurrentPage"
        @showSizeChange="showSizeChange"
        size="small"/>
      <div style="clear: both"></div>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import { initColumn } from '@/utils/tableColumnInit'
  import moment from 'moment'

  //修改以下获取store数据的getters 配置
  const getList='query_qiyejc_list'                //获取table的list
  // const getSearchValues='getQiyeZiChaSearchValues'                //获取table的list
  // const getSelOpitons=''   //获取选择项的配置内容
  const getDetailById=''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqQiyeJcQueryList'                   //查询列表

  export default {
    name:'queryJcQiyeList',

    data(){
      return{

        //表格配置
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '企业名称',dataIndex: 'dwmc', width: '200px', align: 'left',titleAlign:'center'},
            {title: '安全负责人', dataIndex: 'safefzr', width: '100px', align: 'left',titleAlign:'center'},
            {title: '安全负责人电话', dataIndex: 'safefzrlxfs', width: '100px', align: 'center',titleAlign:'center'},
            {title: '检查数量', dataIndex: 'jcnum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'jcCell'}},
            {title: '复查数量', dataIndex: 'fcnum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'fcCell'}},
            {title: '复查完成数量', dataIndex: 'fcwcnum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'fcwcCell'}},
            {title: '隐患数量', dataIndex: 'jcyhnum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'yhCell'}},
            {title: '已整改数量', dataIndex: 'jcyhwcnum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'zgCell'}},
            // {title: '检查人员', dataIndex: 'jcuser', width: '100px', align: 'center',titleAlign:'center'},
            // {title: '复查人员', dataIndex: 'fcuser', width: '100px', align: 'center',titleAlign:'center'},
            // {title: '本年隐患数', dataIndex: 'bnyhnum', width: '80px', align: 'center',titleAlign:'center'},
            // {title: '本年已整改数', dataIndex: 'bnyzgnum', width: '80px', align: 'center',titleAlign:'center'},
            // {title: '操作', dataIndex: 'actions', width: '60px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:1450, y: window.innerHeight - 112},
//           rowSelection:{
//             selectedRowKeys: [],
//             onChange: this.onSelectChange,
//             columnWidth:'20px',
//           }
          rowSelection:null
        },

        //分页器配置
        pagination:{
          total:0,
          current:1,
          pageSize:30,
          pageSizeOptions:['10','20','30','50','100','500'],
          reqData: true                  //是否使用后台请求分页  为flase则为前端分页
        },
      }
    },
    created(){
      // debugger
      this.table.dataSource=this.$store.getters[getList]
      this.table.dataSource.forEach((item,index)=>{
        item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
        // item.qylx0=item.qylx + (!item.qylx2 || item.qylx2=='' ? '': ' - ' + item.qylx2 )
      })
      this.pagination.total=this.query_qiyejc_totalCount()

      this.table.columns=initColumn(this.table.columns)
    },
    methods:{
      moment,
      ...mapGetters(['getQiyeJcSearchValues','query_qiyejc_totalCount']),
      ...mapActions(['','']),

      //----------------------------------------------------表格通用方法--------------------------

      //单双行条纹样式
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      //带选择的表格选择项改变后回调
      onSelectChange(selectedRowKeys){
        this.table.rowSelection.selectedRowKeys = selectedRowKeys
      },

      //----------------------------------------------分页器通用方法------------------------------

      changeCurrentPage(page, pageSize){
        this.pagination.current=page
        this.pagination.pageSize=pageSize
        if(this.pagination.reqData)this.reqTableData()
      },

      showSizeChange(current, size){
        const start=(this.pagination.current-1 )* this.pagination.pageSize
        if(start==0){
          this.pagination.current=1
        }else{
          this.pagination.current= Math.ceil(start/size)
        }
        this.pagination.pageSize=size
        if(this.pagination.reqData)this.reqTableData()
      },
      //----------------------------------------------数据操作------------------------------------

      //请求表格数据
      reqTableData(filterOption){
        this.table.tableIsLoading=true
        const parameter={
          limit:this.pagination.reqData ? this.pagination.pageSize:10000,
          start:this.pagination.reqData ? (this.pagination.current -1)*this.pagination.pageSize:0,
          ...this.getQiyeJcSearchValues()
        }

        if (filterOption) parameter.filter = JSON.stringify(filterOption)       //增加搜索条件

        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            //请求成功后，在下面进行数据处理，赋值给table
            this.table.dataSource=this.$store.getters[getList]
            this.table.dataSource.forEach((item,index)=>{
              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
              // item.qylx0=item.qylx + (!item.qylx2 || item.qylx2=='' ? '': ' - ' + item.qylx2 )

            })
            this.pagination.total=res.totalCount
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
    }
  }
</script>