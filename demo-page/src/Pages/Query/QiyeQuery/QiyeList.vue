<template>
  <div>
    <div  v-show="!showDetail">
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
          <a href="javascript:;" @click="showDetailFun(record)">查看详情</a>
          <a-divider v-if="" type="vertical" />
          <a href="javascript:;" @click="showModal('map',record)">位置</a>
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
          <!--<a href="javascript:;">删除</a>-->
          <!--</a-popconfirm>-->
          <!--<a href="javascript:;" @click="showModal('jc',record)">检查</a>-->
        </span>
        <span slot="jcYdCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('jcYdDetail',record)">{{text}}</a>
        </span>
        <span slot="jcJdCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('jcJdDetail',record)">{{text}}</a>
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
    <!--下面是弹出框-->
    <div>
      <a-modal
        :title="modalOption.title"
        @cancel="modalCancel"
        :visible="modalOption.visible"
        :destroyOnClose="true"
        :maskClosable="false"
        :wrapClassName="modalOption.modalClass"
        :width="modalOption.width"
        :style="modalOption.style"
        :bodyStyle="modalOption.bodyStyle"
      >

        <!--<edit-form-->
        <!--v-if="this.modalOption.modelType =='add'||this.modalOption.modelType =='edit'"-->
        <!--:selectOptions="modalOption.selectOptions"-->
        <!--:recordId="modalOption.recordId"-->
        <!--:modelType="modalOption.modelType"-->
        <!--ref="commitForm"/>-->

        <!--<data-detail-->
        <!--v-if="this.modalOption.modelType=='query'"-->
        <!--:recordId="modalOption.recordId" />-->

        <amap-modal
          v-if="modalOption.modelType=='map'"
          :recordId="modalOption.recordId"
          :recordGps="{lng:recordData.dwgpsj,lat:recordData.dwgpsw}"
          :height="modalOption.bodyStyle['max-height']"
          @closeMap="closeMap"
          :city="modalOption.mapCity"
          :default-center="modalOption.defaultCenter"
          :commitGpsAction="modalOption.commitGpsAction"/>

        <template slot="footer" >
          <a-button v-show="this.modalOption.modelType!='map'" key="back" @click="modalCancel" size="small">返 回</a-button>
          <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
            <!--<a-button v-show="this.modalOption.modelType!='query'&&this.modalOption.modelType!='map'" key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">提 交</a-button>-->
          <!--</a-popconfirm>-->
        </template>
      </a-modal>
    </div>

    <!--企业详情页面-->
    <div v-if="showDetail">
      <qiye-detail :QiyeId="modalOption.recordQyId" :recordId="modalOption.recordId" @return="() => showDetail=false"></qiye-detail>
    </div>


  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import { initColumn } from '@/utils/tableColumnInit'
  import moment from 'moment'
  import AmapModal from  '../../wryComps/AmapModal.vue'
  import QiyeDetail from '../../wryComps/QiyeDetail/index'

  const modalTitle="企业"   //模态框的title标题
  //修改以下获取store数据的getters 配置
  const getList='query_qiye_list'                //获取table的list
  // const getSearchValues='getQiyeZiChaSearchValues'                //获取table的list
  // const getSelOpitons=''   //获取选择项的配置内容
  const getDetailById='getQiyeJcQueryDetailById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqQiyeQueryList'                   //查询列表
  const editGpsAction='editXqqyGps'                  //修改Gps信息

  export default {
    name:'queryQiyeList',
    components:{
      QiyeDetail,
      AmapModal
    },
    data(){
      return{
        showDetail:false,
        //表格配置
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '企业名称',dataIndex: 'dwmc', width: '220px', align: 'left',titleAlign:'center'},
            {title: '单位类型', dataIndex: 'dwlx', width: '100px', align: 'center',titleAlign:'center'},
            {title: '单位地址', dataIndex: 'dwdz', width: '250px', align: 'left',titleAlign:'center'},
            // {title: '所属网格', dataIndex: 'nodeNm', width: '120px',align: 'center'},
            {title: '操作', dataIndex: 'actions', width: '120px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
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

        modalOption:{
          title:'',
          width:'85%',
          visible:false,
          // style:'top:0px ; padding-bottom:0px',
          bodyStyle:{
            "max-height":window.innerHeight-250 + 'px',
            "min-height":100
          },
          commitLoading:false,
          mapCity:'珠海',
          commitGpsAction:editGpsAction,
          defaultCenter:{
            lng:113.536232,
            lat:22.120977
          },
          selectOptions:{},
          recordId:'',
          recordQyId:'',
          modelType:'',
          modalClass:'nomal-modal'
        }
      }
    },
    computed:{
      recordData(){
        const recordData=this.$store.getters[getDetailById](this.modalOption.recordId)
        return !recordData ? '': recordData
      },
    },
    created(){
      // debugger
      this.table.dataSource=this.$store.getters[getList]
      this.table.dataSource.forEach((item,index)=>{
        item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
        // item.qylx0=item.qylx + (!item.qylx2 || item.qylx2=='' ? '': ' - ' + item.qylx2 )
      })
      this.pagination.total=this.query_qiye_totalCount()
      this.table.columns=initColumn(this.table.columns)
    },
    methods:{
      moment,
      ...mapGetters(['getQiyeSearchValues','query_qiye_totalCount']),
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

      showModal(type,record){
        switch (type) {
          case 'add':
            this.modalOption.title='新增'+ modalTitle
            this.modalOption.modelType='add'
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'query':
            //本页详情不采用modal
            this.modalOption.title=modalTitle+'详情'
            this.modalOption.modelType='query'
            this.modalOption.recordId=record.id
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'edit':
            this.modalOption.title='修改'+ modalTitle+'信息'
            this.modalOption.modelType='edit'
            this.modalOption.recordId=record.id
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'map':
            this.modalOption.title=modalTitle+'位置信息'
            this.modalOption.width='85%'
            this.modalOption.modelType='map'
            this.modalOption.recordId=record.id
            this.modalOption.modalClass ='nomal-modal mapModal'
            break
        }
        this.modalOption.visible=true
      },
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },
      showDetailFun(record){
        this.modalOption.recordId=record.id
        this.modalOption.recordQyId=record.autoid
        this.showDetail=true
      },
      back(){
        this.$emit('back')
      },
      closeMap(data){
        if (data=='post')this.reqTableData()
        this.modalOption.visible=false
      },
    }
  }
</script>