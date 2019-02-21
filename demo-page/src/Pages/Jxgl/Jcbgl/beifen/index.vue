<template>
  <div :class="pageNmae" style="height: 100%">
    <!--下面是顶部的按钮栏-->
    <div  class="header-buttons-bar" style="padding: 5px">
      <span v-if="!isEdit">
        <span style="font-size: 16px;margin:16px">检查表名称：<strong>{{JcbOption.jcbname}}</strong></span>
        <span style="font-size: 16px;margin-right: 16px">开始时间：<strong>{{JcbOption.startTime}}</strong></span>
        <a-button type='primary' @click="showEdit"size="small">编辑检查表</a-button>
        <a-button @click="refresh"size="small">刷新</a-button>
      </span>
      <span v-if="isEdit">
          <span style="font-size: 16px;margin:16px;">检查表名称：
            <a-input style="width:250px;margin-right: 8px" size="small" placeholder="请输入检查表名称" v-model="jcbName"/>
          </span>
          <a-button type='primary' @click="commitJcbOption"size="small" style="margin-left: -16px">保存检查表</a-button>
          <a-button type='primary' @click="showModal('add')"size="small">增加检查标准</a-button>
          <a-popconfirm title="您确认删除这些记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
            <a-button  size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>
           </a-popconfirm>
           <a-button  @click="editCancel" size="small">取消</a-button>
        <span style="color:#e00300">需保存生效！</span>
      </span>

      <!--搜索条-->
      <!--<a-input-search-->
        <!--:placeholder="search.placeholder"-->
        <!--style="width: 220px"-->
        <!--v-model="search.searchValue"-->
        <!--size="small"-->
        <!--@search="onSearch"-->
      <!--/>-->
    </div>

    <!--下面是表格区域，分为表格主体和分页器-->
    <div>
      <a-table
        bordered
        :rowClassName="rowClass"
        :dataSource="tableData"
        :columns="columns"
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
      <a-pagination
        v-model="pagination.current"
        style="margin-top: 8px; float:right; padding-right: 16px;"
        :total="pagination.total"
        :pageSizeOptions="pagination.pageSizeOptions"
        :pageSize="pagination.pageSize"
        showSizeChanger
        showQuickJumper
        :showTotal="total =>`共${total}条数据`"
        @change="changeCurrentPage"
        @showSizeChange="showSizeChange"
        size="small"/>
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

        <edit-form
          v-if="this.modalOption.modalType =='add'||this.modalOption.modalType =='edit'"
          :tableHeight="modalTableHeight"
          @addSuccess="addSuccess"
          @addJcx="addJcx"
          @cancel="modalCancel"
          :jcbId="jcbId"
          :nowData="this.table.dataSource"
          />

        <!--<data-detail-->
          <!--v-if="this.modalOption.modalType=='query'"-->
          <!--:recordId="modalOption.recordId" />-->

        <!--<amap-modal-->
          <!--v-if="modalOption.modalType=='map'"-->
          <!--:recordId="modalOption.recordId"-->
          <!--:recordGps="{lng:recordData.lng,lat:recordData.lat}"-->
          <!--:height="modalOption.bodyStyle['max-height']"-->
          <!--@closeMap="closeMap"-->
          <!--:city="modalOption.mapCity"-->
          <!--:default-center="modalOption.defaultCenter"-->
          <!--:commitGpsAction="modalOption.commitGpsAction"/>-->

        <!--弹出框内是table，使用modal内部的footer，以下隐藏-->
        <template  slot="footer">
          <a-button v-show="this.modalOption.modalType!='add'" key="back" @click="modalCancel" size="small">返 回</a-button>
          <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
          <a-button v-show="this.modalOption.modalType!='query'&&this.modalOption.modalType!='add'" key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">提 交</a-button>
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
  import moment from  'moment'
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import ACol from "ant-design-vue/es/grid/Col";

  const pageName='jxgl_jcbgl'
  const modalTitle="检查表条目"   //模态框的title标题

  const selOptions=[]          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation=''   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='jxgl_jcb_list'                //获取table的list
  const getJcbOption='jxgl_jcb_option'                //获取检查表的配置
  const getSelOpitons=''   //获取选择项的配置内容
  const getDetailById=''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqJcbList'                   //查询列表
  const reqJcbOption='reqJcbOption'                   //查询检查表配置
  const createAction='addJcbOption'             //新增记录
  const editAction=''                 //修改记录
  const delAction='delJcbxm'                   //删除
  const editGpsAction=''                  //修改Gps信息

  export default {
    moment,
    name:pageName,
    components:{
      ACol, AFormItem, editForm,
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
        JcbOption:{},
        jcbId:'',
        jcbName:'',
        isEdit:false,
        table:{
          dataSource:[],
          tempDataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '40px',align: 'center'},
            {title: '条目类型',dataIndex: 'tmlx', width: '60px', align: 'center',titleAlign:'center'},
            {title: '检查类型', dataIndex: 'jclx0', width: '120px', align: 'left',titleAlign:'center'},
            {title: '检查内容', dataIndex: 'jcnr', width: '120px', align: 'left',titleAlign:'center'},
            {title: '检查依据', dataIndex: 'jcyj', width: '120px', align: 'left',titleAlign:'center'},
//            {title: '隐患提示', dataIndex: 'yhts', width: '120px',align: 'left',titleAlign:'center'},
//            {title: '系统未落实提示', dataIndex: 'systs', width: '120px', align: 'left',titleAlign:'center'},
//            {title: '所属组织', dataIndex: 'departName', width: '80px',align: 'left',titleAlign:'center'},
            {title: '操作', dataIndex: 'actions', width: '80px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:900, y: window.innerHeight - 120},
           rowSelection:{
            selectedRowKeys: [],
            onChange: this.onSelectChange,
            columnWidth:'20',
          },
//          rowSelection:null
        },
        pagination:{
          total:0,
          current:1,
          pageSize:20,
          pageSizeOptions:['10','20','50','100','500']
        },
        modalOption:{
          title:'',
          width:'85%',
          visible:false,
          bodyStyle:{
             "max-height":window.innerHeight-250 + 'px',
              height:window.innerHeight-250 + 'px'
            // "min-height":window.innerHeight-250 + 'px',
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
          modalClass:'nomal-modal '
        }
      }
    },
    computed:{
      recordData(){
        return this.$store.getters[getDetailById](this.modalOption.recordId)
      },
      modalTableHeight(){
        return window.innerHeight-322
      },
      columns(){
       return this.isEdit
          ? this.table.columns
          : this.table.columns.slice(0,8)
      },
      tableData(){
        const start=(this.pagination.current-1)*this.pagination.pageSize
        const end=(this.pagination.current)*this.pagination.pageSize
        return this.table.dataSource.slice(start,end)
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
      this.reqTableData()
      this.table.columns=initColumn(this.table.columns)
    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
        window.onresize = function(){
          _this.modalOption.bodyStyle['max-height']= window.innerHeight -250+'px'
          _this.modalOption.bodyStyle['height']= window.innerHeight -250+'px'

        }
        document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`

        //初始化选择项,存入vuex相应store的state中
//        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
//        const tmp=[]
//        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item]})})
//        this.$store.commit(selOptionMutation,tmp)
//        this.modalOption.selectOptions=this.$store.getters[getSelOpitons]
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
            this.modalOption.title='新增'+ modalTitle
            this.modalOption.modalType='add'
            this.modalOption.modalClass ='nomal-modal table-modal no-footer'
            this.table.tmpDataSource=this.table.dataSource
                break;
//          case 'query':
//            this.modalOption.title=modalTitle+'详情'
//            this.modalOption.modalType='query'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal '
//                break;
//          case 'edit':
//            this.modalOption.title='修改'+ modalTitle+'信息'
//            this.modalOption.modalType='edit'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal '
//                break;
//          case 'map':
//            this.modalOption.title=modalTitle+'位置信息'
//            this.modalOption.modalType='map'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal mapModal'
//                break
        }
        this.modalOption.visible=true
      },
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },
      addJcx(selJcxs){
        // debugger
        this.table.dataSource=this.table.dataSource.concat(selJcxs)
        this.table.dataSource.forEach((item,index)=>{
          item.index=index + 1
        })
        this.pagination.total=this.table.dataSource.length
        this.modalOption.visible=false
      },
      closeMap(data){
        if (data=='post')this.reqTableData()
        this.modalOption.visible=false
      },
      addSuccess(){
        this.modalOption.visible=false
        this.refresh()
      },
      commitJcbOption(){
        if ( !this.jcbName || this.jcbName==''){
          this.$message.error('请填写检查表名称')
          return
        }
        this.table.tableIsLoading=true
        const jcb=[]
        this.table.dataSource.forEach((item)=>{
          delete item.index
          delete item.key
          jcb.push(item)
        })
        let parameter={
          jsonData:JSON.stringify({
            jcb:jcb
          }),
          param2:this.jcbName,
        }
        this.$store.dispatch(createAction,parameter).then((res)=>{
          if (res.success==true){
            this.$message.success('提交成功！')
            this.isEdit=false
            this.table.tempDataSource=[]
            this.reqTableData()
          }else{
            this.$message.error(res.message+'请稍后再试！')
            this.table.tableIsLoading=false
          }
        }).catch(err=>console.log(JSON.stringify(err)))
      },
      showEdit(){
        this.isEdit=true
        this.table.tempDataSource=[...this.table.dataSource]
      },
      editCancel(){
        this.table.dataSource=[...this.table.tempDataSource]
        this.table.tempDataSource=[]
        this.isEdit=false
      },

//      handleCommit(){
//        this.$refs.commitForm.form.validateFields((err, values) => {
//          if (!err) {
//            //若存在选择项value和显示内容不相同，需转换内容后再提交
//            this.modalOption.commitLoading=true
//            if (this.modalOption.modalType=='edit'){
//              values.id=this.modalOption.recordId
////              values.wzbzbm=this.$store.getters[getDetailById](this.modalOption.recordId).wzbzbm
//            }
//            values.departmentid=sys_relateDepId2
//            let parameter={
//              jsonData:JSON.stringify(values),
//            }
//            switch (this.modalOption.modalType) {
//              case 'add':
//                this.$store.dispatch(createAction,parameter).then((res)=>{
//                  if (res.success==true){
//                    this.$message.success('提交成功！')
//                    this.reqTableData()
//                    setTimeout(()=>{
//                        this.modalOption.commitLoading=false
//                        this.modalOption.visible=false
//                      }
//                      ,300
//                    )
//                  }else{
//                    this.$message.error(res.message+'请稍后再试！')
//                    this.modalOption.commitLoading=false
//                  }
//                })
//                    break
//              case 'edit':
//
//                this.$store.dispatch(editAction,parameter).then((res)=>{
//                  if (res.success==true){
//                    this.$message.success('提交成功！')
//                    this.reqTableData()
//                    setTimeout(()=>{
//                        this.modalOption.commitLoading=false
//                        this.modalOption.visible=false
//                      }
//                      ,300
//                    )
//                  }else{
//                    this.$message.error(res.message+'请稍后再试！')
//                    this.modalOption.commitLoading=false
//                  }
//                })
//                break
//            }
//          }
//        })
//      },
      deleteRowData(record){
        if (record=='multi'){
          this.table.rowSelection.selectedRowKeys.forEach((key)=>{
            const index =this.table.dataSource.findIndex(i=>i.id=key)
            this.table.dataSource.splice(index,1)
          })
          this.table.rowSelection.selectedRowKeys=[]
        }else{
          const index =this.table.dataSource.findIndex(i=>i.id=record.id)
          this.table.dataSource.splice(index,1)
        }
        this.table.dataSource.forEach((item,index)=>{
          item.index=index+1
        })

        // 以下是之前的删除逻辑

        // let parameter={
        //   param1:'',
        // }
        // let payload={
        //   parameter:parameter,
        //   type:''
        // }
        // if (record=='multi'){
        //   payload.type='multi'
        //    for (let i=0;i<this.table.rowSelection.selectedRowKeys.length-1;i++){
        //      parameter.param1 +=this.table.rowSelection.selectedRowKeys[i]+','
        //   }
        //   parameter.param1 +=this.table.rowSelection.selectedRowKeys[this.table.rowSelection.selectedRowKeys.length-1]
        // }else{
        //   parameter.param1=record.id
        // }
        // this.table.tableIsLoading=true
        // this.$store.dispatch(delAction,payload)
        //   .then((res)=>{
        //   if (res.success==true){
        //     this.$message.success('删除成功！')
        //     if (record=='multi'){
        //       this.table.rowSelection.selectedRowKeys=[]
        //     }else{
        //       const index=this.table.rowSelection.selectedRowKeys.findIndex(item=>item==record.key)
        //       this.table.rowSelection.selectedRowKeys.splice(index,1)
        //     }
        //     this.reqTableData()
        //     this.table.tableIsLoading=false
        //   }else{
        //     this.$message.error(res.message+'请稍后再试！')
        //     this.table.tableIsLoading=false
        //   }
        // })
        //   .catch((err)=>{
        //     console.log(JSON.stringify(err))
        //     this.table.tableIsLoading=false
        //   })
      },
      reqTableData(){
        this.table.tableIsLoading=true

        this.$store.dispatch(reqJcbOption)
          .then((res)=>{
            if(res.data.length>0){
              this.JcbOption=this.$store.getters[getJcbOption][0]
              this.JcbOption.startTime=moment(this.JcbOption.startTime).format('YYYY-MM-DD HH:mm')
              this.jcbId=this.JcbOption.id
              const parameter={
                param2:this.JcbOption.id,
//              limit:this.pagination.pageSize,
//              start:(this.pagination.current -1)*this.pagination.pageSize
                limit:10000,
                start:0
              }
              this.$store.dispatch(reqList,parameter)
                .then((res)=>{
                  this.table.dataSource=this.$store.getters[getList]
                  this.table.dataSource.forEach((item,index)=>{
                    item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
                    item.jclx0=item.jclx2 && item.jclx2 !=''? item.jclx +' - '+ item.jclx2 : item.jclx
                  })
                  this.pagination.total=res.totalCount
                  this.table.tableIsLoading=false
                })
            }else{
              this.$message.error('当前无检查表，请添加')
              this.table.tableIsLoading=false
            }
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
    }
  }

</script>
<style lang="scss">
  .ant-form-item{
    margin-bottom: 0;
    margin-right: 8px;
  }

</style>