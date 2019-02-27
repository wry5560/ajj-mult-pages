<template>
  <div :class="pageNmae+'model'" style="height: 100%">
    <!--下面是表格区域，分为表格主体和分页器-->
    <div class="content-list">
      <div class="content-wrapper">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title"><span >选择</span>检查标准</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="table.dataSource.length" :showZero="true"/>
          <a-button  type="primary" style="margin-top: 8px;margin-bottom: 8px;margin-left: 16px;margin-right: 8px;" size="small" @click="showModal('add')">添加</a-button>
          <a-popconfirm title="您确认删除这些记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
            <a-button  size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>
          </a-popconfirm>
          <a-button-group style="margin-left: 8px">
            <a-button @click="sortUP" size="small" icon="up" style="margin-right: 0" :disabled="table.rowSelection.selectedRowKeys.length!=1"></a-button>
            <a-button @click="sortDown"size="small"  icon="down" :disabled="table.rowSelection.selectedRowKeys.length!=1"></a-button>
          </a-button-group>
          <span class="button-bar"></span>
        </div>
        <div class="content">
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
              v-if="table.dataSource.length>0"
              v-model="pagination.current"
              style="margin-top: 8px; padding-left: 16px;float: right;"
              :total="table.dataSource.length"
              :pageSizeOptions="pagination.pageSizeOptions"
              :pageSize="pagination.pageSize"
              showSizeChanger
              showQuickJumper
              :showTotal="total =>`共${total}条数据`"
              @change="changeCurrentPage"
              @showSizeChange="showSizeChange"
              size="small"/>

            <!--<a-button style="float: right;margin-top: 8px;margin-bottom: 8px;margin-right: 8px" size="small" @click="emitCancel">返 回</a-button>-->
            <!--<p style="float: right;margin-top: 8px;margin-right: 16px" >共选择 {{table.rowSelection.selectedRowKeys.length}} 条</p>-->
            <div style="clear: both"></div>
          </div>
        </div>
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
            :dataSource="modalTableData"
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
          <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
          <!--<a href="javascript:;">删除</a>-->
          <!--</a-popconfirm>-->
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
          <a-pagination
            v-model="modalOption.pagination.current"
            style="margin-top: 8px; margin-bottom: 8px;padding-left: 16px;float: left"
            :total="modalOption.pagination.total"
            :pageSizeOptions="modalOption.pagination.pageSizeOptions"
            :pageSize="modalOption.pagination.pageSize"
            showSizeChanger
            showQuickJumper
            :showTotal="total =>`共${total}条数据`"
            @change="changeModalCurrentPage"
            @showSizeChange="showModalSizeChange"
            size="small"/>
          <a-button  key="back" @click="modalCancel" style="margin-top: 8px;" size="small">返回</a-button>
          <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
          <a-button  key="submit" type="primary" style="margin-top: 8px;margin-right: 16px" :loading="modalOption.commitLoading"  size="small" @click="handleCommit">保存</a-button>
          <!--</a-popconfirm>-->
          <div style="clear: both;"></div>
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
  import moment from 'moment'

  const pageName='jxgl_zxjc_jcxquery'
  const modalTitle="检查标准"   //模态框的title标题

  const selOptions=[]          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation=''   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='jxgl_zxjcplan_jcxlist'                //获取table的list
  const getSelList='jxgl_zxjcsel_list'                //获取table的list
  const getSelOpitons=''   //获取选择项的配置内容
  const getDetailById=''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqZxjcplanJcxList'                   //查询列表
  const reqSelList='reqZxjcSelList'              //查询专项检查项列表
  const createAction='addZxjcplanJcx'             //新增记录
  const editAction=''                 //修改记录
  const delAction='delZxjcplanJcx'                   //删除
  const editGpsAction=''                  //修改Gps信息

  export default {
    name:'JcxTableForm',
    props:{
      recordId:String,
      tableHeight:Number,
      propModalType:String,
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
        search:{
          placeholder:'',
          searchValue:''
        },
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
//            {title: '条目类型',dataIndex: 'tmlx', width: '120px', align: 'center'},
            {title: '检查类型', dataIndex: 'jclx0', width: '180px', align: 'left',titleAlign:'center'},
            {title: '检查内容', dataIndex: 'jcnr', width: '200px', align: 'left',titleAlign:'center'},
            {title: '检查依据', dataIndex: 'jcyj', width: '200px', align: 'left',titleAlign:'center'},
//            {title: '隐患提示', dataIndex: 'yhts', width: '150px',align: 'center'},
//            {title: '系统未落实提示', dataIndex: 'systs', width: '150px', align: 'center',},
//            {title: '所属组织', dataIndex: 'departName', width: '120px',align: 'center'},
            {title: '操作', dataIndex: 'actions', width: '60px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:1120, y: window.innerHeight - 120},
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
          pageSize:10,
          pageSizeOptions:['10','20','50','100','500']
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
          modalType:'',
          modalClass:'nomal-modal',
          table:{
            dataSource:[],
            selData:[],
            columns:[
              {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
              {title: '条目类型', dataIndex: 'tmlx', width: '50px', align: 'center'},
              {title: '检查类型', dataIndex: 'jclx0', width: '150px', align: 'left',titleAlign:'center'},
              {title: '检查内容', dataIndex: 'jcnr', width: '150px', align: 'left',titleAlign:'center'},
              {title: '检查依据', dataIndex: 'jcyj', width: '150px', align: 'left',titleAlign:'center'},
//              {title: '隐患提示', dataIndex: 'yhts', width: '150px',align: 'center'},
//              {title: '系统未落实提示', dataIndex: 'systs', width: '150px', align: 'center',},
//              {title: '所属组织', dataIndex: 'departName', width: '120px',align: 'center'},
            ],
            size:'small',
            tableIsLoading:false,
            scrollSize: { x:1120, y: window.innerHeight - 120},
            rowSelection:{
              selectedRowKeys: [],
              onChange: this.onModalSelectChange,
              onSelect:this.onModalSelect,
              onSelectAll:this.onModalSelectAll,
              columnWidth:'20px',
            },
//          rowSelection:null
          },
          pagination:{
            total:0,
            current:1,
            pageSize:20,
            pageSizeOptions:['2','10','20','50','100','500']
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
      modalTableData(){
        const start=(this.pagination.current-1)*this.pagination.pageSize
        const end=(this.pagination.current)*this.pagination.pageSize
        return this.modalOption.table.dataSource.slice(start,end)
      }
    },
    beforeCreate(){
      //如果是测试环境，则设置以下localstorage
      if (process.env.NODE_ENV !== 'production'){
        const lsTemp= require('../../../temp/lsTemp')
        localStorage.setItem('/asrsajjdic',JSON.stringify(lsTemp.asrsajjdic))
        localStorage.setItem('/asrsajjfixsearch',JSON.stringify(lsTemp.asrsajjfixsearch))
      }},

    created(){
      if (this.propModalType=='edit'||this.propModalType=='query')this.reqTableData()
      this.table.columns=initColumn(this.table.columns)
      this.modalOption.table.columns=initColumn( this.modalOption.table.columns)
    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
        window.onresize = function(){
          _this.modalOption.bodyStyle['max-height']= window.innerHeight -250+'px'
        }
//        let modalHtml=document.getElementById('tableModal')
//        modalHtml.getElementsByClassName('ant-table-body')[0].style.height=`${this.tableHeight-12}px`
        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
        const tmp=[]
        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item]})})
        this.$store.commit(selOptionMutation,tmp)
        this.modalOption.selectOptions=this.$store.getters[getSelOpitons]
//        if (this.propModalType=='query'){
//          this.table.rowSelection=null
//          this.table.columns.splice(-1,1)
//        }
      })
    },
    methods:{
      moment,
      // ...mapGetters(['yingji_wz_list','yingji_wz_selOptions','getWzById']),
      // ...mapActions(['reqWzList','createYjwz','editYjwz','delYjwz','editYjwzGps']),
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },
      onSelectChange(selectedRowKeys){
        this.table.rowSelection.selectedRowKeys = selectedRowKeys
//        this.modalOption.table.dataSource=[]
//        selectedRowKeys.forEach((key)=>{
//            const tmp={...this.table.dataSource.find(item=>item.key==key)}
//            this.modalOption.table.dataSource.push(tmp)
//        })
//        this.modalOption.table.dataSource.sort((a,b)=>a.index-b.index)
//        this.modalOption.table.dataSource.forEach((item,index) =>item.index=index+1)
      },
      onModalSelectChange(selectedRowKeys){
        this.modalOption.table.rowSelection.selectedRowKeys = selectedRowKeys
//        this.modalOption.table.selData=[]
//        selectedRowKeys.forEach((key)=>{
//          const tmp={...this.modalOption.table.dataSource.find(item=>item.key==key)}
//          this.modalOption.table.selData.push(tmp)
//        })
      },
      onModalSelect(record, selected, selectedRows, nativeEvent){
        if(selected){
          this.modalOption.table.selData.push(record)
        }else{
          const index=this.modalOption.table.selData.findIndex(i=>i.key==record.key)
          this.modalOption.table.selData.splice(index,1)
        }
      },
      onModalSelectAll(selected, selectedRows, changeRows){
        if(selected){
          this.modalOption.table.selData=this.modalOption.table.selData.concat(changeRows)
        }else{
          changeRows.forEach((item)=>{
            const index=this.modalOption.table.selData.findIndex(i=>i.key==item.key)
            this.modalOption.table.selData.splice(index,1)
          })
        }
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
            this.modalOption.title='请选择检查项'
            this.modalOption.modalType='add'
            this.modalOption.modalClass ='nomal-modal table-modal no-footer'
//            debugger
            this.modalOption.table.rowSelection.selectedRowKeys=[]
            this.modalOption.pagination.current=1
            this.modalOption.table.selData=[]
            this.reqModalTableData()
//            this.table.dataSource.forEach(item=>this.modalOption.table.rowSelection.selectedRowKeys.push(item.laiyuanId))
            break;


//          case 'query':
//            this.modalOption.title=modalTitle+'详情'
//            this.modalOption.modalType='query'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal '
//            break;
//          case 'edit':
//
//            this.modalOption.title='修改'+ modalTitle+'信息'
//            this.modalOption.modalType='edit'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal '
//            this.reqModalTableData()
//            this.table.dataSource.forEach(item=>this.modalOption.table.rowSelection.selectedRowKeys.push(item.key))
//            break;
//          case 'map':
//            this.modalOption.title=modalTitle+'位置信息'
//            this.modalOption.modalType='map'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal mapModal'
//            break
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
      emitCancel(){
        this.$emit('cancel')
      },
      closeMap(data){
        if (data=='post')this.reqTableData()
        this.modalOption.visible=false
      },
      sortUP(){
//          debugger
        const arr = this.table.dataSource
        const index=this.table.dataSource.findIndex(i=>i.key==this.table.rowSelection.selectedRowKeys[0])
        if(index!=0){
//          this.hasToPost=true;
          [arr[index-1],arr[index]]=[arr[index],arr[index-1]]
          this.table.dataSource.forEach((item,index)=>item.index=index+1)
          this.table.dataSource=[...this.table.dataSource]
          this.$emit('selected',[...this.table.dataSource])
//          this.table.rowSelection.selectedRowKeys=[index-1]
        }else{
          this.$message.error('已排至第一位！')
        }
      },
      sortDown(){
        const arr = this.table.dataSource
        const index=this.table.dataSource.findIndex(i=>i.key==this.table.rowSelection.selectedRowKeys[0])
        if(index!=arr.length-1){
          [arr[index+1],arr[index]]=[arr[index],arr[index+1]]
          this.table.dataSource.forEach((item,index)=>item.index=index+1)
          this.table.dataSource=[...this.table.dataSource]
          this.$emit('selected',[...this.table.dataSource])
//          this.staffTable.rowSelection.selectedRowKeys=[index+1]
        }else{
          this.$message.error('已排至末位！')}
      },
      handleCommit(){
        this.modalOption.table.selData.sort((a,b)=>a.index-b.index)
        this.table.dataSource=this.table.dataSource.concat(this.modalOption.table.selData)
        this.table.dataSource.forEach((item,index)=>item.index=index+1)
        this.$emit('selected',[...this.table.dataSource])
        this.modalOption.table.selData=[]
        this.modalOption.visible=false

//        let parameter={
//          jsonData:JSON.stringify({
//            jcb:this.modalOption.table.selData
//          }),
//          param1:this.recordId
//        }
//        this.$store.dispatch(createAction,parameter).then((res)=>{
//          if (res.success==true){
//            this.$message.success('提交成功！')
//            this.reqTableData()
//            this.modalOption.visible=false
//          }else{
//            this.$message.error(res.message+'请稍后再试！')
//            this.modalOption.commitLoading=false
//          }
//        })
      },
      deleteRowData(record){
//          debugger
        if(record=='multi'){
          this.table.rowSelection.selectedRowKeys.forEach((item)=>{
            const index=this.table.dataSource.findIndex(i=>i.key==item.key)
            this.table.dataSource.splice(index,1)
          })
          this.table.dataSource.forEach((item,index)=>item.index=index+1)
          this.$emit('selected',this.table.dataSource)
          this.table.rowSelection.selectedRowKeys=[]
        }else{
          const index1=this.table.dataSource.findIndex(item=>item.key==record.key)
          const index2=this.table.rowSelection.selectedRowKeys.findIndex(item=>item==record.key)
          this.table.dataSource.splice(index1,1)
          this.table.rowSelection.selectedRowKeys.splice(index2,1)
          this.table.dataSource.forEach((item,index)=>item.index=index+1)
          this.$emit('selected',this.table.dataSource)
        }

//          const index2=this.table.rowSelection.selectedRowKeys.findIndex(item=>item==record.key)
//          this.table.rowSelection.selectedRowKeys.splice(index2,1)
//        let parameter={
//          param1:record.id,
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
//        this.$store.dispatch(delAction,parameter)
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
//          debugger
        this.table.tableIsLoading=true
        const parameter={
          limit:10000,
          start:0,
          param1:this.recordId
        }
        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            this.table.dataSource=this.$store.getters[getList]
            this.table.dataSource.forEach((item,index)=>{
              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
              item.jclx0=item.jclx2 && item.jclx2 != '' ? item.jclx + ' - '+ item.jclx2:item.jclx
            })
            this.pagination.total=res.totalCount
            this.$emit('selected',[...this.table.dataSource])
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      reqModalTableData(){
        this.modalOption.table.tableIsLoading=true
        const parameter={
          limit:10000,
          start:0,
//          param1:this.recordId
        }
        this.$store.dispatch(reqSelList,parameter)
          .then((res)=>{
            this.modalOption.table.dataSource=this.$store.getters[getSelList]
            this.table.dataSource.forEach((item)=>{
              const index=this.modalOption.table.dataSource.findIndex(i=>i.id==item.laiyuanId)
              this.modalOption.table.dataSource.splice(index,1)
            })
            this.modalOption.table.dataSource.forEach((item,index)=>{
              item.index=index+1
              item.jclx0=item.jclx2 && item.jclx2 != '' ? item.jclx + ' - '+ item.jclx2:item.jclx
              item.laiyuanId=item.id
            })
            this.modalOption.pagination.total= this.modalOption.table.dataSource.length
            this.modalOption.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      changeCurrentPage(page, pageSize){
        this.pagination.current=page
        this.pagination.pageSize=pageSize
//        this.reqTableData()
      },
      showSizeChange(current, size){
        const start=(this.pagination.current-1 )* this.pagination.pageSize
        if(start==0){
          this.pagination.current=1
        }else{
          this.pagination.current= Math.ceil(start/size)
        }
        this.pagination.pageSize=size
//        this.reqTableData()
      },
      changeModalCurrentPage(page, pageSize){
        this.modalOption.pagination.current=page
        this.modalOption.pagination.pageSize=pageSize
//        this.reqModalTableData()
      },
      showModalSizeChange(current, size){
        const start=(this.modalOption.pagination.current-1 )* this.modalOption.pagination.pageSize
        if(start==0){
          this.modalOption.pagination.current=1
        }else{
          this.modalOption.pagination.current= Math.ceil(start/size)
        }
        this.modalOption.pagination.pageSize=size
//        this.reqModalTableData()
      },
    }
  }

</script>

<style lang="scss" scoped>
  .content-list{
    padding-left:36px;
    .content-wrapper{
      width: 100%;
      margin-bottom: 50px;
      .header{
        margin-bottom: 15px;
        .title{
          border-left: 4px solid #1478f0;
          padding-left: 8px;
          font-size: 16px;
          color: #575757;
          font-weight: 600;
        };
        .button-bar{

        }
      };
    };
  }

</style>