<template>
  <div :class="pageNmae+'model'" id="tableModal" style="height: 100%">
    <!--下面是表格区域，分为表格主体和分页器-->
    <div>
      <a-table
        bordered
        :rowClassName="rowClass"
        :dataSource="tableData"
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
          <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
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
      <div >
        <a-pagination
          v-model="pagination.current"
          style="margin-top: 8px; padding-left: 16px;float: left"
          :total="paginationTotal"
          :pageSizeOptions="pagination.pageSizeOptions"
          :pageSize="pagination.pageSize"
          showSizeChanger
          showQuickJumper
          :showTotal="total =>`共${total}条数据`"
          @change="changeCurrentPage"
          @showSizeChange="showSizeChange"
          size="small"/>
        <!--<a-button type="primary" style="float: right;margin-top: 8px; margin-bottom: 8px;margin-right: 16px" size="small" @click="emitCommit">确定选择</a-button>-->
        <a-popconfirm title="您确认删除这些记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
          <a-button type="primary" style="float: right;margin-top: 8px; margin-bottom: 8px;margin-right: 8px" size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>
        </a-popconfirm>
        <a-button  style="float: right;margin-top: 8px; margin-bottom: 8px;margin-right: 8px" size="small" @click="emitCancel">返回</a-button>
        <!--<p style="float: right;margin-top: 8px;margin-right: 16px" >共选择 {{table.rowSelection.selectedRowKeys.length}} 条</p>-->
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
        :bodyStyle="modalOption.bodyStyle"
      >
        <div id="innerTable">
          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="modalOption.table.dataSource"
            :columns="modalOption.table.columns"
            :pagination= "false"
            :size="modalOption.table.size"
            :loading="modalOption.table.tableIsLoading"
            :scroll="modalOption.table.scrollSize"
            :rowSelection="modalOption.table.rowSelection"
          >
        <span slot="actionCell" slot-scope="text,record,index" >
          <!--<a href="javascript:;" @click="showModal('query',record)">查看</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">
            <a href="javascript:;" >删除</a>
          </a-popconfirm>
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
        </div>


        <template  slot="footer" style="padding: 0 !important;">
          <a-button  key="back" @click="modalCancel" size="small">返 回</a-button>
          <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
            <a-button  key="submit" type="primary" :loading="modalOption.commitLoading"  size="small" @click="handleCommit">提 交</a-button>
          <!--</a-popconfirm>-->
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import editForm from './editForm'
  import dataDetail from './dataDetail'
  import AmapModal from  '../../wryComps/AmapModal.vue'
  import { initColumn } from '@/utils/tableColumnInit'

  const pageName='jxgl_jcbgl'
  const modalTitle="检查表条目"   //模态框的title标题

  const selOptions=[]          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation=''   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='jxgl_jcbsel_list'                //获取table的list
  const getSelOpitons=''   //获取选择项的配置内容
  const getDetailById=''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqJcbSelList'                   //查询列表
  const createAction='addJcbxm'             //新增记录
  const editAction=''                 //修改记录
  const delAction=''                   //删除
  const editGpsAction=''                  //修改Gps信息

  export default {
    name:pageName,
    props:{
      tableHeight:Number,
      jcbId:String,
      selData:{
        Array,
        default: function () {
          return []
        }
      },
    },
    components:{
      editForm,
      dataDetail,
      AmapModal
    },
    data(){
      return{
        pageTitle:modalTitle,
        pageNmae:pageName,
        selJcx:[],
        search:{
          placeholder:'',
          searchValue:''
        },
        table:{
          dataSource:[...this.selData],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '条目类型',dataIndex: 'tmlx', width: '80px', align: 'center'},
            {title: '检查类型', dataIndex: 'jclx0', width: '240px', align: 'left',titleAlign:'center'},
            {title: '检查内容', dataIndex: 'jcnr', width: '240px', align: 'left',titleAlign:'center'},
            {title: '检查依据', dataIndex: 'jcyj', width: '240px', align: 'left',titleAlign:'center'},
//            {title: '隐患提示', dataIndex: 'yhts', width: '150px',align: 'center'},
//            {title: '系统未落实提示', dataIndex: 'systs', width: '150px', align: 'center',},
//            {title: '所属组织', dataIndex: 'departName', width: '120px',align: 'center'},
             {title: '操作', dataIndex: 'actions', width: '60px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:950, y: window.innerHeight - 120},
          rowSelection:{
            selectedRowKeys: [],
            onChange: this.onSelectChange,
            columnWidth:'20px',
          },
//          rowSelection:null
        },
        pagination:{
          total:0,
          current:1,
          pageSize:20,
          pageSizeOptions:['5','10','20','50','100','500']
        },
        modalOption:{
          title:'',
          width:'85%',
          visible:false,
          bodyStyle:{
            "max-height":window.innerHeight-250 + 'px',
            "min-height":400
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
          modelType:'',
          modalClass:'nomal-modal',
          table:{
            dataSource:[],
            columns:[
              {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
              {title: '操作', dataIndex: 'actions', width: '50px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
              {title: '条目类型',dataIndex: 'tmlx', width: '80px', align: 'center'},
              {title: '检查类型', dataIndex: 'jclx', width: '100px', align: 'center'},
              {title: '检查内容', dataIndex: 'jcnr', width: '150px', align: 'center',},
              {title: '检查依据', dataIndex: 'jcyj', width: '150px', align: 'center',},
              {title: '隐患提示', dataIndex: 'yhts', width: '150px',align: 'center'},
              {title: '系统未落实提示', dataIndex: 'systs', width: '150px', align: 'center',},
              {title: '所属组织', dataIndex: 'departName', width: '120px',align: 'center'},
            ],
            size:'small',
            tableIsLoading:false,
            scrollSize: { x:1120, y: window.innerHeight - 120},
//            rowSelection:{
//              selectedRowKeys: [],
//              onChange: this.onSelectChange,
//              columnWidth:'20px',
//            },
          rowSelection:null
          },
        }
      }
    },
    computed:{
      recordData(){
        return this.$store.getters[getDetailById](this.modalOption.recordId)
      },
      tableData(){
        const start=(this.pagination.current-1)*this.pagination.pageSize
        const end=(this.pagination.current)*this.pagination.pageSize
        return this.table.dataSource.slice(start,end)
      },
      paginationTotal(){
          return this.table.dataSource.length
      }
    },
    beforeCreate(){
//        debugger
      //如果是测试环境，则设置以下localstorage
      if (process.env.NODE_ENV !== 'production'){
        const lsTemp= require('../../../temp/lsTemp')
        localStorage.setItem('/asrsajjdic',JSON.stringify(lsTemp.asrsajjdic))
        localStorage.setItem('/asrsajjfixsearch',JSON.stringify(lsTemp.asrsajjfixsearch))
      }},

    created(){
//      this.reqTableData()
      this.table.columns=initColumn(this.table.columns)
      this.modalOption.table.columns=initColumn( this.modalOption.table.columns)
    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
        window.onresize = function(){
        _this.modalOption.bodyStyle['max-height']= window.innerHeight -250+'px'
      }
        let modalHtml=document.getElementById('tableModal')
        modalHtml.getElementsByClassName('ant-table-body')[0].style.height=`${this.tableHeight-12}px`
        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
        const tmp=[]
        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item]})})
        this.$store.commit(selOptionMutation,tmp)
        this.modalOption.selectOptions=this.$store.getters[getSelOpitons]
      })
    },
    methods:{
      // ...mapGetters(['yingji_wz_list','yingji_wz_selOptions','getWzById']),
      // ...mapActions(['reqWzList','createYjwz','editYjwz','delYjwz','editYjwzGps']),
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },
      onSelectChange(selectedRowKeys){
        this.table.rowSelection.selectedRowKeys = selectedRowKeys
        this.modalOption.table.dataSource=[]
        selectedRowKeys.forEach((key)=>{
            const tmp={...this.table.dataSource.find(item=>item.key==key)}
            this.modalOption.table.dataSource.push(tmp)
        })
        this.modalOption.table.dataSource.sort((a,b)=>a.index-b.index)
        this.modalOption.table.dataSource.forEach((item,index) =>item.index=index+1)
      },
      refresh(){
        this.reqTableData()
      },
      onSearch(){
        alert('onSearch')
      },
      showModal(type,record){
        switch (type) {
          case 'add':
            this.modalOption.title='已选择'+this.table.rowSelection.selectedRowKeys.length +'条'
            this.modalOption.modelType='add'
            this.modalOption.modalClass ='nomal-modal table-modal'
            break;
          case 'query':
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
            this.modalOption.modelType='map'
            this.modalOption.recordId=record.id
            this.modalOption.modalClass ='nomal-modal mapModal'
            break
        }
        this.modalOption.visible=true
//        debugger
        let height=this.tableHeight
        setTimeout(function () {
//            debugger
          let modalHtml=document.getElementById('innerTable')
          let table=modalHtml.getElementsByClassName('ant-table-body')[0].style.height=height-12+'px'
        },100)

      },
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },
      closeMap(data){
        if (data=='post')this.reqTableData()
        this.modalOption.visible=false
      },
      emitCommit(){
        // debugger
        this.selJcx=[]
        this.table.rowSelection.selectedRowKeys.forEach((key)=>{
          this.selJcx.push(this.$store.getters.getJcbselById(key))
        })
        this.$emit('addJcx',[...this.selJcx])
        this.selJcx=[]
      },
      emitCancel(){
        this.selJcx=[]
        this.$emit('cancel')
      },

      handleCommit(){
        let parameter={
          jsonData:JSON.stringify({
            jcb:this.modalOption.table.dataSource
          }),
        }
        this.$store.dispatch(createAction,parameter).then((res)=>{
          if (res.success==true){
            this.$message.success('提交成功！')
           this.$emit('addSuccess')
          }else{
            this.$message.error(res.message+'请稍后再试！')
            this.modalOption.commitLoading=false
          }
        })
      },
      deleteRowData(record){
        if (record=='multi'){
            this.$emit('delSels',this.table.rowSelection.selectedRowKeys)
            this.table.rowSelection.selectedRowKeys.forEach((key)=>{
                const index=this.table.dataSource.findIndex(i=>key==i.key)
              this.table.dataSource.splice(index,1)
            })
          this.table.rowSelection.selectedRowKeys=[]
        }else{
          this.$emit('delSels',[record.key])
          const index=this.table.dataSource.findIndex(i=>record.key==i.key)
          this.table.dataSource.splice(index,1)
        }
        this.table.dataSource.forEach((item,index)=>item.index=index+1)


//          debugger
//          const index1=this.modalOption.table.dataSource.findIndex(item=>item.key==record.key)
//          this.modalOption.table.dataSource.splice(index1,1)
//          this.modalOption.table.dataSource.forEach((item,index)=>item.index=index+1)
//          const index2=this.table.rowSelection.selectedRowKeys.findIndex(item=>item==record.key)
//          this.table.rowSelection.selectedRowKeys.splice(index2,1)
//        let parameter={
//          param1:'',
//        }
//        let payload={
//          parameter:parameter,
//          type:''
//        }
//        if (record=='multi'){
//          payload.type='multi'
//          for (let i=0;i<this.table.rowSelection.selectedRowKeys.length-1;i++){
//            parameter.param1 +=this.table.rowSelection.selectedRowKeys[i]+','
//          }
//          parameter.param1 +=this.table.rowSelection.selectedRowKeys[this.table.rowSelection.selectedRowKeys.length-1]
//        }else{
//          parameter.param1=record.id
//        }
//        this.table.tableIsLoading=true
//        this.$store.dispatch(delAction,payload)
//          .then((res)=>{
//            if (res.success==true){
//              this.$message.success('删除成功！')
//              this.reqTableData()
//              this.table.tableIsLoading=false
//            }else{
//              this.$message.error(res.message+'请稍后再试！')
//              this.table.tableIsLoading=false
//            }
//          })
//          .catch((err)=>{
//            console.log(JSON.stringify(err))
//            this.table.tableIsLoading=false
//          })
      },
      reqTableData(){
        this.table.tableIsLoading=true
        const parameter={
          limit:10000,
          start:0,
          param3:this.jcbId
        }
        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            // debugger
            this.table.dataSource=this.$store.getters[getList]

            this.nowData.forEach((data)=>{
              const index =this.table.dataSource.findIndex(i=>i.id=data.id)
              if (index>-1){
//                  debugger
                this.table.dataSource.splice(index,1)
              }
            })
            this.table.dataSource.forEach((item,index)=>{
                item.jclx0= item.jclx +'- '+ item.jclx2
                item.index=index+1
            })
            this.pagination.total=this.table.dataSource.length
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      changeCurrentPage(page, pageSize){
        this.pagination.current=page
        this.pagination.pageSize=pageSize
        // this.reqTableData()
      },
      showSizeChange(current, size){
        const start=(this.pagination.current-1 )* this.pagination.pageSize
        if(start==0){
          this.pagination.current=1
        }else{
          this.pagination.current= Math.ceil(start/size)
        }
        this.pagination.pageSize=size
        // this.reqTableData()
      },
    }
  }

</script>