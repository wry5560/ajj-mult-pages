<template>

    <div :class="pageName" style="height: 100%">
      <!--下面是顶部的按钮栏-->
      <div  class="header-buttons-bar" style="padding-left: 5px">
        <a-button type='primary' @click="showModal('add')"size="small">新增{{this.pageTitle}}</a-button>
        <a-popconfirm title="您确认删除这些记录吗？" placement="bottomLeft" okText="Yes" cancelText="No" @confirm="deleteRowData('multi')">
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
        <a-button size="small"  style="margin-left: 5px" :disabled="search.searchValue==''&& !search.advancedForm.tmlx && !search.advancedForm.jclx" @click="clearSearch">清除</a-button>
        <a-button @click="refresh"size="small">刷新</a-button>
      </div>
      <transition name="fade">
        <div v-if="search.showAdvanced">
          <a-row >
            <a-col :lg="7" :md="12" :sm="24">
              <a-form-item label="检查内容" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                <a-input style="width:100%" size="small" placeholder="请输入检查内容" v-model="search.advancedForm.inputs[0]" @pressEnter="onAdvancedSearch">
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="7" :md="12" :sm="24">
              <a-form-item label="检查依据" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                <a-input style="width:100%" size="small" placeholder="请输入检查依据" v-model="search.advancedForm.inputs[1]" @pressEnter="onAdvancedSearch">
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="7" :md="12" :sm="24">
              <a-form-item label="条目类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                <a-select style="width:100%" size="small" placeholder="请选择条目类型" v-model="search.advancedForm.tmlx" allowClear>
                  <a-select-option v-for="(item) in modalOption.selectOptions.tmlx" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col  :lg="2" :md="12" :sm="24">
              <a-form-item>
                <a-button type='primary'size="small" style="margin-left: 8px" @click="onAdvancedSearch" >搜索</a-button>
              </a-form-item>
            </a-col>
            <a-col :lg="7" :md="12" :sm="24">
              <a-form-item label="检查类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                <a-cascader :options="modalOption.selectOptions['风险']"  style="width:100%" size="small" :loadData="selLoadData" placeholder="请选择检查类型" v-model="search.advancedForm.jclx" changeOnSelect>
                </a-cascader>
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
          <a href="javascript:;" @click="showModal('query',record)">查看</a>
          <!--<a-divider v-if="" type="vertical" />-->
          <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
          <a-divider v-if="" type="vertical" />
          <a href="javascript:;" @click="showModal('edit',record)">修改</a>
          <a-divider v-if="" type="vertical" />
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

          <amap-modal
            v-if="modalOption.modelType=='map'"
            :recordId="modalOption.recordId"
            :recordGps="{lng:recordData.lng,lat:recordData.lat}"
            :height="modalOption.bodyStyle['max-height']"
            @closeMap="closeMap"
            :city="modalOption.mapCity"
            :default-center="modalOption.defaultCenter"
            :commitGpsAction="modalOption.commitGpsAction"/>
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
  import {  mapGetters,mapActions } from 'vuex'
  import {GeneralQuerySelChildren} from '../api'
  import editForm from './editForm'
  import dataDetail from './dataDetail'
  import AmapModal from  '../../wryComps/AmapModal.vue'
  import { initColumn } from '@/utils/tableColumnInit'

  const pageName='jxgl_zxjc_jcxsel'
  const modalTitle="检查标准"   //模态框的title标题

  const selOptions=['tmlx','风险']          //选择项所需要的配置，localstorage中的配置名称
  const selOptionMutation='INIT_JCX_SELECTED_OPTIONS'   //将选择项配置保存到store的mutation方法名
  //修改以下获取store数据的getters 配置
  const getList='jxgl_jcx_list'                //获取table的list
  const getSelOpitons='jxgl_jcx_selOptions'   //获取选择项的配置内容
  const getDetailById='getJcxById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList='reqJcxList'                   //查询列表
  const createAction='createJcx'             //新增记录
  const editAction='editJcx'                 //修改记录
  const delAction='delJcx'                   //删除
  const editGpsAction=''                  //修改Gps信息

  export default {
    name:pageName,
    components:{
      editForm,
      dataDetail,
      AmapModal
    },
    data(){
      return{
        modalLoading:false,
        pageTitle:modalTitle,
        pageNmae:pageName,
        search:{
          placeholder:'',
          searchValue:'',
          searchOption:{},
          showAdvanced:false,
          advancedForm:{
            inputs:['',''],
            jclx:undefined,
            tmlx:undefined,
          },
        },
        table:{
          dataSource:[],
          columns:[
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {title: '条目类型',dataIndex: 'tmlx', width: '80px', align: 'center'},
            {title: '检查类型', dataIndex: 'jclx0', width: '200px', align: 'left',titleAlign:'center'},
//            {title: '检查子类型', dataIndex: 'jclx2', width: '120px', align: 'left',titleAlign:'center'},
            {title: '检查内容', dataIndex: 'jcnr', width: '200px', align: 'left',titleAlign:'center'},
            {title: '检查依据', dataIndex: 'jcyj', width: '200px', align: 'left',titleAlign:'center'},
            // {title: '隐患提示', dataIndex: 'yhts', width: '150px',align: 'center'},
            // {title: '系统未落实提示', dataIndex: 'systs', width: '150px', align: 'center',},
            // {title: '所属组织', dataIndex: 'departName', width: '120px',align: 'center'},
            {title: '操作', dataIndex: 'actions', width: '150px', align: 'center', scopedSlots: {customRender: 'actionCell'}},
          ],
          size:'small',
          tableIsLoading:false,
          scrollSize: { x:920, y: window.innerHeight - 112},
//           rowSelection:{
//             selectedRowKeys: [],
//             onChange: this.onSelectChange,
//             columnWidth:'20px',
//           }
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
      recordData(){
        return this.$store.getters[getDetailById](this.modalOption.recordId)
      },
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
          // debugger
          _this.table.scrollSize.y= window.innerHeight - 112
          // _this.modalOption.bodyStyle['max-height']= window.innerHeight -250+'px'
        }
        // document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight}px`

        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))

        const tmp=[]
        selOptions.forEach(item=>{tmp.push({name:item,value:ls[item],lable:item,isLeaf:false})})
        this.$store.commit(selOptionMutation,tmp)
        this.modalOption.selectOptions=this.$store.getters[getSelOpitons]
        this.modalOption.selectOptions['风险'].forEach(item=>item.isLeaf=false)

        const lsSearch=JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['检查条目列表']
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
        this.reqTableData()
      },
      toggleShowAdvancedSearch(){
        this.search.showAdvanced=!this.search.showAdvanced
        this.search.advancedForm.jclx=undefined
        this.search.advancedForm.tmlx=undefined
        if (this.search.showAdvanced){
            this.table.scrollSize={ x:920, y: window.innerHeight - 190}
           document.getElementsByClassName('ant-table-body')[0].style['']=`${window.innerHeight}px`

        }else{
          this.table.scrollSize={ x:920, y: window.innerHeight - 112}
        }
      },
      selLoadData(selectedOptions){
        const targetOption = selectedOptions[selectedOptions.length - 1];
//          alert(JSON.stringify(selectedOptions))
        targetOption.loading=true
        const parameter ={
          param1 : targetOption.value
        }
        GeneralQuerySelChildren(parameter)
          .then((res)=>{
            if(res.success){
//              alert(JSON.stringify(res.data))
              targetOption.loading=false
              targetOption.children=res.data
              targetOption.children.forEach((item)=>{
                item.value=item.VALUE
                delete item.VALUE
              })
              this.modalOption.selectOptions["风险"]=[...this.modalOption.selectOptions["风险"]]
            }else{
                this.$message.error(res.message)
            }
          })
          .catch((err)=>{JSON.stringify(err)})
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
          param1:sys_relateDepId2,
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            this.table.dataSource=this.$store.getters[getList]
            this.table.dataSource.forEach((item,index)=>{
              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
              item.jclx0=item.jclx + ' - '+item.jclx2
            })
            this.pagination.total=res.totalCount
            this.table.tableIsLoading=false
          })
          .catch(err=>console.log(JSON.stringify(err)))
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
        this.search.advancedForm.tmlx &&this.search.advancedForm.tmlx!='' ? SelValues.push(`(a.tmlx = '${this.search.advancedForm.tmlx}') `): null
        if(this.search.advancedForm.jclx){
          this.search.advancedForm.jclx[0] &&this.search.advancedForm.jclx[0]!='' ? SelValues.push(`(a.jclx = '${this.search.advancedForm.jclx[0]}') `): null
          this.search.advancedForm.jclx[1] &&this.search.advancedForm.jclx[1]!='' ? SelValues.push(`(a.jclx2 = '${this.search.advancedForm.jclx[1]}') `): null
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
        const parameter={
          filter:JSON.stringify(filterOption),
          param1:sys_relateDepId2,
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            this.table.dataSource=this.$store.getters[getList]
            this.table.dataSource.forEach((item,index)=>{
              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
              item.jclx0=item.jclx + ' - '+item.jclx2
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
      },
      modalCancel(){
        this.modalOption.commitLoading=false
        this.modalOption.visible=false
      },



      handleCommit(){
        this.$refs.commitForm.form.validateFields((err, values) => {
          if (!err) {
            //若存在选择项value和显示内容不相同，需转换内容后再提交
//            this.modalOption.commitLoading=true
            this.modalLoading=true
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
      reqTableData(){
        this.table.tableIsLoading=true
        const parameter={
          limit:this.pagination.pageSize,
          start:(this.pagination.current -1)*this.pagination.pageSize
        }
        this.$store.dispatch(reqList,parameter)
          .then((res)=>{
            this.table.dataSource=this.$store.getters[getList]
            this.table.dataSource.forEach((item,index)=>{
                item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
              item.jclx0=item.jclx + ' - '+item.jclx2
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
<style lang="scss" scoped >
  .ant-form-item{
    margin-bottom: 0px;
  }
</style>