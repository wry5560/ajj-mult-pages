<template>
  <div class="meeting-form" :style="{height:height}">
    <div class="role-content">
      <a-spin :spinning="contentLoading" wrapperClassName="spinning">
        <a-form :form="form" >
            <a-row :gutter="16">
              <a-col :lg="12" :md="12" :sm="24">
                <a-form-item label="会议种类" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-select   placeholder="请选择会议种类"
                              @select="hytypeChange"
                             v-decorator="['hytype',{rules: [{ required: true, message: '请选择会议种类', whitespace: true}],initialValue: initialValues.hytype && initialValues.hytype!='' ? initialValues.hytype:'1'}]" >
                    <!--<a-select-option v-for="(item) in selectOptions.hzly" :key="item.value" :value="item.value">{{item.label}}</a-select-option>-->
                    <a-select-option  value="1">内部</a-select-option>
                    <a-select-option  value="2">外部</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" >
                <a-form-item label="会议名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input  placeholder="请输入会议名称"
                            v-decorator="['hytitle',{rules: [{ required: true, message: '请输入会议名称'}],initialValue: initialValues.hytitle}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24">
                <a-form-item label="所属部门" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-tree-select
                    showSearch
                    searchPlaceholder="请选择所属部门"
                    treeNodeFilterProp="title"
                    :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
                    :treeData="treeData"
                    treeDefaultExpandAll

                    placeholder="请选择所属部门"
                    @select="handleTreeSelect"
                    v-decorator="['departmentid',{rules: [{ required: true, message: '请选择所属部门', whitespace: true,type:'number'}],initialValue: this.modelType=='edit'? Number(initialValues.departmentid)  :null}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" >
                <a-form-item label="会议时间" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-date-picker  placeholder="请选择会议时间"
                                  style="width: 100%"
                                  v-decorator="['hytime',{rules: [{ required: true, message: '请选择会议时间',type:'object'}],initialValue: initialValues.hytime ? moment(initialValues.hytime):null}]"
                                  format="YYYY-MM-DD HH:mm"
                                  showTime
                  />
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" >
                <a-form-item label="会议地点" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input  placeholder="请输入会议地点"
                              v-decorator="['hydd',{rules: [{ required: true, message: '请选择会议地点'}],initialValue: initialValues.hydd}]" />
                </a-form-item>
              </a-col>
              <a-col v-if="hyType=='2'" :lg="12" :md="12" :sm="24" >
                <a-form-item label="开始报名时间" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-date-picker  placeholder="请选择开始报名时间"
                                  style="width: 100%"
                                  v-decorator="['startbmtime',{rules: [{ required: true, message: '请选择开始报名时间',type:'object'}],initialValue: initialValues.startbmtime ? moment(initialValues.startbmtime):null}]"
                                  format="YYYY-MM-DD HH:mm"
                                  showTime
                  />
                </a-form-item>
              </a-col>
              <a-col v-if="hyType=='2'" :lg="12" :md="12" :sm="24" >
                <a-form-item label="结束报名时间" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-date-picker  placeholder="请选择结束报名时间"
                                  style="width: 100%"
                                  v-decorator="['endbmtime',{rules: [{ required: true, message: '请选择结束报名时间',type:'object'}],initialValue: initialValues.endbmtime ? moment(initialValues.endbmtime):null}]"
                                  format="YYYY-MM-DD HH:mm"
                                  showTime
                  />
                </a-form-item>
              </a-col>
              <a-col :lg="12" :md="12" :sm="24" >
                <a-form-item label="会议类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-input  placeholder="请输入会议类型"
                           v-decorator="['hylx',{rules: [{ required: true, message: '请输入会议类型'}],initialValue: initialValues.hylx}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="24">
                <a-form-item label="会议内容" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
                  <a-textarea size="small" placeholder="请输入会议内容" :autosize="{ minRows: 2, maxRows: 4 }"v-decorator="['hynr',{rules: [{ required: true, message: '请输入会议内容', whitespace: true}],initialValue: initialValues.hynr}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="24" v-if="modelType=='edit'">
                <a-form-item label="会议总结" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
                  <a-textarea size="small" placeholder="请输入会议总结" :autosize="{ minRows: 4, maxRows: 8 }"v-decorator="['hyzj',{rules: [{ required: true, message: '请输入会议总结', whitespace: true}],initialValue: initialValues.hyzj}]" />
                </a-form-item>
              </a-col>
            </a-row>

          <template>
            <div style="width:400px ;margin-top: 16px;min-height: 50px;margin-left: 50px">
              <a-upload :action="uploadUrl+lsid" :multiple="true" :fileList="fileList" @change="handleChange"  :remove="rmFile">
                <a-button>
                  <a-icon type="upload" /> 上传附件
                  </a-button>
              </a-upload>
            </div>
          </template>
          </a-form>
      </a-spin>
    </div>
    <!--<div class="bottom-buttons-bar">-->
      <!--<div>-->
        <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
        <!--<a-button size="small" type="primary"  style="float:right">提交</a-button>-->
        <!--</a-popconfirm>-->
        <!--<a-button size="small" @click="modalCancel" style="float:right">取消</a-button>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
  // import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'
  import { initTableChildren } from '@/utils/tableChildrenInit'
  import moment from 'moment'

  export default{
    name:'mettingForm',
    components: {

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
        fileList:[],
        data:[{
//          departname:this.recordId && this.recordId!='' ?this.getMeetingById()(this.recordId).__dssbm.departName :'',
//          id: this.recordId && this.recordId!='' ? this.getMeetingById()(this.recordId).__dssbm.departId : '' ,
        }],
        uploadUrl:process.env.NODE_ENV === 'production'?'other/FileManager.upfile.json?param2=2&param3=asro_hygl&param1=' :'api/other/FileManager.upfile.json?param2=2&param3=asro_hygl&param1=' ,
        hyType:'1'

      }
    },
    created(){
      this.$store.commit('INIT_MEETING_LSID')
      if(this.recordId && this.recordId!='')this.reqFlies()
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
          initialValues = {...this.getMeetingById()(this.recordId)}
        }
        return initialValues
      },
      treeData(){
        return this.initTree(initTableChildren(this.data))
      },
      lsid(){
        return this.modelType=='add'? this.$store.state.Meeting.meeting.lsid : this.recordId
      }
    },
    methods:{
      moment,
      ...mapGetters(['getMeetingById','system_zuzhi_list']),
      ...mapActions(['reqZuzhiList','editRoleMenu','reqHyFilelist','removeFile']),

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
      hytypeChange(value){
        this.hyType=value
      },

      handleChange(info){
        let fileList = info.fileList
        fileList.forEach((file)=>{
          if(file.response){
            if(file.response.success){
              file.url=file.response.data[0].urlpicpath+file.response.data[0].cpPic_name
            }else{
              file.status="error"
              this.$message.error(file.response.message)
            }
          }
        })
        this.fileList=fileList
      },
      reqFlies(){
        if (!this.recordId ||this.recordId=='')return
        const  paramater={
          param2:this.recordId
        }
        this.reqHyFilelist(paramater)
          .then((res)=>{
//            debugger
            if(res.success){
              const filelist=[]
              if (res.data.length>0){
                res.data.forEach(item=>{
//                    debugger
                  filelist.push({
                    uid: item.id,
                    name: item.shortMsg,
                    status: 'done',
                    message: 'Server Error 500', // custom error message to show
                    url: item.fpath,
                  })
                })
                this.fileList=filelist
//                  this.$message.success('文件上传成功')
              }
            }else{
              this.$message.error('请求附件列表失败！')
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      rmFile(file){
        return new Promise((resolve,reject)=>{
          const paramater={
            param1: this.modelType=='add'? file.response.data[0].serverId :file.uid
          }
          this.removeFile(paramater)
            .then((res)=>{
              if (res.success){
                this.$message.success('文件已删除！ ')
                resolve()
              }else{
                this.$message.error('删除文件失败！ '+res.message)
                reject()
              }
            })
            .catch((err)=>{
              console.log(JSON.stringify(err))
              reject()
            })
        })
      }
      //----------------------------------------------------------------修改角色的菜单----------------------------------------------------------------------

    }
  }
</script>

<style lang="scss" >
  .meeting-form{

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