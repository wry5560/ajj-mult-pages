<template>
  <div>
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
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
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

    <!--下面是弹出框-->
    <div>
      <a-modal
        :title="modalOption.title"
        @cancel="modalCancel"
        :style="modalOption.style"
        :visible="modalOption.visible"
        :destroyOnClose="true"
        :maskClosable="false"
        :wrapClassName="modalOption.modalClass"
        :width="modalOption.width"
        :bodyStyle="modalOption.bodyStyle"
      >
        <a-spin  :spinning="modalLoading">

          <!--页面特殊组件-->
          <!--<jc-form v-if="modalOption.modelType =='jc'" :showTree="false" @cancel="modalCancel" :departmentId="modalOption.recordId" :recordId="modalOption.recordId" :height="modalOption.bodyStyle.height" />-->

          <jc-detail :showTree="false" :jcType="modalOption.jcType"  @cancel="modalCancel" :departmentId="modalOption.recordId"  :recordId="modalOption.recordId" :height="modalOption.bodyStyle.height"/>

          <!--基础增删组件-->
          <!--<edit-form-->
          <!--v-if="modalOption.modelType =='add'||modalOption.modelType =='edit'"-->
          <!--:selectOptions="modalOption.selectOptions"-->
          <!--:recordId="modalOption.recordId"-->
          <!--:modelType="modalOption.modelType"-->
          <!--ref="commitForm"/>-->
          <!--<data-detail-->
          <!--v-if="modalOption.modelType=='query'"-->
          <!--:recordId="modalOption.recordId" />-->

        </a-spin>
        <template slot="footer" >
          <a-button v-show="modalOption.modelType!='jc'" key="back" @click="modalCancel" size="small">返 回</a-button>
          <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
          <!--<a-popconfirm title="您确认导出当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="exportJcdDetail">-->
            <!--<a-button v-show="modalOption.modelType !='jc'" key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">提 交</a-button>-->
            <!--<a-button v-show="modalOption.modelType=='jc'" key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">导出现场检查单</a-button>-->
          <!--</a-popconfirm>-->
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import { initColumn } from '@/utils/tableColumnInit'
  import moment from 'moment'

  import jcDetail from '@/Pages/Jc/comps/jcDetail.vue'

  const modalTitle="检查"   //模态框的title标题通用变量

  //修改以下获取store数据的getters 配置
  const getList='query_qiyejc_jclist'                //获取table的list
  // const getSearchValues='getQiyeZiChaSearchValues'                //获取table的list
  // const getSelOpitons=''   //获取选择项的配置内容
  const getDetailById=''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqQiyeJcInfoList'                   //查询列表

  export default {
    name:'queryJcList',
    components:{
      jcDetail
    },
    data(){
      return{
        modalLoading:false,
        //表格配置
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '检查单号',dataIndex: 'jcno', width: '200px', align: 'left',titleAlign:'center'},
            {title: '企业名称',dataIndex: 'dwmc', width: '250px', align: 'left',titleAlign:'center'},
            // {title: '企业类型', dataIndex: 'qylx0', width: '250px', align: 'left',titleAlign:'center'},
            {title: '安全负责人', dataIndex: 'safefzr', width: '100px', align: 'left',titleAlign:'center'},
            {title: '安全负责人电话', dataIndex: 'safefzrlxfs', width: '120px', align: 'center',titleAlign:'center'},
            {title: '检查单类型', dataIndex: 'jcdlx', width: '100px', align: 'center',titleAlign:'center'},
//            {title: '隐患数/整改数', dataIndex: 'yhzg', width: '120px', align: 'center',titleAlign:'center'},
            {title: '检查时间', dataIndex: 'jctimeend', width: '100px', align: 'center',titleAlign:'center'},
            {title: '检查人', dataIndex: 'jcuser', width: '120px', align: 'left',titleAlign:'center'},
            {title: '要求整改时间', dataIndex: 'yqzgsj', width: '120px', align: 'center',titleAlign:'center'},
            {title: '复查时间', dataIndex: 'fctime', width: '100px', align: 'center',titleAlign:'center'},
            {title: '复查结果', dataIndex: 'fcjg', width: '80px', align: 'center',titleAlign:'center'},
            {title: '操作', dataIndex: 'actions', width: '80px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
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

        //弹出框配置
        modalOption:{
          style:{top:'20px'},
          title:'',
          width:'95%',
          visible:false,
          bodyStyle:{
//              "max-height":window.innerHeight-80 + 'px',
            "height":window.innerHeight-80 + 'px',
            'padding':0
//              "min-height":window.innerHeight-80 + 'px',
          },
          commitLoading:false,
          mapCity:'珠海',
          commitGpsAction:'',
          defaultCenter:{
            lng:113.536232,
            lat:22.120977
          },
          selectOptions:{},
          recordId:'',
          departmentId:'',
          modelType:'',
          jcType:'',
          modalClass:'nomal-modal'
        }
      }
    },
    created(){
      // debugger
      this.table.dataSource=this.$store.getters[getList]
      this.table.dataSource.forEach((item,index)=>{
        item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
        item.jctimeend=item.jctimeend? moment(item.jctimeend).format('YYYY-MM-DD HH:ss'):''
        item.yqzgsj=item.yqzgsj?  moment(item.yqzgsj).format('YYYY-MM-DD HH:ss'):''
        item.fctime=item.fctime?  moment(item.fctime).format('YYYY-MM-DD HH:ss'):''
        item.yhzg=item.yhnum ? item.yhnum + '/'+ item.yzgnum :'- / -'
        // item.qylx0=item.qylx + (!item.qylx2 || item.qylx2=='' ? '': ' - ' + item.qylx2 )
      })
      this.pagination.total=this.query_qiyejc_jcTotalCount()

      this.table.columns=initColumn(this.table.columns)
    },
    methods:{
      moment,
      ...mapGetters(['getQiyeJcSearchValues','query_qiyejc_jcTotalCount']),
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

      //-----------------------------------------------弹出框通用方法------------------------------

      showModal(type,record){
        switch (type) {
          //常用的增删改查
          case 'add':
            this.modalOption.title='新增'+ modalTitle
            this.modalOption.modelType='add'
//            this.modalOption.width=''                             //修改弹出框的宽度
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'query':
            this.modalOption.title=modalTitle+'详情'
            this.modalOption.modelType='query'
            this.modalOption.recordId=record.jcid
            this.modalOption.bodyStyle.height=window.innerHeight-120 + 'px'
            this.modalOption.width='70%'
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'edit':
            this.modalOption.title='修改'+ modalTitle+'信息'
            this.modalOption.modelType='edit'
            this.modalOption.recordId=record.id
            this.modalOption.bodyStyle.height=window.innerHeight-120 + 'px'
            this.modalOption.modalClass ='nomal-modal '
            break;
          case 'map':
            this.modalOption.title=modalTitle+'位置信息'
            this.modalOption.modelType='map'
            this.modalOption.recordId=record.id
            this.modalOption.modalClass ='nomal-modal mapModal'
            break

        }
        this.modalOption.visible=true
      },
      modalCancel(type){
        if(type=='success') {
          this.refresh()
          setTimeout(()=>{
            this.modalLoading=false
            this.modalOption.visible=false
          },100)
        }else{
          this.modalLoading=false
          this.modalOption.visible=false
        }
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
              item.jctimeend=item.jctimeend? moment(item.jctimeend).format('YYYY-MM-DD HH:ss'):''
              item.yqzgsj=item.yqzgsj?  moment(item.yqzgsj).format('YYYY-MM-DD HH:ss'):''
              item.fctime=item.fctime?  moment(item.fctime).format('YYYY-MM-DD HH:ss'):''
              item.yhzg=item.yhnum ? item.yhnum + '/'+ item.yzgnum :'- / -'
              // item.qylx0=item.qylx + (!item.qylx2 || item.qylx2=='' ? '': ' - ' + item.qylx2 )

            })
            this.pagination.total=res.totalCount
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      back(){
        this.$emit('back')
      }
    }
  }
</script>