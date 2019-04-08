<template>
  <div>
    <a-spin  :spinning="pageLoading">
      <div v-show="!showData">
    <div  class="header-buttons-bar" style="padding-left: 5px">
      <a-button @click="back"size="small">返回</a-button>
    </div>
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
      <span slot="fxpcList" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showDataList('fxpcList',record)">{{text}}</a>
        </span>
      <span slot="fxpcwcList" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showDataList('fxpcwcList',record)">{{text}}</a>
        </span>
      <span slot="gwpcList" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showDataList('gwpcList',record)">{{text}}</a>
        </span>
      <span slot="gwpcwcList" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showDataList('gwpcwcList',record)">{{text}}</a>
        </span>
      <span slot="yhList" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showDataList('yhList',record)">{{text}}</a>
        </span>
      <span slot="zgList" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showDataList('zgList',record)">{{text}}</a>
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
    <div v-if="showData">
      <qiye-zicha-list v-if="dataType=='jc'" @back="()=>showData=false"></qiye-zicha-list>
      <yinhuan-list v-if="dataType=='yh'" @back="()=>showData=false"></yinhuan-list>
    </div>
    </a-spin>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import { initColumn } from '@/utils/tableColumnInit'
  import moment from 'moment'

  import QiyeZichaList from './QiyeZichaList.vue'
  import YinhuanList from './YinhuanList.vue'

  //修改以下获取store数据的getters 配置
  const getList='query_qiyezicha_list'                //获取table的list
  // const getSearchValues='getQiyeZiChaSearchValues'                //获取table的list
  // const getSelOpitons=''   //获取选择项的配置内容
  const getDetailById=''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqQiyeZichaQueryList'                   //查询列表

  export default {
    name:'queryZichaQiyeList',
    components:{
      QiyeZichaList,
      YinhuanList
    },
    data(){
      return{
        showData:false,
        dataType:'jc',
        pageLoading:false,
        //表格配置
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '企业名称',dataIndex: 'dwmc', width: '200px', align: 'left',titleAlign:'center'},
            {title: '风险排查数量', dataIndex: 'yhpcNum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'fxpcList'}},
            {title: '风险排查完成数量', dataIndex: 'yhpcwcNum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'fxpcwcList'}},
            {title: '岗位排查数量', dataIndex: 'gwpcNum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'gwpcList'}},
            {title: '岗位排查完成数量', dataIndex: 'gwpcwcNum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'gwpcwcList'}},
            {title: '自查隐患数量', dataIndex: 'yhNum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'yhList'}},
            {title: '隐患整改数量', dataIndex: 'yhzgNum', width: '100px', align: 'center',titleAlign:'center',scopedSlots: {customRender: 'zgList'}},
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
      this.pagination.total=this.query_qiyezicha_totalCount()
    },
    methods:{
      moment,
      ...mapGetters(['getQiyeZiChaSearchValues','query_qiyezicha_totalCount']),
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
          ...this.getQiyeZiChaSearchValues()
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
      showDataList(type,record){
        this.pageLoading=true
        const searchVlaues= {...this.getQiyeZiChaSearchValues()}
        searchVlaues.param1=record.departmentId
        switch (type){
          case 'fxpcList':
            searchVlaues.param2=16
            this.$store.dispatch('reqQiyeZichaInfoList',searchVlaues)
              .then((res)=>{
                if(res.success){
                  if(res.data.length>0){
                    this.pageLoading=false
                    this.showData=true
                    this.dataType='jc'
                  }else{
                    this.$error({
                      title:"没有符合要求的结果！",
                      content:"请重新设置搜索条件！"
                    })
                    this.pageLoading=false
                  }
                }else{
                  this.$message.error(res.message)
                  this.pageLoading=false
                }
              })
              .catch(err=>{
                console.log(JSON.stringify(err))
                this.pageLoading=false
              })
            break
          case 'fxpcwcList':
            searchVlaues.param2=16
            searchVlaues.param3=1
            this.$store.dispatch('reqQiyeZichaInfoList',searchVlaues)
              .then((res)=>{
                if(res.success){
                  if(res.data.length>0){
                    this.pageLoading=false
                    this.showData=true
                    this.dataType='jc'
                  }else{
                    this.$error({
                      title:"没有符合要求的结果！",
                      content:"请重新设置搜索条件！"
                    })
                    this.pageLoading=false
                  }
                }else{
                  this.$message.error(res.message)
                  this.pageLoading=false
                }
              })
              .catch(err=>{
                console.log(JSON.stringify(err))
                this.pageLoading=false
              })
            break
          case 'gwpcList':
            searchVlaues.param2=17
            this.$store.dispatch('reqQiyeZichaInfoList',searchVlaues)
              .then((res)=>{
                if(res.success){
                  if(res.data.length>0){
                    this.pageLoading=false
                    this.showData=true
                    this.dataType='jc'
                  }else{
                    this.$error({
                      title:'没有符合要求的结果！',
                      content:'请重新设置搜索条件！'
                    })
                    this.pageLoading=false
                  }
                }else{
                  this.$message.error(res.message)
                  this.pageLoading=false
                }
              })
              .catch(err=>{
                console.log(JSON.stringify(err))
                this.pageLoading=false
              })
            break
          case 'gwpcwcList':
            searchVlaues.param2=17
            searchVlaues.param3=1
            this.$store.dispatch('reqQiyeZichaInfoList',searchVlaues)
              .then((res)=>{
                if(res.success){
                  if(res.data.length>0){
                    this.pageLoading=false
                    this.showData=true
                    this.dataType='jc'
                  }else{
                    this.$error({
                      title:'没有符合要求的结果！',
                      content:'请重新设置搜索条件！'
                    })
                    this.pageLoading=false
                  }
                }else{
                  this.$message.error(res.message)
                  this.pageLoading=false
                }
              })
              .catch(err=>{
                console.log(JSON.stringify(err))
                this.pageLoading=false
              })
            break
          case 'yhList':
            this.$store.dispatch('reqQiyeZichaYinhuanList',searchVlaues)
              .then((res)=>{
                if(res.success){
                  if(res.data.length>0){
                    this.pageLoading=false
                    this.showData=true
                    this.dataType='yh'
                  }else{
                    this.$error({
                      title:"没有符合要求的结果！",
                      content:"请重新设置搜索条件！"
                    })
                    this.pageLoading=false
                  }
                }else{
                  this.$message.error(res.message)
                  this.pageLoading=false
                }
              })
              .catch(err=>{
                console.log(JSON.stringify(err))
                this.pageLoading=false
              })
            break
          case 'zgList':
            searchVlaues.param2=1
            this.$store.dispatch('reqQiyeZichaYinhuanList',searchVlaues)
              .then((res)=>{
                if(res.success){
                  if(res.data.length>0){
                    this.pageLoading=false
                    this.showData=true
                    this.dataType='yh'
                  }else{
                    this.$error({
                      title:"没有符合要求的结果！",
                      content:"请重新设置搜索条件！"
                    })
                    this.pageLoading=false
                  }
                }else{
                  this.$message.error(res.message)
                  this.pageLoading=false
                }
              })
              .catch(err=>{
                console.log(JSON.stringify(err))
                this.pageLoading=false
              })
            break
        }
      },

      back(){
        this.$emit('back')
      }
    }
  }
</script>