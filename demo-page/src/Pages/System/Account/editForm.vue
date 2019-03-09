<template>
  <div class="account-form" :style="{height:height}">
    <div class="wry-content">
      <a-spin :spinning="contentLoading" wrapperClassName="spinning">
        <a-form :form="form" >
            <a-row :gutter="16">
              <a-col :lg="12" :md="12" :sm="24">
                <a-form-item label="用户名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input
                    size="small"
                    placeholder="请输入用户名称"
                    v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入用户名称', whitespace: true}],initialValue: initialValues.name}
              ]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24">
                <a-form-item label="性别" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-select
                    size="small"
                    placeholder="请选择性别"
                    v-decorator="['sex',{initialValue: initialValues.sex}]" >
                    <a-select-option key="M">男</a-select-option>
                    <a-select-option key="F">女</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24">
                <a-form-item label="用户帐号" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input
                    size="small"
                    placeholder="请输入用户帐号"
                    v-decorator="[
                'loginid',
                {rules: [{ required: true, message: '请输入用户帐号', whitespace: true}],initialValue: initialValues.loginid}
              ]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24">
                <a-form-item label="手机号" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input
                    size="small"
                    placeholder="请输入手机号"
                    v-decorator="[
                'mobilephone',
                {rules: [{ required: true, message: '请输入手机号', whitespace: true}],initialValue: initialValues.mobilephone}
              ]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24">
                <a-form-item label="所属部门" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-tree-select
                    :treeData="treeData"
                    size="small"
                    placeholder="请选择所属部门"
                    v-decorator="['departmentId',{rules: [{ required: true, message: '请选择所属部门', whitespace: true,type:'number'}],initialValue: this.modelType=='edit'? Number(initialValues.departmentid)  :null}]" />
                </a-form-item>
              </a-col>
            </a-row>
        </a-form>
        <div class="content-wrapper">
          <div class="header">
            <span class="before-title"> </span>
            <span class="title"><span >角色授权</span></span>
          </div>

          <a-table
            bordered
            :rowClassName="rowClass"
            :dataSource="table.dataSource"
            :columns="table.columns"
            :pagination="false"
            :size="table.size"
            :loading="table.tableIsLoading"
            :scroll="tableScrollSize"
            :rowSelection="table.rowSelection"
          >
            <span slot="actionCell" slot-scope="text,record,index">
              <!--<a-popconfirm title="您确认还原该账户吗？" placement="bottomRight" okText="Yes" cancelText="No"-->
                            <!--@confirm="unForbidden(record)">-->
              <!--<a href="javascript:;" v-if="record.disabled">还原</a>-->
                <!--</a-popconfirm>-->
              <!--<a-popconfirm title="您确认禁用该账户吗？" placement="bottomRight" okText="Yes" cancelText="No"-->
                            <!--@confirm="forbidden(record)">-->
              <!--<a href="javascript:;" v-if="!record.disabled" >禁用</a>-->
                <!--</a-popconfirm>-->

              <!--<a href="javascript:;" @click="showModal('query',record)">查看</a>-->
              <!--<a-divider v-if="" type="vertical" />-->
              <!--<a href="javascript:;" @click="showModal('map',record)">位置</a>-->
              <!--<a href="javascript:;" @click="showModal('add',record)">新增</a>-->
              <!--<a-divider v-if="" type="vertical"/>-->
              <!--<a href="javascript:;" @click="showModal('edit',record)">修改</a>-->
              <!--<a-divider v-if="" type="vertical"/>-->
              <span v-if="modelType=='add'">
              <a href="javascript:;" v-if="record.isAuthed=='0'" @click="()=>{record.isAuthed='1'}">授权</a>
              <a href="javascript:;" v-if="record.isAuthed=='1'" @click="()=>{record.isAuthed='0'}">取消授权</a>
              </span>
              <span v-if="modelType=='edit'">
              <a href="javascript:;" v-if="record.isAuthed=='0'" @click="addRole(record)">授权</a>
              <a href="javascript:;" v-if="record.isAuthed=='1'" @click="deleteRole(record)">取消授权</a>
              </span>
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
          <div class="bottom-pagination-warpper">

            <div style="clear: both"></div>
          </div>

        </div>
      </a-spin>
    </div>
    <div class="bottom-buttons-bar">
      <div>
        <a-pagination
          v-model="pagination.current"
          style="float:left;"
          :total="pagination.total"
          :pageSizeOptions="pagination.pageSizeOptions"
          :pageSize="pagination.pageSize"
          showSizeChanger
          showQuickJumper
          :showTotal="total =>`共${total}条数据`"
          @change="changeCurrentPage"
          @showSizeChange="showSizeChange"
          size="small"/>
        <a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
        <a-button size="small" type="primary"  style="float:right">提交</a-button>
        </a-popconfirm>
        <a-button size="small" @click="modalCancel" style="float:right">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
  // import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'
  import { initTableChildren } from '@/utils/tableChildrenInit'

//  import roleMunuTree from './roleMunuTree.vue'

  const getList = 'system_accountRole_list'                //获取table的list
  const getSelOpitons = ''   //获取选择项的配置内容
  const getDetailById = ''              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList = 'reqAccountRoleList'                   //查询列表
  const createAction = 'createAccount'             //新增记录
  const editAction = 'editAccount'                 //修改记录
  export default{
    name:'accountForm',
    components: {
//      roleMunuTree
    },
    props:{
      selectOptions:Object,
      height:String,
      recordId:[String,Number],
      modelType:String,
      dataSource:Array,
      departId:[String,Number],
      treeData:Array
    },

    data(){
      return{
        form: this.$form.createForm(this),
        contentLoading:false,
        data:[],

        //表格配置
        table: {
          dataSource: [],
          columns: [
            {title: '序号', dataIndex: 'index', width: '50px',align: 'center'},
            {
              title: '操作',
              dataIndex: 'actions',
              width: '60px',
              align: 'center',
              scopedSlots: {customRender: 'actionCell'}
            },
            {title: '角色名称', dataIndex: 'rolename', width: '100px', align: 'left', titleAlign: 'center'},
            {title: '角色描述', dataIndex: 'rolevalue', width: '200px', align: 'left', titleAlign: 'center'},
//            {title: '所属部门', dataIndex: 'departName', width: '150px', align: 'left', titleAlign: 'center'},
            {title: '是否授权', dataIndex: 'sfsq', width: '50px', align: 'center', titleAlign: 'center'},
//            {
//              title: '操作',
//              dataIndex: 'actions',
//              width: '120px',
//              align: 'center',
//              scopedSlots: {customRender: 'actionCell'}
//            },
          ],
          size: 'small',
          tableIsLoading: false,
          scrollSize: {x: 550, y: window.innerHeight - 480}, //本页没有使用该属性，使用了计算属性动态变化
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
          pageSize: 20,
          pageSizeOptions: ['10', '20', '50', '100', '500'],
          reqData: true                  //是否使用后台请求分页  为flase则为前端分页
        },
      }
    },
    created(){
        this.reqTableData()
//      this.reqZuzhiList()
//        .then((res)=>{
//              if(res.success){
//                this.data=res.data
//              }
//            })
    },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit') {
          initialValues = {...this.getAccountById()(this.recordId)}
        }
        return initialValues
      },
      tableScrollSize(){
        return {x: 550, y: parseInt(this.height) - 340}
      }
//      treeData(){
//        return this.initTree(initTableChildren(this.data))
//      }
    },

    methods:{
      ...mapGetters(['getAccountById','system_zuzhi_list']),
      ...mapActions(['reqZuzhiList','editRoleMenu','addUserRole','deleteUserRole']),
      handleCommit(){
        let _this=this
        this.form.validateFields((err, values) => {
          if (!err) {
              debugger
            this.contentLoading = true

            //若存在选择项value和显示内容不相同，需转换内容后再提交,，如时间等
//            values.jclx2=values.jclx.length>1 ? values.jclx[1]:null
//            values.jclx=values.jclx[0]
//            values.departmentid=sys_relateDepId2
            let parameter = {
              param1: JSON.stringify({
                storeMap1:values
              }),
            }

            //----------------------------------------------------------------创建用户----------------------------------------------------------------------

            switch (this.modelType) {
              case 'add':
                let ids=''
                this.table.dataSource.forEach(item=>{
                    if(item.isAuthed=='1') ids = ids==''? item.id : ids + ','+item.id
                })

                this.$store.dispatch(createAction, parameter).then((res) => {
                  if (res.success) {
                    let parameter2={
                      param1:res.data[0].id,
                      param2:ids,
                    }
                      this.addUserRole(parameter2)
                        .then((res)=>{
                          if(res.success){
                            this.reqTableData()
                            this.$message.success('新建成功！')
                            this.$emit('cancel','success')
                            this.table.tableIsLoading = false
                          }else{
                            this.$message.error(res.message)
                            this.table.tableIsLoading = false
                          }
                        })
                        .catch((err)=>console.log(JSON.stringify(err)))
                  } else {
                    this.$message.error(res.message + '请稍后再试！')
                    this.contentLoading = false
                  }
                })
                break


              //----------------------------------------------------------------修改用户的信息----------------------------------------------------------------------
              case 'edit':
                if (this.modelType == 'edit') {
//                  const tmp = {
//                    ...this.$store.getters[getDetailById](this.modalOption.recordId),
//                    ...values
//                  }
                  values.id=this.recordId
                  parameter = {
                    param1: JSON.stringify({
                      storeMap1:values
                    }),
                  }
                }
                this.$store.dispatch(editAction, parameter).then((res) => {
                  if (res.success == true) {
                    this.$message.success('提交成功！')
//                      this.commitRoleMenu(_this)
//                        .then((res)=>{
//                          if(res.success){
//                            this.$message.success('提交成功！')
                            this.$emit('cancel','success')
//                          }else{
//                            this.$message.error(res.message + '请稍后再试！')
//                            this.contentLoading = false
//                          }
//                        })
                  }else{
                    this.$message.error(res.message + '请稍后再试！')
                    this.contentLoading = false
                  }
                })
                break
            }
          }
        })
      },
      modalCancel(){
        this.$emit('cancel')
      },
      initTree(datas){
//          debugger
          let aaa=[]
          datas.forEach((data,index)=>{
//              debugger
              const tmp={
                title:data.departname,
                value:data.id,
                key:data.id,
              }
              if (data.children && data.children.length>0) tmp.children=this.initTree(data.children)
           aaa.push(tmp)
          })
        return aaa
      },
      handleTreeSelect(value,node, extra){
        console.log(value)
        this.departId=value
      },

      //----------------------------------------------------表格通用方法--------------------------

      //单双行条纹样式
      rowClass(record, index){
        let className=''
        if (index % 2 == 1) className += 'even-rows'
        if (record.disabled) className +=' disabled'
        if (record.isAuthed=='1') className +=' active'
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

      //----------------------------------------------------------------修改角色的菜单----------------------------------------------------------------------
      commitRoleMenu(_this){
          return new Promise((resolve,reject)=>{
//            debugger
            const menuData=this.$refs.roleMenuTree.menuData
            const authedMenus=this.$refs.roleMenuTree.authedMenus
            const addMenus=[]
            const delMenus=[]
            const selKeys=this.$refs.roleMenuTree.checkedKeys.checked.concat(this.$refs.roleMenuTree.checkedKeys.halfChecked)
            selKeys.forEach(i=>{
//                debugger
              const index=authedMenus.findIndex(item=>item.id==i)
              if(index ==-1){
                  addMenus.push(menuData.find(item=>item.id==i))
              }
            })
            authedMenus.forEach(item=>{
              const index=selKeys.findIndex(i=>i==item.id)
              if(index ==-1)delMenus.push(item)
            })
            const paramater2={
              param1: JSON.stringify({
                storeMap1:addMenus
              }),
              param2:  JSON.stringify({
                storeMap1:delMenus
              }),
              param3: this.recordId,
            }
            _this.editRoleMenu(paramater2)
              .then(res=>resolve(res))
              .catch(err=>reject(err))
          })
      },

      //请求表格数据
      reqTableData(filterOption){
//          debugger
        this.table.tableIsLoading = true
        const parameter = {
          limit: this.pagination.reqData ? this.pagination.pageSize : 10000,
          start: this.pagination.reqData ? (this.pagination.current - 1) * this.pagination.pageSize : 0,
        }
        if (this.modelType=='edit') parameter.param1=this.recordId
        if (filterOption) parameter.filter = JSON.stringify(filterOption)       //增加搜索条件

        this.$store.dispatch(reqList, parameter)
          .then((res) => {

            //请求成功后，在下面进行数据处理，赋值给table
//            this.table.dataSource = initTableChildren([...this.$store.getters[getList]])
            this.table.dataSource = [...this.$store.getters[getList]]
            this.table.dataSource.forEach((item,index)=>{
              item.index=index+(this.pagination.current -1)*this.pagination.pageSize+1
              item.sfsq=item.isAuthed=='1' ? "是" : "否"
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

      //授权
      addRole(record){
//          debugger
        this.table.tableIsLoading = true
        const paramater={
          param1:this.recordId,
          param2:record.id
        }
        this.addUserRole(paramater)
          .then((res)=>{
            if(res.success){
              this.reqTableData()
              this.$message.success('授权成功！')
              this.table.tableIsLoading = false
            }else{
              this.$message.error(res.message)
              this.table.tableIsLoading = false
            }
          })
          .catch((err)=>console.log(JSON.stringify(err)))
      },

      //取消授权
      deleteRole(record){
        this.table.tableIsLoading = true
        const paramater={
          param1:this.recordId,
          param2:record.id
        }
        this.deleteUserRole(paramater)
          .then((res)=>{
            if(res.success){
              this.reqTableData()
              this.$message.success('取消授权成功！')
              this.table.tableIsLoading = false
            }else{
              this.$message.error(res.message)
              this.table.tableIsLoading = false
            }
          })
          .catch((err)=>console.log(JSON.stringify(err)))
      }
    }
  }
</script>

<style lang="scss" >
  .role-form{

    .item-title{
      text-align: right;
      display: inline-block;
      width: 100%;
    }
    .spinning{
      height:100%;
      .ant-spin-container{
        height:100%;
      }
    }
    .ant-form-item{
      /*margin-bottom: 8px;*/
    }
    .role-sider{
      padding:8px;

      width:300px;
      height: calc(100% - 45px);
      display: inline-block;
    }
    .role-content{
      vertical-align:top;
      padding:8px;
      padding-left:0;
      padding-right: 24px;
      /*width:calc(100% - 300px);*/
      /*height: calc(100% - 45px);*/
      height: 100%;
      /*display: inline-block;*/
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
      width: 18px !important;
      height: 18px !important;
      line-height: 18px !important;
    }
    .ant-tree-node-content-wrapper{
      height: 18px !important;
      line-height: 18px !important;
      font-size: 12px !important;
    }
    .ant-tree li {
      padding: 2px 0;
    }
    .ant-tree.ant-tree-show-line li:not(:last-child):before{
      left: 8px;
      margin: 4px 0;
    }
    .ant-divider-horizontal{
      margin:12px 0
    }
    .ant-collapse-borderless{
      .ant-form-item{
        margin-bottom: 0px;
      }
      .ant-collapse-content-box{
        padding:0px
      }
    }
    .ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
      padding-top: 0px;
    }
  }
</style>

<style lang="scss" scoped>
  .account-form{
    .wry-content{
      padding:16px;
      padding-right: 32px;
    }
    .content-wrapper {
      padding-left: 36px;
      width: 100%;
      .header {
        margin-bottom: 15px;
        .title {
          border-left: 4px solid #1478f0;
          padding-left: 8px;
          font-size: 16px;
          color: #575757;
          font-weight: 600;
        };
        .button-bar {

        }
      };
    }
  }


</style>