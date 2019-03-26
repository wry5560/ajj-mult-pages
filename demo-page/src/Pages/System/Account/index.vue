<template>
  <div class="system-account" style="height: 100%;">
    <span  v-if="showTree" class="wry-sider" style="width: 250px">
      <a-card style="height: 100%">
        <div slot="title">
          组织列表
          <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-if="!siderTreeOption.treeLoading" type="reload"  @click="reqTreeData"/>
          <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-else type="loading" />
        </div>
        <a-spin :spinning="siderTreeOption.treeLoading" size="small">
          <a-tree
            :treeData="siderTreeOption.treeData"
            showLine @select="handleTreeSelect"
            :selectedKeys="siderTreeOption.treeSelectedKey"
            :expandedKeys.sync="siderTreeOption.expandedKeys"
          />
        </a-spin>
      </a-card>
    </span>
    <span class="wry-content" :style="{width:showTree ? 'calc(100% - 250px)':'100%'}">
      <!--下面是顶部的按钮栏-->
        <div class="header-buttons-bar" style="padding-left: 5px">
          <a-button type='primary' @click="showModal('add')" size="small">新增用户</a-button>
          <!--<a-popconfirm title="您确认删除这些记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteMultiRowData">-->
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
          <a-button size="small" style="margin-left: 5px" @click="toggleShowAdvancedSearch">
            {{search.showAdvanced ? '收起高级搜索' : '高级搜索'}}
          </a-button>
          <a-button size="small" style="margin-left: 5px"
                    :disabled="search.searchValue==''&& !search.advancedForm.departmentId && search.advancedForm.inputs[0]=='' "
                    @click="clearSearch">清除
          </a-button>
          <a-button @click="refresh" size="small">刷新</a-button>
          <span style="display: inline-block;margin-left: 8px"><strong>当前组织：{{siderTreeOption.treeSelectedTitle}}</strong></span>
        </div>
          <!--高级搜索区域-->
        <transition name="fade">
          <div v-if="search.showAdvanced">
            <a-row>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="姓名" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input style="width:100%" size="small" placeholder="请输入姓名" v-model="search.advancedForm.inputs[0]"
                           @pressEnter="onAdvancedSearch">
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="帐号" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input style="width:100%" size="small" placeholder="请输入帐号" v-model="search.advancedForm.inputs[0]"
                           @pressEnter="onAdvancedSearch">
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="手机号" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input style="width:100%" size="small" placeholder="请输入手机号" v-model="search.advancedForm.inputs[0]"
                           @pressEnter="onAdvancedSearch">
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col  :lg="2" :md="12" :sm="24">
              <a-form-item>
              <a-button type='primary'size="small" style="margin-left: 8px" @click="onAdvancedSearch" >搜索</a-button>
              </a-form-item>
              </a-col>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="角色" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input style="width:100%" size="small" placeholder="请输入角色" v-model="search.advancedForm.inputs[0]"
                           @pressEnter="onAdvancedSearch">
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="7" :md="12" :sm="24">
                <a-form-item label="所属部门" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <!--<a-select style="width:100%" size="small" placeholder="请选择所属部门" v-model="search.advancedForm.departmentId"-->
                            <!--allowClear>-->
                    <!--<a-select-option v-for="(item) in modalOption.selectOptions.ssbm" :key="item.value"-->
                                     <!--:value="item.value">{{item.label}}-->
                    <!--</a-select-option>-->
                  <!--</a-select>-->
                   <a-tree-select
                     style="width: 100%"
                     size="small"
                     :treeData="siderTreeOption.treeData"
                     v-model="search.advancedForm.departmentId"
                     allowClear
                     multiple
                     searchPlaceholder='请选择所属部门'
                   />
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
            :pagination="false"
            :size="table.size"
            :loading="table.tableIsLoading"
            :scroll="table.scrollSize"
            :rowSelection="table.rowSelection"
          >
            <span slot="actionCell" slot-scope="text,record,index">
              <a-popconfirm title="您确认还原该账户吗？" placement="bottomRight" okText="Yes" cancelText="No"
                            @confirm="unForbidden(record)">
              <a href="javascript:;" v-if="record.disabled">还原</a>
                </a-popconfirm>
              <a-popconfirm title="您确认禁用该账户吗？" placement="bottomRight" okText="Yes" cancelText="No"
                            @confirm="forbidden(record)">
              <a href="javascript:;" v-if="!record.disabled" >禁用</a>
                </a-popconfirm>

              <!--<a href="javascript:;" @click="showModal('query',record)">查看</a>-->
              <!--<a-divider v-if="" type="vertical" />-->
              <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
              <!--<a href="javascript:;" @click="showModal('add',record)">新增</a>-->
              <a-divider v-if="" type="vertical"/>
              <a href="javascript:;" @click="showModal('edit',record)">修改</a>
              <a-divider v-if="" type="vertical"/>
              <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No"
                            @confirm="deleteRowData(record)">
              <a href="javascript:;">删除</a>
              </a-popconfirm>
              <a-divider v-if="" type="vertical"/>
              <a-popconfirm title="您确认重置该用户的密码吗？" placement="bottomRight" okText="Yes" cancelText="No"
                            @confirm="resetPwd(record)">
              <a href="javascript:;">重置密码</a>
              </a-popconfirm>
            </span>

            <span slot="defaultcustomRender" slot-scope="text,record,index">
              <template>
                <a-tooltip :mouseEnterDelay="0.8">
                  <template slot='title'>
                    {{text}}
                  </template>
                  <div style="width: 100%;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;padding: 4px 0;">{{text}}</div>
                </a-tooltip>
              </template>
            </span>
          </a-table>
          <div class="bottom-pagination-warpper" :style="{width:showTree ? 'calc(100% - 250px)':'100%'}">
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
            :style="modalOption.style"
            :visible="modalOption.visible"
            :destroyOnClose="true"
            :maskClosable="false"
            :wrapClassName="modalOption.modalClass"
            :width="modalOption.width"
            :bodyStyle="modalOption.bodyStyle"
          >

            <a-spin :spinning="modalLoading" style="height: 100%">
              <!--页面特殊组件-->

              <!--基础增删组件-->
              <edit-form
                v-if="modalOption.modelType =='add'||modalOption.modelType =='edit'"
                :selectOptions="modalOption.selectOptions"
                :recordId="modalOption.recordId"
                :treeData="siderTreeOption.treeData"
                :modelType="modalOption.modelType"
                :height="modalOption.bodyStyle.height"
                @cancel="modalCancel"
                :departId="siderTreeOption.treeSelectedKey[0]"
                ref="commitForm"/>
              <!--<data-detail-->
                <!--v-if="modalOption.modelType=='query'"-->
                <!--:recordId="modalOption.recordId"-->
                <!--:height="modalOption.bodyStyle.height"/>-->

            </a-spin>
            <template slot="footer">
              <a-button v-show="modalOption.modelType=='query'" key="back" @click="modalCancel" size="small">返 回</a-button>
              <a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
                <a-button v-show="false" key="submit" type="primary" :loading="modalOption.commitLoading"
                          size="small">提 交
                </a-button>
              </a-popconfirm>
            </template>
          </a-modal>
        </div>
    </span>

  </div>
</template>

<script>
  //常用通用工具类
  import {mapGetters, mapActions} from 'vuex'
  import {initColumn} from '@/utils/tableColumnInit'
  import {initTableChildren} from '@/utils/tableChildrenInit'
  import moment from 'moment'

  //组件
  import editForm from './editForm.vue'
//  import dataDetail from './dataDetail.vue'


  //页面全局变量

  const pageName = 'systemAccount'
  const modalTitle = "用户"   //模态框的title标题通用变量

  const selOptions = ['']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation = ''   //将选择项配置保存到store的mutation方法名

  //修改以下获取store数据的getters 配置
  const getList = 'system_account_list'                //获取table的list
  const getSelOpitons = 'system_account_selOptions'   //获取选择项的配置内容
  const getDetailById = 'getAccountById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList = 'reqAccountList'                   //查询列表
  const createAction = 'createAccount'             //新增记录
  const editAction = 'editAccount'                 //修改记录
  const delAction = 'delAccount'                   //删除
  const delMultiAction = ''                   //批量删除
  const editGpsAction = ''                  //修改Gps信息

  export default{
    name:'Account',
    components:{
      editForm,
    },
    props:{
      showTree:{
        Boolean,
        default:true
      }
    },
    data(){
      return{
        isFirstLoading:true,                 //控制左侧树第一次加载数据时是否自动请求第一条选项的数据
        contentLoading:false,               //如果没有用表格，可以套一个spin，绑定该参数进行load动画的控制
        pageLoading: false,
        modalLoading: false,                //弹框的loading动画开关
        pageTitle: modalTitle,
        pageName: pageName,

        //侧边栏树的配置
        siderTreeOption:{
          treeData:[],
          treeSelectedKey:[],
          treeSelectedTitle:'',
          treeLoading:false,
          expandedKeys:[]
        },

        //搜索配置
        search: {
          placeholder: '',
          searchValue: '',
          searchOption: {},
          showAdvanced: false,
          advancedForm: {
            inputs: ['', '','',''],
            departmentId: undefined,
          },
        },

        //表格配置
        table: {
          dataSource: [],
          columns: [
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {
              title: '姓名',
              dataIndex: 'name',
              width: '100px',
              align: 'left',
              titleAlign: 'center',
            },
            {title: '帐号', dataIndex: 'loginid', width: '100px', align: 'left', titleAlign: 'center'},
            {title: '手机号', dataIndex: 'mobilephone', width: '100px', align: 'center', titleAlign: 'center'},
            {title: '所属部门', dataIndex: 'departName', width: '150px', align: 'left', titleAlign: 'center'},
            {title: '权限', dataIndex: 'roles', width: '200px', align: 'left', titleAlign: 'center'},
            {
              title: '操作',
              dataIndex: 'actions',
              width: '180px',
              align: 'center',
              scopedSlots: {customRender: 'actionCell'}
            },
          ],
          size: 'small',
          tableIsLoading: false,
          scrollSize: {x: 1000, y: window.innerHeight - 120},
//          rowSelection: {
//            selectedRowKeys: [],
//            onChange: this.onSelectChange,
//            columnWidth: '20px',
//          },

          rowSelection:null,
          expandedRowKeys: []
        },

        //分页器配置
        pagination: {
          total: 0,
          current: 1,
          pageSize: 50,
          pageSizeOptions: ['10', '20', '50', '100', '500'],
          reqData: true                  //是否使用后台请求分页  为flase则为前端分页
        },

        //弹出框配置
        modalOption: {
          style: {top: '60px'},
          title: '',
          width: '85%',
          visible: false,
          bodyStyle: {
            "max-height": window.innerHeight - 140 + 'px',
            "height":window.innerHeight-140 + 'px',
            'padding':0,
//              "min-height":window.innerHeight-80 + 'px',
            "min-height": 300 + 'px',
//            padding: '0px'
          },
          commitLoading: false,
          mapCity: '珠海',
          commitGpsAction: editGpsAction,
          defaultCenter: {
            lng: 113.536232,
            lat: 22.120977
          },
          selectOptions: {},
          recordId: '',
          departId:'',
          modelType: '',
          modalClass: 'nomal-modal'
        }

      }
    },
    computed:{
      recordData(){
        return this.$store.getters[getDetailById](this.modalOption.recordId)
      },
    },
    beforeCreate(){
//        debugger
      //如果是测试环境，则设置以下localstorage
      if (process.env.NODE_ENV !== 'production') {
        const lsTemp = require('../../../temp/lsTemp')
        localStorage.setItem('/asrsajjdic', JSON.stringify(lsTemp.asrsajjdic))
        localStorage.setItem('/asrsajjfixsearch', JSON.stringify(lsTemp.asrsajjfixsearch))
      }
    },
    created(){
      if(this.showTree) this.reqTreeData()
//      this.reqTableData()
      this.table.columns = initColumn(this.table.columns)
    },

    mounted(){
      this.$nextTick(function () {
//          debugger
        let _this = this
        window.onresize = function () {
//              debugger
          _this.table.scrollSize.y = _this.search.showAdvanced ? window.innerHeight - 190 : window.innerHeight - 120
          _this.modalOption.bodyStyle['max-height'] = window.innerHeight - 140 + 'px'
          _this.modalOption.bodyStyle['height'] = window.innerHeight - 140 + 'px'
        }
        // document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight-250}px`

        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))

        const tmp = []
        selOptions.forEach(item => {
          tmp.push({name: item, value: ls[item], lable: item})
        })
        this.$store.commit(selOptionMutation, tmp)
        this.modalOption.selectOptions = this.$store.getters[getSelOpitons]
//        this.modalOption.selectOptions['企业类型'].forEach((item)=>{
//          item.isLeaf=false
//          item.loading=false
//        })
//        this.modalOption.selectOptions['国民经济行业分类'].forEach(item=>item.isLeaf=false)

        const lsSearch = JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['人员列表']
        this.search.placeholder = "请输入" + lsSearch["0"][0].dispNm + "..."
        this.search.searchOption = lsSearch
      })
    },
    methods:{
      moment,
      ...mapGetters(['']),
      ...mapActions(['reqZuzhiData','resetPassword','unForbiddenAccount','forbidAccount']),


//------------------------------------------------------------------通用方法区域-----------------------------------------------------------------------
      //页面刷新
      refresh(){
        this.pagination.current = 1
        this.reqTableData()
      },

      //------------------------------------------------------搜索----------------------------------

      //切换高级搜索栏显示，隐藏，修改高度参数，让表格y轴滚动区域适应
      toggleShowAdvancedSearch(){
        this.search.showAdvanced = !this.search.showAdvanced
        this.search.advancedForm.departmentId = undefined

        if (this.search.showAdvanced) {
          this.table.scrollSize.y = window.innerHeight - 198
          document.getElementsByClassName('ant-table-body')[0].style[''] = `${window.innerHeight}px`
        } else {
          this.table.scrollSize.y = window.innerHeight - 120
        }
      },

      //普通搜索
      onSearch(){
        this.table.tableIsLoading = true
        const searchItems = this.search.searchOption["0"][0].procSql.split('|')
        const filterOption = []
        const normalVlaue = {
          "operate": "more",
        }
        const valueA = []
        const valueB = {
          "relation": "0",
          "value": valueA
        }
        searchItems.forEach(item => valueA.push({
          "operate": "like",
          "sqlIndex": item,
          "value": this.search.searchValue
        }))
        normalVlaue.value = JSON.stringify(valueB)
        filterOption.push(normalVlaue)
        this.expandedRowKeys = []
        this.reqTableData(filterOption)
      },

      //高级搜索
      onAdvancedSearch(){
        this.table.tableIsLoading = true
        const searchItems = this.search.searchOption["0"][0].procSql.split('|')
        const searchInputs = this.search.advancedForm.inputs
        const filterOption = [{}]
        const normalVlaue = {
          "operate": "more",
        }
        const advancedVlaue = {
          "fix": "",
        }
//        debugger
        const SelValues = []

//        searchItems.push('a.zcdz')
        searchItems.forEach((item, index) => {
          if (searchInputs[index] && searchInputs[index] != '') {
            SelValues.push(`(${item} like  '%${searchInputs[index]}%')`)
          }
        })
//        this.search.advancedForm.tmlx &&this.search.advancedForm.tmlx!='' ? SelValues.push(`(a.tmlx = '${this.search.advancedForm.tmlx}') `): null
        if (this.search.advancedForm.departmentId) {
          this.search.advancedForm.departmentId != '' ? SelValues.push(`(a.departmentid in (${this.search.advancedForm.departmentId})) `) : null
        }
        SelValues.forEach((value, index) => {
          index > 0 ? advancedVlaue.fix = advancedVlaue.fix + ' and ' + value
            : advancedVlaue.fix = value
        })
        if (advancedVlaue.fix != '') {
          filterOption.push(advancedVlaue)
        }
//        if (tmlxSelValue){
//          advancedVlaue.fix=advancedVlaue.fix+ jclxSelValue ? tmlxSelValue +' and '+jclxSelValue:tmlxSelValue
//          filterOption.push(advancedVlaue)
//        }else if(jclxSelValue){
//          advancedVlaue.fix=advancedVlaue.fix+ jclxSelValue
//          filterOption.push(advancedVlaue)
//        }else{
//          filterOption.push(advancedVlaue)
//        }
        this.expandedRowKeys = []
        this.reqTableData(filterOption)
      },

      //清除搜索内容
      clearSearch(){
        this.search.searchValue = ''
        this.search.advancedForm.inputs = ['', ''],
          this.search.advancedForm.departmentId = undefined,
          this.reqTableData()
      },


      //----------------------------------------------------表格通用方法--------------------------

      //单双行条纹样式
      rowClass(record, index){
        let className=''
        if (index % 2 == 1) className += 'even-rows'
        if (record.disabled) className +=' disabled'
        return className
      },

      //带选择的表格选择项改变后回调
      onSelectChange(selectedRowKeys){
        this.table.rowSelection.selectedRowKeys = selectedRowKeys
      },

      //树形表格点击展开图标时的方法
      toggleExpand(expanded, record){

        const index = this.table.expandedRowKeys.findIndex(i => i == record.key)
        if (expanded && index == -1) this.table.expandedRowKeys.push(record.key)
        if (!expanded && index > -1) this.table.expandedRowKeys.splice(index, 1)
      },

      //-----------------------------------------------弹出框通用方法------------------------------

      showModal(type, record){
        switch (type) {
          //常用的增删改查
          case 'add':
            this.modalOption.title = '新增' + modalTitle
            this.modalOption.modelType = 'add'
            this.modalOption.recordId = record && record.id ? record.id:''
            this.modalOption.bodyStyle.height = window.innerHeight - 140 + 'px'
//            this.modalOption.width=''                             //修改弹出框的宽度
            this.modalOption.modalClass = 'nomal-modal no-footer'
            break;
          case 'query':
            this.modalOption.title = modalTitle + '详情'
            this.modalOption.modelType = 'query'
            this.modalOption.recordId = record.id
//            this.modalOption.departId = record.__ddepartmentId.departId
            this.modalOption.bodyStyle.height = window.innerHeight - 180 + 'px'
            this.modalOption.modalClass = 'nomal-modal '
            break;
          case 'edit':
            this.modalOption.title = '修改' + modalTitle + '信息'
            this.modalOption.modelType = 'edit'
            this.modalOption.recordId = record.id
//            this.modalOption.departId = record.__ddepartmentId.departId
            this.modalOption.bodyStyle.height = window.innerHeight - 140 + 'px'
            this.modalOption.modalClass = 'nomal-modal no-footer'
            break;
          case 'map':
            this.modalOption.title = modalTitle + '位置信息'
            this.modalOption.modelType = 'map'
            this.modalOption.recordId = record.id
            this.modalOption.modalClass = 'nomal-modal mapModal'
            break

          //其他操作弹框,每个页面有所不同
          case 'jc':
            this.modalOption.title = '企业检查'
            this.modalOption.modelType = 'jc'
            this.modalOption.recordId = record.departmentId
            this.qyid = record.id
//            this.modalOption.width='90%'                             //修改弹出框的宽度
            this.modalOption.bodyStyle.height = window.innerHeight - 80 + 'px'
            this.modalOption.modalClass = 'nomal-modal no-footer'
            break;
          case 'jcYdDetail' :
            this.modalOption.title = '企业检查详情'
            this.modalOption.modelType = 'jcDetail'
            this.modalOption.jcType = type
            this.modalOption.recordId = record.departmentId
            this.modalOption.bodyStyle.height = window.innerHeight - 120 + 'px'
            this.qyid = record.id
//            this.modalOption.width='90%'                             //修改弹出框的宽度
            this.modalOption.modalClass = 'nomal-modal'
            break;
          case 'jcJdDetail':
            this.modalOption.title = '企业检查详情'
            this.modalOption.modelType = 'jcDetail'
            this.modalOption.jcType = type
            this.modalOption.recordId = record.departmentId
            this.modalOption.bodyStyle.height = window.innerHeight - 120 + 'px'
            this.qyid = record.id
//            this.modalOption.width='90%'                             //修改弹出框的宽度
            this.modalOption.modalClass = 'nomal-modal'
            break;
        }
        this.modalOption.visible = true
      },
      modalCancel(type){
        if (type == 'success') {
          this.refresh()
          setTimeout(() => {
            this.modalLoading = false
            this.modalOption.visible = false
          }, 200)
        } else {
          this.modalLoading = false
          this.modalOption.visible = false
        }
      },

      //----------------------------------------------分页器通用方法------------------------------

      changeCurrentPage(page, pageSize){
        this.pagination.current = page
        this.pagination.pageSize = pageSize
        if (this.pagination.reqData) this.reqTableData()
      },

      showSizeChange(current, size){
        const start = (this.pagination.current - 1 ) * this.pagination.pageSize
        if (start == 0) {
          this.pagination.current = 1
        } else {
          this.pagination.current = Math.ceil(start / size)
        }
        this.pagination.pageSize = size
        if (this.pagination.reqData) this.reqTableData()
      },
      //----------------------------------------------数据操作------------------------------------

      //请求表格数据
      reqTableData(filterOption){
        this.table.tableIsLoading = true
        const parameter = {
          limit: this.pagination.reqData ? this.pagination.pageSize : 10000,
          start: this.pagination.reqData ? (this.pagination.current - 1) * this.pagination.pageSize : 0,
          param1: this.siderTreeOption.treeSelectedKey
        }

        if (filterOption) parameter.filter = JSON.stringify(filterOption)       //增加搜索条件

        this.$store.dispatch(reqList, parameter)
          .then((res) => {

            //请求成功后，在下面进行数据处理，赋值给table
            this.table.dataSource = initTableChildren([...this.$store.getters[getList]])
            this.table.dataSource.forEach((item,index)=>{
              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
              item.disabled=item.isActive=='1' ? false : true
            })

//            this.table.dataSource.forEach(data => {
//              const index = this.table.expandedRowKeys.findIndex(i => i == data.key)
//              if (index == -1) this.table.expandedRowKeys.push(data.key)
//            })
            this.pagination.total = res.totalCount
            this.table.tableIsLoading = false
          })
          .catch(err => console.log(JSON.stringify(err)))
      },

      //提交表单（弹出框内）
      handleCommit(){

        this.$refs.commitForm.form.validateFields((err, values) => {
          if (!err) {
            this.modalLoading = true

            //若存在选择项value和显示内容不相同，需转换内容后再提交,，如时间等
//            values.jclx2=values.jclx.length>1 ? values.jclx[1]:null
//            values.jclx=values.jclx[0]
//            values.departmentid=sys_relateDepId2
            let parameter = {
              jsonData: JSON.stringify(values),
            }
            switch (this.modalOption.modelType) {
              case 'add':
                this.$store.dispatch(createAction, parameter).then((res) => {
                  if (res.success == true) {
                    this.$message.success('提交成功！')
                    this.reqTableData()
                    setTimeout(() => {
                        this.modalLoading = false
                        this.modalOption.visible = false
                      }
                      , 300
                    )
                  } else {
                    this.$message.error(res.message + '请稍后再试！')
                    this.modalLoading = false
                  }
                })
                break
              case 'edit':
                if (this.modalOption.modelType == 'edit') {
//                  const tmp = {
//                    ...this.$store.getters[getDetailById](this.modalOption.recordId),
//                    ...values
//                  }
                  values.id=this.$store.getters[getDetailById](this.modalOption.recordId).id
                  parameter = {
                    jsonData: JSON.stringify(values),
                  }
                }
                this.$store.dispatch(editAction, parameter).then((res) => {
                  if (res.success == true) {
                    this.$message.success('提交成功！')
                    this.reqTableData()
                    setTimeout(() => {
                        this.modalLoading = false
                        this.modalOption.visible = false
                      }
                      , 300
                    )
                  } else {
                    this.$message.error(res.message + '请稍后再试！')
                    this.modalLoading = false
                  }
                })
                break
            }
          }
        })
      },

      //删除行
      deleteRowData(record){
        let parameter = {
          param1: record.id,
//          jsonData:JSON.stringify(this.$store.getters[getDetailById](record.id)),
        }
        this.table.tableIsLoading = true
        this.$store.dispatch(delAction, parameter)
          .then((res) => {
            if (res.success == true) {
              this.$message.success('删除成功！')
              this.reqTableData()
              this.table.tableIsLoading = false
            } else {
              this.$message.error(res.message + '请稍后再试！')
              this.table.tableIsLoading = false
            }
          })
          .catch((err) => {
            console.log(JSON.stringify(err))
            this.table.tableIsLoading = false
          })
      },

      //批量删除行
      deleteMultiRowData(){
        let tmp = ''
        this.table.rowSelection.selectedRowKeys.forEach((key, index) => {
          tmp = tmp + (index == 0 ? key : ',' + key)
        })
        let parameter = {
          param1: tmp
//          jsonData:JSON.stringify(this.$store.getters[getDetailById](record.id)),
        }
        this.table.tableIsLoading = true
        this.$store.dispatch(delMultiAction, parameter)
          .then((res) => {
            if (res.success == true) {
              this.$message.success('删除成功！')
              this.reqTableData()
              this.table.tableIsLoading = false
            } else {
              this.$message.error(res.message + '请稍后再试！')
              this.table.tableIsLoading = false
            }
          })
          .catch((err) => {
            console.log(JSON.stringify(err))
            this.table.tableIsLoading = false
          })
      },


      //请求左侧树的数据，如果页面是第一次加载，则会自动选中第一条数据并发送数据请求，若不需要自动请求数据，则将data中isFirstLoading设为false
      reqTreeData(){
        this.siderTreeOption.treeLoading=true
//        const paramater={
////          param1:
//        }

        this.reqZuzhiData()
          .then((res)=>{
            if(res.success){
              this.siderTreeOption.treeData=[]
              const treeData=[]
              res.data.forEach((item)=>{
                treeData.push({
                  title:item.name,
                  key:item.id,
                  value:item.id,
                  ...item
                })
              })
              this.siderTreeOption.treeData=this.initTreeData(treeData)
              this.siderTreeOption.treeLoading=false
              if(this.isFirstLoading) {
                this.siderTreeOption.treeSelectedKey=[this.siderTreeOption.treeData[0].key]
                this.siderTreeOption.treeSelectedTitle=this.siderTreeOption.treeData[0].title
                this.siderTreeOption.expandedKeys.push(this.siderTreeOption.treeData[0].key)
                this.isFirstLoading=false
                this.handleTreeSelect(this.siderTreeOption.treeData[0].key,{})
              }
            }else{
              this.$message.error(res.message)
              this.siderTreeOption.treeLoading=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      //左侧树选择后，请求相应数据
      handleTreeSelect(selectedKeys,{node=null}){
        if(selectedKeys.length>0)this.siderTreeOption.treeSelectedKey=selectedKeys

        if(node) this.siderTreeOption.treeSelectedTitle=node.title
//        this.contentLoading=true
//        const paramater={
//            param1:selectedKeys
//        }
        this.reqTableData()
//        alert(selectedKeys)
//        this.selectedJcb=this.treeData.find(i=>i.key==this.treeSelectedKey)
//        const paramater={
//          param1: this.qyid,
//          param3: this.treeSelectedKey,
//          param4: this.selectedJcb.gdlx,
//        }
//        this.reqQyZfjcb(paramater)
//          .then((res)=>{
//            if(res.success){
//              this.dwaqfzrlist=res.data[0].dwaqfzrlist
//              this.jcd=res.data[0].jcd
//              this.jcddetail=res.data[0].jcddetail
//              this.contentLoading=false
//              this.isFirstLoading=false
//
//            }else{
//              this.$message.error(res.message)
//              this.contentLoading=false
//            }
//          })
//          .catch(err=>console.log(JSON.stringify(err)))
      },
      //格式化tree数据的方法
      initTreeData(data){
//        debugger
        if (data.length && data.length>0){
          // debugger
          const treeData=[]
//        data.sort((a,b)=>{
//          return b.nodeLevel - a.nodeLevel
//        })
          data.forEach(item=>{
            const parent = data.find(i=>item.pId==i.id)
            if (parent){
              if(!parent.children){
                parent.children=[]
              }
              parent.children.push(item)
            }else{
              treeData.push(item)
            }
          })
          return treeData
        }else{
          return []
        }
      },

      //重置密码
      resetPwd(record){
        const paramater={
            param1:record.id
        }
        this.resetPassword(paramater)
          .then((res)=>{
            if(res.success){
              this.$message.success('密码重置成功！')
            }else{
              this.$message.error('密码重置失败！ '+ res.message)
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      //禁用
      forbidden(record){
        const paramater={
          param1:record.id
        }
        this.forbidAccount(paramater)
          .then((res)=>{
            if(res.success){
                this.reqTableData()
              this.$message.success('账户禁用成功！')
            }else{
              this.$message.error('账户禁用失败！ '+ res.message)
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      //还原
      unForbidden(record){
        const paramater={
          param1:record.id
        }
        this.unForbiddenAccount(paramater)
          .then((res)=>{
            if(res.success){
              this.reqTableData()
              this.$message.success('账户还原成功！')
            }else{
              this.$message.error('账户还原失败！ '+ res.message)
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      }

    },


  }
</script>

<style lang="scss" >
  .system-account{
    .ant-form-item {
      margin-bottom: 0px;
    }
    .wry-sider{
      padding:8px;
      /*width:300px;*/
      /*height: calc(100% - 45px);*/
      height: 100%;
      display: inline-block;
    }
    .wry-content{
      vertical-align:top;
      padding:8px;
      padding-left:0;
      /*width:calc(100% - 300px);*/
      /*height: calc(100% - 45px);*/
      height: 100% ;
      display: inline-block;
    }
    .ant-card-head{
      padding:0 14px;
      min-height: 32px;
      font-size: 14px;
      .ant-card-head-title{
        padding:8px 0;
      }

    }
    .ant-card-body{
      padding:8px;
      height: calc(100% - 37px);
      overflow: auto;
    }
    .ant-tree-switcher{
      width: 20px !important;
      height: 20px !important;
      line-height: 20px !important;
    }
    .ant-tree-node-content-wrapper{
      height: 20px !important;
      line-height: 20px !important;
      font-size: 14px !important;
    }
    .ant-tree li {
      padding: 2px 0;
    }
    .ant-tree.ant-tree-show-line li:not(:last-child):before{
      left: 8px;
      margin: 4px 0;
    }
  }

</style>