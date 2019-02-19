<template>
  <div :class="pageNmae" style="height: 100%">
    <!--//企业列表页面-->
      <div v-show="!showDetail">
        <a-layout-sider width="160px" :style="{position:'fixed',height:'100%',overflow:'auto'}">
          <div class="tree-wrapper"style="height: 100%;overflow: auto;background-color: #ffffff">
            <div class="tree-title">
              辖区网格列表
              <a-icon type="sync" style="float: right; font-size: 12px;margin-top: 6px;" @click="refreshTree"/>
            </div>
            <wg-tree :treeData="treeData" @select="selectWg"></wg-tree>
          </div>
        </a-layout-sider>
        <a-layout-content :style="{ 'padding-left': '160px',overflow:'auto'}">
          <!--下面是顶部的按钮栏-->
          <div  class="header-buttons-bar" style="padding-left: 5px">
            <!--<a-button type='primary' @click="showModal('add')"size="small">新增{{this.pageTitle}}</a-button>-->
            <a-popconfirm title="您确认删除该条记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
              <!--<a-button  size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>-->
            </a-popconfirm>
            <span style="font-size: 15px;color: #636363;margin:0 15px"><strong>{{this.wgName +' '}} </strong> <span style="font-size: 14px"> 下辖企业列表</span></span>
            <a-button @click="refresh"size="small">刷新</a-button>
            <!--搜索条-->
            <a-input-search
              :placeholder="search.placeholder"
              style="width: 300px"
              v-model="search.searchValue"
              size="small"
              @search="onSearch"
            />
            <!--<a-button size="small"  style="margin-left: 5px"  @click="()=>search.showAdvanced=!search.showAdvanced">{{search.showAdvanced?'收起高级搜索':'高级搜索'}}</a-button>-->
            <!--<a-button size="small"  style="margin-left: 5px" :disabled="search.searchValue==''&& !search.advancedForm.tmlx && !search.advancedForm.jclx" @click="clearSearch">清除</a-button>-->
          </div>
          <!--下面是表格区域，分为表格主体和分页器-->
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
          <a href="javascript:;" @click="showDetailFun(record)">查看详情</a>
          <a-divider v-if="" type="vertical" />
          <a href="javascript:;" @click="showModal('map',record)">位置</a>
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">
            <!--<a href="javascript:;">删除</a>-->
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
            <div class="bottom-pagination-warpper" style="padding-right:172px">
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
                <a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
                  <a-button v-show="this.modalOption.modelType!='query'&&this.modalOption.modelType!='map'" key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">提 交</a-button>
                </a-popconfirm>
              </template>
            </a-modal>
          </div>
        </a-layout-content>
      </div>
    <!--企业详情页面-->
    <div v-if="showDetail">
      <qiye-detail :QiyeId="modalOption.recordQyId" :recordId="modalOption.recordId" @return="() => showDetail=false"></qiye-detail>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import wgTree from './wgTree'
//  import editForm from './editForm'
//  import dataDetail from './dataDetail'
  import AmapModal from  '../../wryComps/AmapModal.vue'
  import { initColumn } from '@/utils/tableColumnInit'
  import { initTreeData } from '@/utils/treeDataInit'
  import QiyeDetail from '../../wryComps/QiyeDetail/index'

  const pageName='qiye_xqqygl'
  const modalTitle="企业"   //模态框的title标题

  const selOptions=[]          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation=''   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='qiye_xqqiye_list'                //获取table的list
  const getSelOpitons=''   //获取选择项的配置内容
  const getDetailById='getXqqiyeById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqXqqyList'                   //查询列表
  const createAction=''             //新增记录
  const editAction=''                 //修改记录
  const delAction=''                   //删除
  const editGpsAction='editXqqyGps'                  //修改Gps信息

  export default {
    name:pageName,
    components:{
      QiyeDetail,
//      editForm,
//      dataDetail,
      AmapModal,
      wgTree
    },
    data(){
      return{
        pageTitle:modalTitle,
        pageNmae:pageName,
        showDetail:false,
        treeData:[],
        //TODO 进入时网格id须确认，修改以下参数
        wgid:'A-3049',
        search:{
          placeholder:'',
          searchValue:'',
          searchOption:{},
          showAdvanced:false,
          advancedForm:{
//            jclx:undefined,
//            tmlx:undefined,
          },
        },
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '企业名称',dataIndex: 'dwmc', width: '220px', align: 'center'},
            {title: '单位类型', dataIndex: 'dwlx', width: '100px', align: 'center'},
            {title: '单位地址', dataIndex: 'dwdz', width: '250px', align: 'center',},
            {title: '所属网格', dataIndex: 'nodeNm', width: '120px',align: 'center'},
            {title: '操作', dataIndex: 'actions', width: '120px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:1120, y: window.innerHeight - 112},
          // rowSelection:{
          //   selectedRowKeys: [],
          //   onChange: this.onSelectChange,
          //   columnWidth:'20px',
          // }
          rowSelection:null
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
      wgName(){
        const wgName=this.$store.getters.getWgnameById(this.wgid)
        return  !wgName ? '': wgName.nodeNm

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
      this.reqTreeData()
      this.table.columns=initColumn(this.table.columns)
    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
        window.onresize = function(){
          _this.modalOption.bodyStyle['max-height']= window.innerHeight-250+'px'
          _this.table.scrollSize.y= window.innerHeight - 112
        }
        document.getElementsByClassName('ant-table-body')[0].style['"max-height"']=`${window.innerHeight-250}px`

        //初始化选择项,存入vuex相应store的state中
//        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
//        const tmp=[]
//        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item]})})
//        this.$store.commit(selOptionMutation,tmp)
//        this.modalOption.selectOptions=this.$store.getters[getSelOpitons]
//
        const lsSearch=JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['辖区企业列表（含单位类型）']
        this.search.placeholder="请输入"+lsSearch["0"][0].dispNm+"..."
        this.search.searchOption=lsSearch
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
        this.pagination.current=1
        this.reqTableData()
      },
      onSearch(){
        this.table.tableIsLoading=true
        const searchItems=this.search.searchOption["0"][0].procSql.split('|')
        const advancedSearchItems=this.search.searchOption["1"]
        const filterOption=[]
        const normalVlaue={
          "operate":"more",
        }
        const valueA=[]
        const valueB={
          "relation":"0",
          "value":valueA
        }
        searchItems.forEach(item=>valueA.push({
          "operate":"like",
          "sqlIndex":item,
          "value":this.search.searchValue
        }))
        normalVlaue.value=JSON.stringify(valueB)
        filterOption.push(normalVlaue)
//        const advancedVlaue={
//          "fix":"",
//        }
//        const tmlxSelValue=this.search.advancedForm.tmlx?`(a.tmlx = '${this.search.advancedForm.tmlx}') `: null
//        const jclxSelValue=this.search.advancedForm.jclx?`(a.jclx = '${this.search.advancedForm.jclx}') `: null
//        if (tmlxSelValue){
//          advancedVlaue.fix= jclxSelValue ? tmlxSelValue +' and '+jclxSelValue:tmlxSelValue
//          filterOption.push(advancedVlaue)
//        }else if(jclxSelValue){
//          advancedVlaue.fix= jclxSelValue
//          filterOption.push(advancedVlaue)
//        }
        this.expandedRowKeys=[]
        this.tableIsLoading=true
        const parameter={
          filter:JSON.stringify(filterOption),
          //TODO 后续需要修改参数为网格的ID
          param1:'A-3049',
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            this.table.dataSource=this.$store.getters[getList]
            this.table.dataSource.forEach((item,index)=>{
              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
            })
            this.pagination.total=res.totalCount
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      clearSearch(){
        this.search.searchValue=''
        this.search.advancedForm.jclx=undefined
        this.search.advancedForm.tmlx=undefined
        this.reqTableData()
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
      showDetailFun(record){
        this.modalOption.recordId=record.id
        this.modalOption.recordQyId=record.autoid
        this.showDetail=true
      },
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },
      closeMap(data){
        if (data=='post')this.reqTableData()
        this.modalOption.visible=false
      },
      handleCommit(){
        this.$refs.commitForm.form.validateFields((err, values) => {
          if (!err) {
            //若存在选择项value和显示内容不相同，需转换内容后再提交
            this.modalOption.commitLoading=true
            if (this.modalOption.modelType=='edit'){
              values.id=this.modalOption.recordId
//              values.wzbzbm=this.$store.getters[getDetailById](this.modalOption.recordId).wzbzbm
            }
            values.departmentid=sys_relateDepId2
            let parameter={
              jsonData:JSON.stringify(values),
            }
            switch (this.modalOption.modelType) {
              case 'add':
                this.$store.dispatch(createAction,parameter).then((res)=>{
                  if (res.success==true){
                    this.$message.success('提交成功！')
                    this.reqTableData()
                    setTimeout(()=>{
                        this.modalOption.commitLoading=false
                        this.modalOption.visible=false
                      }
                      ,300
                    )
                  }else{
                    this.$message.error(res.message+'请稍后再试！')
                    this.modalOption.commitLoading=false
                  }
                })
                    break
              case 'edit':

                this.$store.dispatch(editAction,parameter).then((res)=>{
                  if (res.success==true){
                    this.$message.success('提交成功！')
                    this.reqTableData()
                    setTimeout(()=>{
                        this.modalOption.commitLoading=false
                        this.modalOption.visible=false
                      }
                      ,300
                    )
                  }else{
                    this.$message.error(res.message+'请稍后再试！')
                    this.modalOption.commitLoading=false
                  }
                })
                break
            }
          }
        })
      },
      handleSearchSubmit(e){
        // e.preventDefault()
        console.log(this.search.advancedForm)
      },
      deleteRowData(record){
        let parameter={
          jsonData:JSON.stringify(this.$store.getters[getDetailById](record.id)),
        }
        this.table.tableIsLoading=true
        this.$store.dispatch(delAction,parameter)
          .then((res)=>{
          if (res.success==true){
            this.$message.success('删除成功！')
            this.reqTableData()
            this.table.tableIsLoading=false
          }else{
            this.$message.error(res.message+'请稍后再试！')
            this.table.tableIsLoading=false
          }
        })
          .catch((err)=>{
            console.log(JSON.stringify(err))
            this.table.tableIsLoading=false
          })
      },
      selectWg(wgid){
        this.wgid=wgid
        this.refresh()
      },
      reqTreeData(){
        this.$store.dispatch('reqXqwgTree')
          .then((res)=>{
            this.treeData=initTreeData(this.$store.getters['qiye_xqwg_tree'])
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      refreshTree(){
        this.treeData=[]
        this.reqTreeData()
      },

      reqTableData(){
        this.table.tableIsLoading=true
        const parameter={
          param1:this.wgid,
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            this.table.dataSource=this.$store.getters[getList]
            this.table.dataSource.forEach((item,index)=>{
                item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
            })
            this.pagination.total=res.totalCount
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      changeCurrentPage(page, pageSize){
        this.pagination.current=page
        this.pagination.pageSize=pageSize
        this.reqTableData()
      },
      showSizeChange(current, size){
        const start=(this.pagination.current-1 )* this.pagination.pageSize
        if(start==0){
          this.pagination.current=1
        }else{
          this.pagination.current= Math.ceil(start/size)
        }
        this.pagination.pageSize=size
        this.reqTableData()
      },
    }
  }

</script>

<style lang="scss" scoped>
  .tree-wrapper{
    /*margin-right: 2px;*/
    /*border-right: 1px #f0f2f5 solid;*/
  }
  .tree-title{
    font-size: 15px;
    font-weight: 500;
    padding: 5px 10px;
    border-bottom:1px #e7e9ec solid;

  }
</style>
