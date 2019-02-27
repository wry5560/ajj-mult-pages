<template>
  <div :class="pageName" style="height: 100%">
    <!--下面是顶部的按钮栏-->
    <div  class="header-buttons-bar" style="padding-left: 5px">
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
    <!--高级搜索区域-->
    <transition name="fade">
      <div v-if="search.showAdvanced">
        <a-row >
          <a-col :lg="7" :md="12" :sm="24">
            <a-form-item label="企业名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-input style="width:100%" size="small" placeholder="请输入企业名称" v-model="search.advancedForm.inputs[0]" @pressEnter="onAdvancedSearch">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="7" :md="12" :sm="24">
            <a-form-item label="注册地址" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-input style="width:100%" size="small" placeholder="请输入检查依据" v-model="search.advancedForm.inputs[1]" @pressEnter="onAdvancedSearch">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="7" :md="12" :sm="24">
            <a-form-item label="企业类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
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
            <a-form-item label="国名经济类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-cascader :options="modalOption.selectOptions['国民经济行业分类']"  style="width:100%" size="small" :loadData="selGmjjLoadData" placeholder="请选择国名经济类型" v-model="search.advancedForm.gmjjhyfl" changeOnSelect>
              </a-cascader>
              <!--<a-select style="width:100%" size="small" placeholder="请选择条目类型" v-model="search.advancedForm.tmlx" allowClear>-->
                <!--<a-select-option v-for="(item) in modalOption.selectOptions.tmlx" :key="item.value" :value="item.value">{{item.label}}</a-select-option>-->
              <!--</a-select>-->
            </a-form-item>
          </a-col>
          <a-col :lg="7" :md="12" :sm="24">
            <a-form-item label="工贸行业类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-select style="width:100%" size="small" placeholder="请选择工贸行业类型" v-model="search.advancedForm.jghy" allowClear>
              <a-select-option v-for="(item) in modalOption.selectOptions['安全监管行业']" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </div>
    </transition>

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
          <!--<a href="javascript:;" @click="showModal('query',record)">查看</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">-->
            <!--<a href="javascript:;">删除</a>-->
          <!--</a-popconfirm>-->

          <a href="javascript:;" @click="showModal('jc',record)">检查</a>
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
        :bodyStyle="modalOption.bodyStyle"
      >
        <a-spin  :spinning="modalLoading">

          <edit-form
            v-if="this.modalOption.modelType =='add'||this.modalOption.modelType =='edit'"
            :selectOptions="modalOption.selectOptions"
            :recordId="modalOption.recordId"
            :modelType="modalOption.modelType"
            ref="commitForm"/>

          <data-detail
            v-if="this.modalOption.modelType=='query'"
            :recordId="modalOption.recordId" />

        </a-spin>
        <template slot="footer" >
          <a-button v-show="this.modalOption.modelType!='map'" key="back" @click="modalCancel" size="small">返 回</a-button>
          <a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
            <a-button v-show="this.modalOption.modelType!='query'&&this.modalOption.modelType!='map'" key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">提 交</a-button>
          </a-popconfirm>
        </template>
      </a-modal>
    </div>

  </div>
</template>

<script>
  //常用通用工具类
  import {  mapGetters,mapActions } from 'vuex'
  import { initColumn } from '@/utils/tableColumnInit'
  import moment from 'moment'
  import {GeneralQuerySelChildren} from '../api'

  //组件


  const pageName='jiancha'
  const modalTitle="检查"   //模态框的title标题通用变量

  const selOptions=['企业类型','国民经济行业分类','安全监管行业']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation='INIT_JCZF_JCSELECTED_OPTIONS'   //将选择项配置保存到store的mutation方法名

  //修改以下获取store数据的getters 配置
  const getList='jczf_jc_list'                //获取table的list
  const getSelOpitons='jczf_jc_selOptions'   //获取选择项的配置内容
  const getDetailById='getJcById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqJcList'                   //查询列表
  const createAction=''             //新增记录
  const editAction=''                 //修改记录
  const delAction=''                   //删除
  const editGpsAction=''                  //修改Gps信息

  export default {
    name:pageName,
    components:{

    },

    data(){
        return{

          modalLoading:false,                //弹框的loading动画开关
          pageTitle:modalTitle,
          pageName:pageName,
          options: [
            {
              value: "zhejiang",
              label: "Zhejiang",
              isLeaf: false
            },
            {
              value: "jiangsu",
              label: "Jiangsu",
              isLeaf: false
            },
            {
              value: "jiangsu1",
              label: "Jiangsu",
              isLeaf: false
            },
            {
              value: "jiangsu2",
              label: "Jiangsu",
              isLeaf: false
            },
            {
              value: "jiangsu3",
              label: "Jiangsu",
              isLeaf: false
            }
          ],
          //搜索配置
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

          //表格配置
          table:{
            dataSource:[],
            columns:[
              {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
              {title: '企业名称',dataIndex: 'dwmc', width: '200px', align: 'left',titleAlign:'center'},
              {title: '企业类型', dataIndex: 'qylx0', width: '200px', align: 'left',titleAlign:'center'},
              {title: '安全负责人', dataIndex: 'safefzr', width: '100px', align: 'center',titleAlign:'center'},
              {title: '安全负责人电话', dataIndex: 'safefzrlxfs', width: '100px', align: 'center',titleAlign:'center'},
              {title: '本季隐患数', dataIndex: 'jdyhnum', width: '80px', align: 'center',titleAlign:'center'},
              {title: '本年隐患数', dataIndex: 'bnyhnum', width: '80px', align: 'center',titleAlign:'center'},
              {title: '本年已整改数', dataIndex: 'bnyzgnum', width: '80px', align: 'center',titleAlign:'center'},
              {title: '操作', dataIndex: 'actions', width: '60px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
            ],
            size:'small',
            tableIsLoading:false,
            scrollSize: { x:1050, y: window.innerHeight - 112},
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
            pageSize:20,
            pageSizeOptions:['10','20','50','100','500'],
            reqData: true                  //是否使用后台请求分页  为flase则为前端分页
          },

          //弹出框配置
          modalOption:{
            title:'',
            width:'65%',
            visible:false,
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
            modelType:'',
            modalClass:'nomal-modal'
          }

        }
    },
    computed:{
//      recordData(){
//        return this.$store.getters[getDetailById](this.modalOption.recordId)
//      },
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
          _this.table.scrollSize.y=  _this.search.showAdvanced ? window.innerHeight - 190 :window.innerHeight - 112
        }
        // document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`

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

        const lsSearch=JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['执法检查企业列表']
        this.search.placeholder="请输入"+lsSearch["0"][0].dispNm+"..."
        this.search.searchOption=lsSearch
      })
    },

    methods:{
      // ...mapGetters(['yingji_wz_list','yingji_wz_selOptions','getWzById']),
      // ...mapActions(['reqWzList','createYjwz','editYjwz','delYjwz','editYjwzGps']),


//------------------------------------------------------------------通用方法区域-----------------------------------------------------------------------
       //页面刷新
      refresh(){
        this.pagination.current=1
        this.reqTableData()
      },

      //------------------------------------------------------搜索----------------------------------

      //切换高级搜索栏显示，隐藏，修改高度参数，让表格y轴滚动区域适应
      toggleShowAdvancedSearch(){
        this.search.showAdvanced=!this.search.showAdvanced
        this.search.advancedForm.qylx=undefined
        this.search.advancedForm.gmjjhyfl=undefined
        this.search.advancedForm.jghy=undefined
        if (this.search.showAdvanced){
          this.table.scrollSize={ x:920, y: window.innerHeight - 190}
          document.getElementsByClassName('ant-table-body')[0].style['']=`${window.innerHeight}px`
        }else{
          this.table.scrollSize={ x:920, y: window.innerHeight - 112}
        }
      },

      //普通搜索
      onSearch(){
        this.table.tableIsLoading=true
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
        this.expandedRowKeys=[]
        this.reqTableData(filterOption)
      },

      //高级搜索
      onAdvancedSearch(){
        this.table.tableIsLoading=true
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

        searchItems.push('a.zcdz')
        searchItems.forEach((item,index)=>{
          if (searchInputs[index] && searchInputs[index] !=''){
            SelValues.push(`(${item} like  '%${searchInputs[index]}%')`)
          }
        })
//        this.search.advancedForm.tmlx &&this.search.advancedForm.tmlx!='' ? SelValues.push(`(a.tmlx = '${this.search.advancedForm.tmlx}') `): null
        if(this.search.advancedForm.qylx){
          this.search.advancedForm.qylx[0] &&this.search.advancedForm.qylx[0]!='' ? SelValues.push(`(a.qylx = '${this.search.advancedForm.qylx[0]}') `): null
          this.search.advancedForm.qylx[1] &&this.search.advancedForm.qylx[1]!='' ? SelValues.push(`(a.qylx2 = '${this.search.advancedForm.qylx[1]}') `): null
        }
        if(this.search.advancedForm.gmjjhyfl){
          this.search.advancedForm.gmjjhyfl[0] &&this.search.advancedForm.gmjjhyfl[0]!='' ? SelValues.push(`(a.gmjjhyfl = '${this.search.advancedForm.gmjjhyfl[0]}') `): null
          this.search.advancedForm.gmjjhyfl[1] &&this.search.advancedForm.gmjjhyfl[1]!='' ? SelValues.push(`(a.gmjjhyfl2 = '${this.search.advancedForm.gmjjhyfl[1]}') `): null
          this.search.advancedForm.gmjjhyfl[2] &&this.search.advancedForm.gmjjhyfl[2]!='' ? SelValues.push(`(a.gmjjhyfl3= '${this.search.advancedForm.gmjjhyfl[2]}') `): null
          this.search.advancedForm.gmjjhyfl[3] &&this.search.advancedForm.gmjjhyfl[3]!='' ? SelValues.push(`(a.gmjjhyfl4 = '${this.search.advancedForm.gmjjhyfl[3]}') `): null
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
        this.reqTableData(filterOption)
      },

      //清除搜索内容
      clearSearch(){
        this.search.searchValue=''
        this.search.advancedForm.inputs=['',''],
          this.search.advancedForm.qylx=undefined,
          this.search.advancedForm.gmjjhyfl=undefined,
          this.search.advancedForm.jghy=undefined,
        this.reqTableData()
      },

      //----------------------------------------------------表格通用方法--------------------------

      //单双行条纹样式
      rowClass(record,index){
        if (index%2==1) return 'even-rows'
      },

      //带选择的表格选择项改变后回调
      onSelectChange(selectedRowKeys){
        this.table.rowSelection.selectedRowKeys = selectedRowKeys
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

          //其他操作弹框,每个页面有所不同
          case 'jc':
            this.modalOption.title='企业检查'
            this.modalOption.modelType='jc'
            this.modalOption.width='85%'                             //修改弹出框的宽度
            this.modalOption.modalClass ='nomal-modal '
            break;
        }
        this.modalOption.visible=true
      },
      modalCancel(){
        this.modalLoading=false
        this.modalOption.visible=false
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
          start:this.pagination.reqData ? (this.pagination.current -1)*this.pagination.pageSize:0
        }

        if (filterOption) parameter.filter = JSON.stringify(filterOption)       //增加搜索条件

        this.$store.dispatch(reqList,parameter)
          .then((res)=>{

            //请求成功后，在下面进行数据处理，赋值给table
            this.table.dataSource=this.$store.getters[getList]
            this.table.dataSource.forEach((item,index)=>{
              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1

              item.qylx0=item.qylx + (!item.qylx2 || item.qylx2=='' ? '': ' - ' + item.qylx2 )

            })
            this.pagination.total=res.totalCount
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      //提交表单（弹出框内）
      handleCommit(){
        this.$refs.commitForm.form.validateFields((err, values) => {
          if (!err) {
            this.modalLoading=true

            //若存在选择项value和显示内容不相同，需转换内容后再提交,，如时间等
            values.jclx2=values.jclx.length>1 ? values.jclx[1]:null
            values.jclx=values.jclx[0]

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
                        this.modalLoading=false
                        this.modalOption.visible=false
                      }
                      ,300
                    )
                  }else{
                    this.$message.error(res.message+'请稍后再试！')
                    this.modalLoading=false
                  }
                })
                break
              case 'edit':

                this.$store.dispatch(editAction,parameter).then((res)=>{
                  if (res.success==true){
                    this.$message.success('提交成功！')
                    this.reqTableData()
                    setTimeout(()=>{
                        this.modalLoading=false
                        this.modalOption.visible=false
                      }
                      ,300
                    )
                  }else{
                    this.$message.error(res.message+'请稍后再试！')
                    this.modalLoading=false
                  }
                })
                break
            }
          }
        })
      },

      //删除行
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
    }
  }

</script>

<style lang="scss" scoped>
/*高级搜索内条目margin-bottom*/
  .ant-form-item{
    margin-bottom: 0px;
  }

</style>

