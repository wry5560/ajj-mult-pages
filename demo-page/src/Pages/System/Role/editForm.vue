<template>
  <div class="role-form" :style="{height:height}">
    <div class="role-content">
      <a-spin :spinning="contentLoading" wrapperClassName="spinning">
        <a-form :form="form" >
            <a-row :gutter="16">
              <a-col :lg="24" :md="12" :sm="24">
                <a-form-item label="角色名称" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
                  <a-input
                    size="small"
                    placeholder="请输入角色名称"
                    v-decorator="[
                'rolename',
                {rules: [{ required: true, message: '请输入角色名称', whitespace: true}],initialValue: initialValues.rolename}
              ]" />
                </a-form-item>
              </a-col>
              <!--<a-col :lg="12" :md="12" :sm="24">-->
                <!--<a-form-item label="所属部门" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">-->
                  <!--<a-tree-select-->
                    <!--showSearch-->
                    <!--searchPlaceholder="请选择所属部门"-->
                    <!--treeNodeFilterProp="title"-->
                    <!--:dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"-->
                    <!--:treeData="treeData"-->
                    <!--treeDefaultExpandAll-->
                    <!--size="small"-->
                    <!--placeholder="请选择所属部门"-->
                    <!--@select="handleTreeSelect"-->
                    <!--v-decorator="['departmentId',{rules: [{ required: true, message: '请选择所属部门', whitespace: true,type:'number'}],initialValue: this.modelType=='edit'? Number(initialValues.__ddepartmentId.departId)  :null}]" />-->
                <!--</a-form-item>-->
              <!--</a-col>-->
              <a-col :lg="24">
                <a-form-item label="角色说明" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
                  <a-textarea size="small" placeholder="请输入角色说明" :autosize="{ minRows: 2, maxRows: 8 }"v-decorator="['rolevalue',{initialValue: initialValues.rolevalue}]" />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        <a-row align="top" style="height:calc(100% - 200px)">
          <a-col :lg="4">
              <div style="text-align: right"><strong>角色菜单授权：</strong></div>
          </a-col>
          <a-col :lg="20" style="height: 100%">
            <div style=" padding:12px; border: 1px solid #e2e2e2;height:100%;overflow: auto">
              <role-munu-tree :recordId="recordId" :departId="sys_relateDepId2" :type="modelType" ref="roleMenuTree"/>
            </div>
          </a-col>
        </a-row>
      </a-spin>
    </div>
    <div class="bottom-buttons-bar">
      <div>
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

  import roleMunuTree from './roleMunuTree.vue'

  const getList = 'system_role_list'                //获取table的list
  const getSelOpitons = 'system_role_selOptions'   //获取选择项的配置内容
  const getDetailById = 'getRoleById'              //获取某一具体记录的详情

  //修改以下增删改查的Actions 方法名
  const reqList = 'reqRoleiList'                   //查询列表
  const createAction = 'createRole'             //新增记录
  const editAction = 'editRole'                 //修改记录
  export default{
    name:'roleForm',
    components: {
      roleMunuTree
    },
    props:{
      selectOptions:Object,
      height:String,
      recordId:[String,Number],
      modelType:String,
      dataSource:Array,
      departId:[String,Number],
    },

    data(){
      return{
        sys_relateDepId2,
        form: this.$form.createForm(this),
        contentLoading:false,
        data:[]

      }
    },
    created(){

      this.reqZuzhiList()
        .then((res)=>{
              if(res.success){
                this.data=res.data
              }
            })
    },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit') {
          initialValues = {...this.getRoleById()(this.recordId)}
        }
        return initialValues
      },
      treeData(){
        return this.initTree(initTableChildren(this.data))
      }
    },
    methods:{
      ...mapGetters(['getRoleById','system_zuzhi_list']),
      ...mapActions(['reqZuzhiList','editRoleMenu']),
      handleCommit(){
        let _this=this
        this.form.validateFields((err, values) => {
          if (!err) {
            this.contentLoading = true

            //若存在选择项value和显示内容不相同，需转换内容后再提交,，如时间等
//            values.jclx2=values.jclx.length>1 ? values.jclx[1]:null
//            values.jclx=values.jclx[0]
//            values.departmentid=sys_relateDepId2
            let parameter = {
              jsonData: JSON.stringify(values),
            }

            //----------------------------------------------------------------创建角色----------------------------------------------------------------------

            switch (this.modelType) {
              case 'add':
                const menuData=this.$refs.roleMenuTree.menuData
                const selKeys=this.$refs.roleMenuTree.checkedKeys.checked.concat(this.$refs.roleMenuTree.checkedKeys.halfChecked)
                const addMenus=[]
                let menuString=''
                selKeys.forEach((i,index)=>{
//                debugger
                  const aaa=menuData.find(item=>item.id==i)
//                  aaa.authed="true"

                    addMenus.push({
                      id:aaa.id,
                      fullId:aaa.fullId
                    })
//                  addMenus.push(aaa)
                  menuString = menuString + ( index == 0 ? '': ',')+ aaa.id
                })
                parameter={
//                    param1:menuString,
//                    param1:addMenus,
                    param1:JSON.stringify({storeMap1:addMenus}),
                  ...parameter
                }
                this.$store.dispatch(createAction, parameter).then((res) => {
                  if (res.success == true) {
                    this.$message.success('提交成功！')
                    this.$emit('cancel','success')
                  } else {
                    this.$message.error(res.message + '请稍后再试！')
                    this.contentLoading = false
                  }
                })
                break


              //----------------------------------------------------------------修改角色的信息----------------------------------------------------------------------
              case 'edit':
                if (this.modelType == 'edit') {
//                  const tmp = {
//                    ...this.$store.getters[getDetailById](this.modalOption.recordId),
//                    ...values
//                  }
                  values.id=this.$store.getters[getDetailById](this.recordId).id
                  parameter = {
                    jsonData: JSON.stringify(values),
                  }
                }
                this.$store.dispatch(editAction, parameter).then((res) => {
                  if (res.success == true) {
                      this.commitRoleMenu(_this)
                        .then((res)=>{
                          if(res.success){
                            this.$message.success('提交成功！')
                            this.$emit('cancel','success')
                          }else{
                            this.$message.error(res.message + '请稍后再试！')
                            this.contentLoading = false
                          }
                        })
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