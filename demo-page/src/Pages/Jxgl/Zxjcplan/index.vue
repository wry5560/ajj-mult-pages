<template>
  <div :class="pageNmae" style="height: 100%">
    <!--下面是顶部的按钮栏-->
    <div  class="header-buttons-bar" style="padding-left: 5px">
      <a-button type='primary' @click="showModal('add')"size="small">新增{{this.pageTitle}}</a-button>
      <a-popconfirm title="您确认删除该条记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
        <!--<a-button  size="small" :disabled="table.rowSelection.selectedRowKeys.length<2">批量删除</a-button>-->
      </a-popconfirm>

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
      <a-button size="small"  style="margin-left: 5px"
                :disabled="search.searchValue==''
                &&(!search.advancedForm.inputs[0] || search.advancedForm.inputs[0]=='')
                && !search.advancedForm.state
                && !search.advancedForm.sfycx
                && !search.advancedForm.planstartDate"
                @click="clearSearch">清除</a-button>
      <a-button @click="refresh"size="small">刷新</a-button>
    </div>
    <transition name="fade">
      <div v-if="search.showAdvanced">
        <a-row >
          <a-col :lg="7" :md="12" :sm="24">
            <a-form-item label="计划名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-input style="width:100%" size="small" placeholder="请输入计划名称" v-model="search.advancedForm.inputs[0]" @pressEnter="onAdvancedSearch">
              </a-input>
            </a-form-item>
          </a-col>
          <a-col :lg="7" :md="12" :sm="24">
            <a-form-item label="计划状态" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-select style="width:100%" size="small" placeholder="请选择计划状态" v-model="search.advancedForm.state" allowClear>
                <a-select-option  key="未启用" value="未启用">未启用</a-select-option>
                <a-select-option  key="进行中" value="进行中">进行中</a-select-option>
                <a-select-option  key="完结" value="完结">已完结</a-select-option>
                <a-select-option  key="归档" value="归档">已归档</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <!--<a-col :lg="8" :md="12" :sm="24">-->
            <!--<a-form-item label="是否一次性" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">-->
              <!--<a-select   style="width:100%" size="small"  placeholder="是否一次性任务" v-model="search.advancedForm.sfycx" allowClear>-->
                <!--<a-select-option  key="是" value="1">是</a-select-option>-->
                <!--<a-select-option  key="否" value="0">否</a-select-option>-->
              <!--</a-select>-->
            <!--</a-form-item>-->
          <!--</a-col>-->
          <a-col :lg="7" :md="12" :sm="24">
            <a-form-item label="日期" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
              <a-date-picker style="width:100%" size="small" placeholder="请选择搜索日期" format="YYYY-MM-DD" v-model="search.advancedForm.planstartDate" >
              </a-date-picker>
            </a-form-item>
          </a-col>
          <a-col  :lg="2" :md="12" :sm="24">
            <a-form-item>
              <a-button type='primary'size="small" style="margin-left: 8px" @click="onAdvancedSearch" >搜索</a-button>
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
        :columns="computedColumns"
        :pagination= "false"
        :size="table.size"
        :loading="table.tableIsLoading"
        :scroll="table.scrollSize"
        :rowSelection="table.rowSelection"
      >
        <span slot="stateCell" slot-scope="text,record,index" >
           <a-badge :status="badgeState(record)" :text="badgeText(record)"/>
        </span>
        <span slot="actionCell" slot-scope="text,record,index" >
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <a-divider v-if="" type="vertical" />
          <a href="javascript:;" @click="showModal('edit',record)">修改</a>
          <a-divider v-if="" type="vertical" />
          <a-popconfirm title="您确认删除该条记录吗？" placement="bottomRight" okText="Yes" cancelText="No" @confirm="deleteRowData(record)">
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <a-divider v-if="" type="vertical" />
          <a href="javascript:;" @click="showModal('tj',record)">查看进度</a>
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('jcx',record)">检查项</a>-->
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('qy',record)">检查企业</a>-->

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
        <a-spin  :spinning="modalLoading">
        <edit-form
          v-if="this.modalOption.modalType =='add'||this.modalOption.modalType =='edit'"
          :selectOptions="modalOption.selectOptions"
          :recordId="modalOption.recordId"
          :modalType="modalOption.modalType"
          :sfycx="sfycx"
          :sfqy="sfqy"
          @selJcx="selJcx"
          @selJcqy="selJcqy"
          @sfqyChanged="changeQy"
          :tableHeight="modalTableHeight"
          ref="commitForm"/>
          <tj-detail
            v-if="this.modalOption.modalType =='tj'"
            :recordId="modalOption.recordId"
          :sfycx="sfycx"/>
        <data-detail
          v-if="this.modalOption.modalType=='query'"
          :selectOptions="modalOption.selectOptions"
          :recordId="modalOption.recordId" />

        <amap-modal
          v-if="modalOption.modalType=='map'"
          :recordId="modalOption.recordId"
          :recordGps="{lng:recordData.lng,lat:recordData.lat}"
          :height="modalOption.bodyStyle['max-height']"
          @closeMap="closeMap"
          :city="modalOption.mapCity"
          :default-center="modalOption.defaultCenter"
          :commitGpsAction="modalOption.commitGpsAction"/>
        </a-spin>
        <template slot="footer" >
          <a-button v-show="this.modalOption.modalType=='add' || this.modalOption.modalType=='edit' || this.modalOption.modalType=='query'" key="back" @click="modalCancel" size="small">返 回</a-button>
          <a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
          <a-button v-show="this.modalOption.modalType=='add' || this.modalOption.modalType=='edit'"  key="submit" type="primary" :loading="modalOption.commitLoading"  size="small">提 交</a-button>
          </a-popconfirm>
        </template>
      </a-modal>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import editForm from './editForm'
  import moment from 'moment'
//  import jcxTableForm from './jcxTableForm'
//  import qyTableForm from './qyTableForm'
  import tjDetail from './tjDetail.vue'
  import dataDetail from './dataDetail'
  import AmapModal from  '../../wryComps/AmapModal.vue'
  import { initColumn } from '@/utils/tableColumnInit'

  const pageName='jxgl_zxjcplan'

  // sfycx 为1 表示一次性计划页面  为0表示周期性计划页面
  const sfycx='1'

  const modalTitle="专项检查计划"   //模态框的title标题

  const selOptions=['scheTime']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation='INIT_ZXJCPLAN_SELECTED_OPTIONS'   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='jxgl_zxjcplan_list'                //获取table的list
  const getSelOpitons='jxgl_zxjcplan_selOptions'   //获取选择项的配置内容
  const getDetailById='getJcplanById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqZxjcplanList'                   //查询列表
  const createAction='createZxjcplan'             //新增记录
  const editAction='createZxjcplan'                 //修改记录
  const delAction='delZxjcplan'                   //删除
  const editGpsAction=''           //修改Gps信息

  export default {
//    moment,
    name: 'jxgl_zxjcplan',
    components: {
      editForm,
      dataDetail,
      AmapModal,
//      jcxTableForm,
//      qyTableForm,
      tjDetail
    },
    data(){
      return {
        pageTitle: modalTitle,
        pageNmae: pageName,
        search:{
          placeholder:'',
          searchValue:'',
          searchOption:{},
          showAdvanced:false,
          advancedForm:{
            inputs:[''],
            sfycx:undefined,
            state:undefined,
            planstartDate:undefined
          },
        },
        modalLoading:false,
        jcxSelects:[],
        qySelects:[],
        sfycx:sfycx,
        sfqy:null,
        table: {
          dataSource: [],
          columns: [
            {title: '序号', dataIndex: 'index', width: '50px', align: 'center'},
            {title: '计划名称', dataIndex: 'planname', width: '180px', align: 'left', titleAlign: 'center'},
            {title: '计划内容', dataIndex: 'neirong', width: '220px', align: 'left', titleAlign: 'center'},
            {
              title: '状态',
              dataIndex: 'state',
              width: '100px',
              align: 'center',
              scopedSlots: {customRender: 'stateCell'}
            },
            {title: '计划周期', dataIndex: 'jhzq', width: '80px', align: 'center'},
            {title: '计划结束日期', dataIndex: 'planendDate', width: '100px', align: 'center'},
            {title: '计划结束时间', dataIndex: 'planendTime', width: '100px', align: 'center'},
            {
              title: '操作',
              dataIndex: 'actions',
              width: '250px',
              align: 'center',
              scopedSlots: {customRender: 'actionCell'}
            },
          ],
          size: 'small',
          tableIsLoading: false,
          scrollSize: {x: 1150, y: window.innerHeight - 120},
          // rowSelection:{
          //   selectedRowKeys: [],
          //   onChange: this.onSelectChange,
          //   columnWidth:'20px',
          // }
          rowSelection: null
        },
        pagination: {
          total: 0,
          current: 1,
          pageSize: 20,
          pageSizeOptions: ['10', '20', '50', '100', '500']
        },
        modalOption: {
          title: '',
          width: '85%',
          visible: false,
          bodyStyle: {
            "max-height": window.innerHeight - 250 + 'px',
            "min-height": 100
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
          modalType: '',
          modalClass: 'nomal-modal'
        }
      }
    },
    computed: {
      recordData(){
        return this.$store.getters[getDetailById](this.modalOption.recordId)
      },
      modalTableHeight(){
        return window.innerHeight - 322
      },
      computedColumns(){
          if (this.sfycx=='1')this.table.columns.splice(4,1)
        return this.table.columns
      }
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
        this.reqTableData()
        this.table.columns = initColumn(this.table.columns)
      },
      mounted(){
        this.$nextTick(function () {
          let _this = this
          window.onresize = function () {
            _this.modalOption.bodyStyle['max-height'] = window.innerHeight - 250 + 'px'
          }
          document.getElementsByClassName('ant-table-body')[0].style.height = `${window.innerHeight}px`

          //初始化选择项,存入vuex相应store的state中
          const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
          const tmp = []
          selOptions.forEach(item => {
            tmp.push({name: item, value: ls[item]})
          })
          this.$store.commit(selOptionMutation, tmp)
          this.modalOption.selectOptions = this.$store.getters[getSelOpitons]

          const lsSearch=JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['专项检查表单任务管理']
          this.search.placeholder="请输入"+lsSearch["0"][0].dispNm+"..."
          this.search.searchOption=lsSearch
        })
      },
      methods: {
        moment,
        // ...mapGetters(['yingji_wz_list','yingji_wz_selOptions','getWzById']),
        // ...mapActions(['reqWzList','createYjwz','editYjwz','delYjwz','editYjwzGps']),
        rowClass(record, index){
          if (index % 2 == 1) return 'even-rows'
        },
        onSelectChange(selectedRowKeys){
          this.table.rowSelection.selectedRowKeys = selectedRowKeys
        },
        refresh(){
          this.reqTableData()
        },
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
          const parameter={
            filter:JSON.stringify(filterOption),
            limit:this.pagination.pageSize,
            start:(this.pagination.current -1)*this.pagination.pageSize,
            param3:this.sfycx=='1'? 1:0
          }
          this.$store.dispatch(reqList,parameter)
            .then((res) => {
              this.table.dataSource = this.$store.getters[getList]
              this.table.dataSource.forEach((item) => {
                item.index=(this.pagination.current - 1) * this.pagination.pageSize+ item.index
                if (item.sfycx != '1'){
                  const tmp=this.modalOption.selectOptions.scheTime.find(i=>i.value==item.scheTime)
                  item.jhzq = tmp ? tmp.label:''
                }else{
                  item.jhzq ='一次性'
                }
              })
              this.pagination.total = res.totalCount
              this.table.tableIsLoading = false
            })
            .catch(err => console.log(JSON.stringify(err)))
        },
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
          searchItems.forEach((item,index)=>{
            if (searchInputs[index] && searchInputs[index] !=''){
              SelValues.push(`(${item} like  '%${searchInputs[index]}%')`)
            }
          })
          this.search.advancedForm.state &&this.search.advancedForm.tmlx!='' ? SelValues.push(`(a.state = '${this.search.advancedForm.state}') `): null
          let searchDate=''
          if(this.search.advancedForm.planstartDate) searchDate=this.search.advancedForm.planstartDate.format('YYYY-MM-DD')
          if (searchDate!='')SelValues.push(`(a.planstartdate <= '${searchDate}' and a.planenddate >= '${searchDate}' and a.planstarttime >= '00:00' and a.planendtime <= '00:00' ) `)
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
          const parameter={
            filter:JSON.stringify(filterOption),
            limit:this.pagination.pageSize,
            start:(this.pagination.current -1)*this.pagination.pageSize,
            param3:this.sfycx=='1'? 1:0
          }
          this.$store.dispatch(reqList,parameter)
            .then((res) => {
              this.table.dataSource = this.$store.getters[getList]
              this.table.dataSource.forEach((item) => {
                item.index=(this.pagination.current - 1) * this.pagination.pageSize+ item.index
                if (item.sfycx != '1'){
                  const tmp=this.modalOption.selectOptions.scheTime.find(i=>i.value==item.scheTime)
                  item.jhzq = tmp ? tmp.label:''
                }else{
                  item.jhzq ='一次性'
                }
              })
              this.pagination.total = res.totalCount
              this.table.tableIsLoading = false
            })
            .catch(err => console.log(JSON.stringify(err)))
        },
        clearSearch(){
          this.search.searchValue=''
          this.search.advancedForm.inputs[0]=''
          this.search.advancedForm.state=undefined
          this.search.advancedForm.sfycx=undefined
          this.search.advancedForm.planstartDate=undefined
          this.reqTableData()
        },
        toggleShowAdvancedSearch(){
          this.search.showAdvanced=!this.search.showAdvanced
          this.search.advancedForm.inputs[0]=''
          this.search.advancedForm.state=undefined
          this.search.advancedForm.sfycx=undefined
          this.search.advancedForm.planstartDate=undefined
          if (this.search.showAdvanced){
            this.table.scrollSize={ x:920, y: window.innerHeight - 152}
            document.getElementsByClassName('ant-table-body')[0].style['']=`${window.innerHeight}px`

          }else{
            this.table.scrollSize={ x:920, y: window.innerHeight - 112}
          }
        },
        selJcx(selects){
          this.jcxSelects=  selects
        },
        selJcqy(selects){
          this.qySelects=  selects
        },
        changeQy(state){
          const tmp=this.table.dataSource.find(item=>item.key==this.modalOption.recordId)
          tmp.sfqy=state
          tmp.state=state==1?"进行中":"未启用"
        },
        showModal(type, record){
          switch (type) {
            case 'add':
              this.modalOption.title = '新增' + modalTitle
              this.modalOption.modalType = 'add'
              this.modalOption.modalClass = 'nomal-modal '
//              this.modalOption.width = '60%'
              break;
            case 'query':
              this.modalOption.title = modalTitle + '详情'
              this.modalOption.modalType = 'query'
              this.modalOption.recordId = record.id
              this.modalOption.modalClass = 'nomal-modal '
//              this.modalOption.width = '60%'
              break;
            case 'edit':
              this.modalOption.title = '修改' + modalTitle + '信息'
              this.modalOption.modalType = 'edit'
              this.modalOption.recordId = record.id
              this.sfqy=record.sfqy==1? true:false
              this.modalOption.modalClass = 'nomal-modal '
//              this.modalOption.width = '60%'
              break;
            case 'tj':
              this.modalOption.title = '专项检查计划进度查询'
              this.modalOption.modalType = 'tj'
              this.modalOption.recordId = record.id
              this.modalOption.modalClass = 'nomal-modal'
//              this.modalOption.width = '85%'
              break;

            case 'jcx':
              this.modalOption.title = '检查项管理'
              this.modalOption.modalType = 'jcx'
              this.modalOption.recordId = record.id
              this.modalOption.modalClass = 'nomal-modal  table-modal no-footer'
              this.modalOption.width = '85%'
              break;

            case 'qy':
              this.modalOption.title = '检查企业管理'
              this.modalOption.modalType = 'qy'
              this.modalOption.recordId = record.id
              this.modalOption.modalClass = 'nomal-modal  table-modal no-footer'
              this.modalOption.width = '85%'
              break;
//          case 'map':
//            this.modalOption.title=modalTitle+'位置信息'
//            this.modalOption.modalType='map'
//            this.modalOption.recordId=record.id
//            this.modalOption.modalClass ='nomal-modal mapModal'
//                break
          }
          this.modalOption.visible = true
        },
        modalCancel(){
          this.modalOption.commitLoading = false
          this.modalOption.visible = false
        },
        closeMap(data){
          if (data == 'post') this.reqTableData()
          this.modalOption.visible = false
        },
        handleCommit(){
          this.$refs.commitForm.form.validateFields((err, values) => {
            if (!err) {
              //若存在选择项value和显示内容不相同，需转换内容后再提交
//              this.modalOption.commitLoading = true
//              if (this.jcxSelects.length==0) {
//                  this.$message.error('请添加检查标准')
//                return
//              }
//              if (this.qySelects.length==0) {
//                  this.$message.error('请添加检查企业')
//                return
//              }
              this.modalLoading=true
              values.sfycx=this.sfycx
              values.planstartDate = values.planstartDate.format('YYYY-MM-DD')
              values.planstartTime = values.planstartTime.format('HH:mm')
              values.planendDate = values.planendDate.format('YYYY-MM-DD')
              values.planendTime = values.planendTime.format('HH:mm')
              values.departmentid = sys_relateDepId2
              if (this.modalOption.modalType == 'edit') {
                values.id = this.modalOption.recordId
                // values.wzbzbm=this.$store.getters[getDetailById](this.modalOption.recordId).wzbzbm
              }
              if(this.modalOption.modalType == 'add'){
                values.sfqy = values.sfqy == true ? 1 : 0
              }
              this.jcxSelects.forEach((item,index)=>{
                  item.sortNum=index
                delete item.id
              })
              const qy=[]
              this.qySelects.forEach((item)=>{
                  qy.push({dwid:item.dwid})
              })
              let parameter = {
                jsonData: JSON.stringify({
                  defjcbplan:values,
                  defjcbdetail:this.jcxSelects,
//                  defjcbdetail:this.qySelects,
                  defjcbplanqy:qy,
//                  defjcbplanqy:this.jcxSelects
                }),
              }
              switch (this.modalOption.modalType) {
                case 'add':
                  this.$store.dispatch(createAction, parameter).then((res) => {
                    if (res.success == true) {
                      this.$message.success('提交成功！')
                      this.reqTableData()
                      setTimeout(() => {
//                          this.modalOption.commitLoading = false
                          this.modalLoading=false
                          this.modalOption.visible = false
                        }
                        , 300
                      )
                    } else {
                      this.$message.error(res.message + '请稍后再试！')
                      this.modalLoading=false
//                      this.modalOption.commitLoading = false
                    }
                  })
                  break
                case 'edit':
                  this.$store.dispatch(editAction, parameter).then((res) => {
                    if (res.success == true) {
                      this.$message.success('提交成功！')
                      this.reqTableData()
                      setTimeout(() => {
//                          this.modalOption.commitLoading = false
                          this.modalLoading=false
                          this.modalOption.visible = false
                        }
                        , 300
                      )
                    } else {
                      this.$message.error(res.message + '请稍后再试！')
                      this.modalLoading=false
//                      this.modalOption.commitLoading = false
                    }
                  })
                  break
              }
            }
          })
        },
        deleteRowData(record){
          let parameter = {
            jsonData: JSON.stringify(this.$store.getters[getDetailById](record.id)),
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
        reqTableData(){
          this.table.tableIsLoading = true
          const parameter = {
            limit: this.pagination.pageSize,
            start: (this.pagination.current - 1) * this.pagination.pageSize,
            param3:this.sfycx=='1'? 1:0
          }
          this.$store.dispatch(reqList, parameter)
            .then((res) => {
              this.table.dataSource = this.$store.getters[getList]
              this.table.dataSource.forEach((item) => {
                  item.index=(this.pagination.current - 1) * this.pagination.pageSize+ item.index
                if (item.sfycx != '1'){
                  const tmp=this.modalOption.selectOptions.scheTime.find(i=>i.value==item.scheTime)
                  item.jhzq = tmp ? tmp.label:''
                }else{
                  item.jhzq ='一次性'
                }
              })
              this.pagination.total = res.totalCount
              this.table.tableIsLoading = false
            })
            .catch(err => console.log(JSON.stringify(err)))
        },
        badgeState(record){
          switch (record.state) {
            case '未启用':
              return 'default'
              break
            case '进行中':
              return 'processing'
              break
            case '完结':
              return 'warning'
              break
            case '归档':
              return 'success'
              break
          }
        },
        badgeText(record){
          switch (record.state) {
            case '未启用':
              return '未启用'
              break
            case '进行中':
              return '进行中 '
              break
            case '完结':
              return '已完结'
              break
            case '归档':
              return '已归档'
              break
          }
        },
        changeCurrentPage(page, pageSize){
          this.pagination.current = page
          this.pagination.pageSize = pageSize
          this.reqTableData()
        },
        showSizeChange(current, size){
          const start = (this.pagination.current - 1 ) * this.pagination.pageSize
          if (start == 0) {
            this.pagination.current = 1
          } else {
            this.pagination.current = Math.ceil(start / size)
          }
          this.pagination.pageSize = size
          this.reqTableData()
        },
      }
    }

</script>

<style lang="scss" scoped >
  .ant-form-item{
    margin-bottom: 0px;
  }
</style>