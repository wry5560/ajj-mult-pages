<template>
  <div :class="pageNmae+'model'" id="tableModal" style="height: 100%">
    <!--下面是表格区域，分为表格主体和分页器-->
    <div  class="content-list">
      <div class="content-wrapper">
        <div class="header">
          <span class="before-title"> </span>
          <span class="title"><span v-if="propModalType!='query'">选择</span>检查企业</span>
          <a-badge :numberStyle="{top:'-3px', 'margin-left':'5px','background-color':'#1478f0'}" :count="table.dataSource.length" :showZero="true"/>
          <a-button v-if="propModalType!='query'" type="primary" style="margin-top: 8px;margin-bottom: 8px;margin-left: 16px;margin-right: 8px;" size="small" @click="showModal('add')">添加</a-button>
          <a-popconfirm title="您确认删除这些记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
            <a-button v-if="propModalType!='query'" size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>
          </a-popconfirm>
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
          style="margin-top: 8px; padding-left: 16px;float: right"
          :total="table.dataSource.length"
          :pageSizeOptions="pagination.pageSizeOptions"
          :pageSize="pagination.pageSize"
          showSizeChanger
          showQuickJumper
          :showTotal="total =>`共${total}条数据`"
          @change="changeCurrentPage"
          @showSizeChange="showSizeChange"
          size="small"/>
        <!--<a-button type="primary" style="float: right;margin-top: 8px;margin-bottom: 8px;margin-right: 16px" size="small" @click="showModal('add')">添加检查企业</a-button>-->
        <!--<a-button style="float: right;margin-top: 8px;margin-bottom: 8px;margin-right: 8px" size="small" @click="emitCancel">返 回</a-button>-->
        <!--<p style="float: right;margin-top: 8px;margin-right: 16px" >共选择 {{table.rowSelection.selectedRowKeys.length}} 条</p>-->
        <div style="clear: both"></div>
      </div>
          <!--下面是弹出框-->
          <div>
          <a-modal
            :style="modalOption.style"

            @cancel="modalCancel"
            :visible="modalOption.visible"
            :destroyOnClose="true"
            :maskClosable="false"
            :wrapClassName="modalOption.modalClass"
            :width="modalOption.width"
            :bodyStyle="modalOption.bodyStyle"
          >
            <template slot="title">
              <div  class="header-buttons-bar" style="padding-left: 5px">
                <span style="display: inline-block;margin-right: 8px">请选择检查企业</span>
                <!--<a-button type='primary' @click="showModal('add')"size="small">新增{{this.pageTitle}}</a-button>-->
                <!--<a-popconfirm title="您确认删除这些记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">-->
                <!--<a-button  size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>-->
                <!--</a-popconfirm>-->
                <!--搜索条-->
                <a-input-search
                  :placeholder="search.placeholder"
                  style="width: 250px"
                  v-model="search.searchValue"
                  size="small"
                  @search="onSearch"
                  :disabled="search.showAdvanced"
                />
                <a-button size="small"  style="margin-left: 5px"  @click="toggleShowAdvancedSearch">{{search.showAdvanced?'收起高级搜索':'高级搜索'}}</a-button>
                <a-button size="small"  style="margin-left: 5px" :disabled="search.searchValue==''&& !search.advancedForm.gmjjhyfl && !search.advancedForm.qylx && !search.advancedForm.jghy" @click="clearSearch">清除</a-button>
                <a-button @click="refresh"size="small">刷新</a-button>
              </div>
            </template>
        <div id="innerTable">
          <div v-if="search.showAdvanced">
            <a-row >
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="企业名称" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                  <a-input style="width:100%" size="small" placeholder="请输入企业名称" v-model="search.advancedForm.inputs[0]" @pressEnter="onAdvancedSearch">
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="注册地址" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                  <a-input style="width:100%" size="small" placeholder="请输入检查依据" v-model="search.advancedForm.inputs[1]" @pressEnter="onAdvancedSearch">
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="企业类型" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                  <a-cascader :options="modalOption.selectOptions['企业类型']"  style="width:100%" size="small" :loadData="selLoadData" placeholder="请选择企业类型" v-model="search.advancedForm.qylx" changeOnSelect>
                  </a-cascader>
                </a-form-item>
              </a-col>
              <a-col  :lg="2" :md="12" :sm="24">
                <a-form-item>
                  <a-button type='primary'size="small" style="margin-left: 8px" @click="onAdvancedSearch" >搜索</a-button>
                </a-form-item>
              </a-col>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="国名经济类型" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                  <a-cascader :options="modalOption.selectOptions['国民经济行业分类']"  style="width:100%" size="small" :loadData="selGmjjLoadData" placeholder="请选择国名经济类型" v-model="search.advancedForm.gmjjhyfl" changeOnSelect>
                  </a-cascader>
                  <!--<a-select style="width:100%" size="small" placeholder="请选择条目类型" v-model="search.advancedForm.tmlx" allowClear>-->
                  <!--<a-select-option v-for="(item) in modalOption.selectOptions.tmlx" :key="item.value" :value="item.value">{{item.label}}</a-select-option>-->
                  <!--</a-select>-->
                </a-form-item>
              </a-col>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="工贸行业类型" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                  <a-select style="width:100%" size="small" placeholder="请选择工贸行业类型" v-model="search.advancedForm.jghy" allowClear>
                    <a-select-option v-for="(item) in modalOption.selectOptions['安全监管行业']" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </div>
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
          <a-button  key="back" @click="modalCancel" style="margin-top: 8px;" size="small">返 回</a-button>
          <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
            <a-button  key="submit" type="primary" style="margin-top: 8px;margin-right: 16px" :loading="modalOption.commitLoading" @click="handleCommit" size="small">保存</a-button>
          <!--</a-popconfirm>-->
          <div style="clear: both;"></div>
        </template>
      </a-modal>
       </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import editForm from './editForm'
  import dataDetail from './dataDetail'
  import AmapModal from  '../../wryComps/AmapModal.vue'
  import { initColumn } from '@/utils/tableColumnInit'
  import {GeneralQuerySelChildren} from '../api'

  const pageName='jxgl_zxjc_qysel'
  const modalTitle="检查企业"   //模态框的title标题

  const selOptions=['企业类型','国民经济行业分类','安全监管行业']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation='INIT_JCZF_JCSELECTED_OPTIONS'   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='jxgl_zxjcplan_qylist'                //获取table的list
  const getSelList='jxgl_zxjcsel_qylist'                //获取table的list
  const getSelOpitons='jczf_jc_selOptions'   //获取选择项的配置内容
  const getDetailById=''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqZxjcQyList'                   //查询列表
  const reqSelList='reqZxjcQySelList'              //查询专项检查项列表
  const createAction='addZxjcplanQyJcx'             //新增记录
  const editAction=''                 //修改记录
  const delAction='delZxjcplanQyJcx'                   //删除
  const editGpsAction=''                  //修改Gps信息

  export default {
    name:pageName,
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
        modalType:String,
        search:{
          placeholder:'',
          searchValue:'',
          searchOption:{},
          showAdvanced:false,
          advancedForm:{
            inputs:['',''],
            qylx:undefined,
            gmjjhyfl:undefined,
            jghy:undefined,
          },
        },
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '企业名称', dataIndex: 'dwmc', width: '150px', align: 'left',titleAlign:'center'},
            {title: '企业法人', dataIndex: 'fr', width: '100px', align: 'center'},
            {title: '联系方式', dataIndex: 'frlx', width: '80px', align: 'center'},
            {title: '单位地址', dataIndex: 'dwdz', width: '250px',align: 'left',titleAlign:'center'},
             {title: '操作', dataIndex: 'actions', width: '60px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:720, y: window.innerHeight - 120},
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
          style:{top:'20px'},
          title:'',
          width:'85%',
          visible:false,
          bodyStyle:{
            "max-height":window.innerHeight-140 + 'px',
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
              {title: '企业名称', dataIndex: 'dwmc', width: '150px', align: 'left',titleAlign:'center'},
              {title: '企业法人', dataIndex: 'fr', width: '100px', align: 'center',},
              {title: '联系方式', dataIndex: 'frlx', width: '80px', align: 'center',},
              {title: '单位地址', dataIndex: 'dwdz', width: '250px',align: 'left',titleAlign:'center'},
            ],
            size:'small',
            tableIsLoading:false,
            scrollSize: { x:720, y: window.innerHeight - 120},
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
            pageSizeOptions:['10','20','50','100','500']
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
        const start=(this.modalOption.pagination.current-1)*this.modalOption.pagination.pageSize
        const end=(this.modalOption.pagination.current)*this.modalOption.pagination.pageSize
        return this.modalOption.table.dataSource.slice(start,end)
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
      if (this.propModalType=='edit'||this.propModalType=='query')this.reqTableData()
      this.table.columns=initColumn(this.table.columns)
      this.modalOption.table.columns=initColumn( this.modalOption.table.columns)
    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
        window.onresize = function(){
        _this.modalOption.bodyStyle['max-height']= window.innerHeight -140+'px'
      }
//        let modalHtml=document.getElementById('tableModal')
//        modalHtml.getElementsByClassName('ant-table-body')[0].style.height=`${this.tableHeight-12}px`
        //初始化选择项,存入vuex相应store的state中
        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))

        const tmp=[]
        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item],lable:item})})
        this.$store.commit(selOptionMutation,tmp)
        this.modalOption.selectOptions=this.$store.getters[getSelOpitons]
        this.modalOption.selectOptions['企业类型'].forEach((item)=>{
          item.isLeaf=false
          item.loading=false
        })
        this.modalOption.selectOptions['国民经济行业分类'].forEach(item=>item.isLeaf=false)

        const lsSearch=JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['检查计划企业列表']
        this.search.placeholder="请输入"+lsSearch["0"][0].dispNm+"..."
        this.search.searchOption=lsSearch

        if (this.propModalType=='query'){
            this.table.rowSelection=null
          this.table.columns.splice(-1,1)
        }
      })
    },
    methods:{
      // ...mapGetters(['yingji_wz_list','yingji_wz_selOptions','getWzById']),
      // ...mapActions(['reqWzList','createYjwz','editYjwz','delYjwz','editYjwzGps']),

      //------------------------------------------------------搜索----------------------------------

      //切换高级搜索栏显示，隐藏，修改高度参数，让表格y轴滚动区域适应
      toggleShowAdvancedSearch(){
        this.search.showAdvanced=!this.search.showAdvanced
        this.search.advancedForm.qylx=undefined
        this.search.advancedForm.gmjjhyfl=undefined
        this.search.advancedForm.jghy=undefined
        if (this.search.showAdvanced){
          this.modalOption.table.scrollSize.y= window.innerHeight - 190
          document.getElementsByClassName('ant-table-body')[0].style['']=`${window.innerHeight}px`
          let modalHtml=document.getElementById('innerTable')
          let table=modalHtml.getElementsByClassName('ant-table-body')[0].style.height=this.tableHeight-148+'px'
        }else{
          this.modalOption.table.scrollSize.y= window.innerHeight - 112
          let modalHtml=document.getElementById('innerTable')
          let table=modalHtml.getElementsByClassName('ant-table-body')[0].style.height=this.tableHeight-68+'px'
        }
      },

      //普通搜索
      onSearch(){
        this.modalOption.table.tableIsLoading=true
        const searchItems=this.search.searchOption["0"][0].procSql.split('|')
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
        this.modalOption.expandedRowKeys=[]
        this.reqModalTableData(filterOption)
      },

      //高级搜索
      onAdvancedSearch(){
        this.modalOption.table.tableIsLoading=true
        const searchItems=this.search.searchOption["0"][0].procSql.split('|')
        const searchInputs=this.search.advancedForm.inputs
        const filterOption=[{}]
        const normalVlaue={
          "operate":"more",
        }
        const advancedVlaue={
          "fix":"",
        }
//        debugger
        const SelValues=[]

        searchItems.push('d.zcdz')
        searchItems.forEach((item,index)=>{
          if (searchInputs[index] && searchInputs[index] !=''){
            SelValues.push(`(${item} like  '%${searchInputs[index]}%')`)
          }
        })
//        this.search.advancedForm.tmlx &&this.search.advancedForm.tmlx!='' ? SelValues.push(`(a.tmlx = '${this.search.advancedForm.tmlx}') `): null
        if(this.search.advancedForm.qylx){
          this.search.advancedForm.qylx[0] &&this.search.advancedForm.qylx[0]!='' ? SelValues.push(`(d.qylx = '${this.search.advancedForm.qylx[0]}') `): null
          this.search.advancedForm.qylx[1] &&this.search.advancedForm.qylx[1]!='' ? SelValues.push(`(d.qylx2 = '${this.search.advancedForm.qylx[1]}') `): null
        }
        if(this.search.advancedForm.gmjjhyfl){
          this.search.advancedForm.gmjjhyfl[0] &&this.search.advancedForm.gmjjhyfl[0]!='' ? SelValues.push(`(d.gmjjhyfl = '${this.search.advancedForm.gmjjhyfl[0]}') `): null
          this.search.advancedForm.gmjjhyfl[1] &&this.search.advancedForm.gmjjhyfl[1]!='' ? SelValues.push(`(d.gmjjhyfl2 = '${this.search.advancedForm.gmjjhyfl[1]}') `): null
          this.search.advancedForm.gmjjhyfl[2] &&this.search.advancedForm.gmjjhyfl[2]!='' ? SelValues.push(`(d.gmjjhyfl3= '${this.search.advancedForm.gmjjhyfl[2]}') `): null
          this.search.advancedForm.gmjjhyfl[3] &&this.search.advancedForm.gmjjhyfl[3]!='' ? SelValues.push(`(d.gmjjhyfl4 = '${this.search.advancedForm.gmjjhyfl[3]}') `): null
        }
        if(this.search.advancedForm.jghy){
          SelValues.push(`(a.jghy = '${this.search.advancedForm.jghy}')`)
        }
        SelValues.forEach((value,index)=>{
          index>0 ? advancedVlaue.fix=advancedVlaue.fix+' and '+value
            :advancedVlaue.fix=value
        })
        if (advancedVlaue.fix!='') {filterOption.push(advancedVlaue)}
//        if (tmlxSelValue){
//          advancedVlaue.fix=advancedVlaue.fix+ jclxSelValue ? tmlxSelValue +' and '+jclxSelValue:tmlxSelValue
//          filterOption.push(advancedVlaue)
//        }else if(jclxSelValue){
//          advancedVlaue.fix=advancedVlaue.fix+ jclxSelValue
//          filterOption.push(advancedVlaue)
//        }else{
//          filterOption.push(advancedVlaue)
//        }
        this.expandedRowKeys=[]
        this.reqModalTableData(filterOption)
      },

      //清除搜索内容
      clearSearch(){
        this.search.searchValue=''
        this.search.advancedForm.inputs=['',''],
          this.search.advancedForm.qylx=undefined,
          this.search.advancedForm.gmjjhyfl=undefined,
          this.search.advancedForm.jghy=undefined,
          this.reqModalTableData()
      },

      //请求联级选择子选项
      selLoadData(selectedOptions){
        const targetOption = selectedOptions[selectedOptions.length - 1];
//          alert(JSON.stringify(selectedOptions))
//        debugger
        targetOption.loading=true


        const parameter ={
          param1 : targetOption.value
        }
        GeneralQuerySelChildren(parameter,0)
          .then((res)=>{
            if(res.success){
//              alert(JSON.stringify(res.data))
              targetOption.loading=false
              this.search.advancedForm.selectLoading1=false
              targetOption.children=res.data
              targetOption.children.forEach((item)=>{
                item.value=item.VALUE
                delete item.VALUE
              })
              this.modalOption.selectOptions["企业类型"]=[...this.modalOption.selectOptions["企业类型"]]
            }else{
              this.$message.error(res.message)
            }
          })
          .catch((err)=>{JSON.stringify(err)})
      },
      selGmjjLoadData(selectedOptions){
        const targetOption = selectedOptions[selectedOptions.length - 1];
//          console.log(JSON.stringify(selectedOptions))

        this.search.advancedForm.selectLoading1=true
        targetOption.loading=true
        const parameter ={
          param1 : targetOption.value
        }
        const type=selectedOptions.length
        GeneralQuerySelChildren(parameter,type)
          .then((res)=>{
            if(res.success){
//              alert(JSON.stringify(res.data))
              targetOption.loading=false
              this.search.advancedForm.selectLoading1=false
              targetOption.children=res.data
              targetOption.children.forEach((item)=>{
                item.value=item.VALUE
                if (type != 3)item.isLeaf=false
                delete item.VALUE
              })
              this.modalOption.selectOptions["国民经济行业分类"]=[...this.modalOption.selectOptions["国民经济行业分类"]]
            }else{
              this.$message.error(res.message)
            }
          })
          .catch((err)=>{JSON.stringify(err)})
      },

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

      showModal(type,record){
        switch (type) {
          case 'add':
            this.modalOption.title='请选择检查企业'
            this.modalOption.modalType='add'
            this.modalOption.modalClass ='nomal-modal table-modal no-footer'
            this.modalOption.table.rowSelection.selectedRowKeys=[]
            this.modalOption.pagination.current=1
            this.modalOption.table.selData=[]
            this.reqModalTableData()
//            this.table.dataSource.forEach(item=>this.modalOption.table.rowSelection.selectedRowKeys.push(item.dwid))
            break;


//          case 'query':
//            this.modalOption.title=modalTitle+'详情'
//            this.modalOption.modalType='query'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal '
//            break;
//          case 'edit':
//            this.modalOption.title='修改'+ modalTitle+'信息'
//            this.modalOption.modalType='edit'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal '
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
          let table=modalHtml.getElementsByClassName('ant-table-body')[0].style.height=height-68+'px'
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
      handleCommit(){
        this.modalOption.table.selData.sort((a,b)=>a.index-b.index)
        this.table.dataSource=this.table.dataSource.concat(this.modalOption.table.selData)
        this.table.dataSource.forEach((item,index)=>item.index=index+1)
        this.$emit('selected',[...this.table.dataSource])
        this.modalOption.table.selData=[]
        this.modalOption.visible=false
//        let parameter={
//          jsonData:JSON.stringify({
//            wgdw:this.modalOption.table.selData
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
//          debugger
//          const index1=this.modalOption.table.dataSource.findIndex(item=>item.key==record.key)
//          this.modalOption.table.dataSource.splice(index1,1)
//          this.modalOption.table.dataSource.forEach((item,index)=>item.index=index+1)
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
      reqTableData(filterOption){
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
            })
            this.$emit('selected',[...this.table.dataSource])
            this.pagination.total=res.totalCount
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      reqModalTableData(filterOption){
        this.modalOption.table.tableIsLoading=true
        const parameter={
          limit:10000,
          start:0,
//          param2:this.recordId
        }
        if (filterOption) parameter.filter = JSON.stringify(filterOption)       //增加搜索条件
        this.$store.dispatch(reqSelList,parameter)
          .then((res)=>{
            this.modalOption.table.dataSource=this.$store.getters[getSelList]
            this.table.dataSource.forEach((item)=>{
              const index=this.modalOption.table.dataSource.findIndex(i=>i.id==item.dwid)
              this.modalOption.table.dataSource.splice(index,1)
            })
            this.modalOption.table.dataSource.forEach((item,index)=>{
              item.index=index+1
              item.dwid=item.departmentId
            })
            this.modalOption.pagination.total=res.totalCount
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
  /*高级搜索内条目margin-bottom*/
  .ant-form-item{
    margin-bottom: 0px;
  }
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