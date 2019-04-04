<template>
  <div class="role-form" :style="{height:height}">
    <div class="role-content">
      <a-spin :spinning="contentLoading" wrapperClassName="spinning">
        <a-form :form="form" >
          <a-row :gutter="16">
            <a-col :lg="24">
              <a-form-item label="工作内容" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
                {{initialValues.gznr}}

                </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="要求完成时间" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <a-date-picker  placeholder="请选择要求完成时间"
                                style="width: 100%"
                                v-decorator="['jhwctime',{rules: [{ required: true, message: '请选择要求完成时间',type:'object'}],initialValue: initialValues.jhwctime && initialValues.jhwctime !='' ? this.moment( initialValues.jhwctime,'YYYY-MM-DD' ) : null}]"
                                format="YYYY-MM-DD"
                                :disabledDate="disabledDate"
                                showTime
                />
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="难易程度" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                <a-select   placeholder="请选择难易程度"
                            v-decorator="['nycd',{rules: [{ required: true, message: '请选择难易程度', whitespace: true}],initialValue: initialValues.nycd}]" >
                  <a-select-option v-for="(item) in selectOptions.nycd" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="负责人" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                 <span style="display: inline-block;width: 100%">
                  <a-select  placeholder="请选择负责人"  :options="fzrList"   allowClear
                             v-decorator="[ 'fzr',{rules: [{ required: true, message: '请选择负责人',whitespace: true,type:'number',validateTrigger:'blur'}],initialValue: Number(initialValues.__ufzr.userId)}]" >
                  </a-select>
                   </span>
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
   import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'
  import { initTableChildren } from '@/utils/tableChildrenInit'


  export default{
    name:'difficultyForm',
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
        data:[{
          departname:this.getArrageWorkById()(this.recordId).__dssbm.departName,
          id:this.getArrageWorkById()(this.recordId).__dssbm.departId,
        }],
        fzrList:[{
            key:this.getArrageWorkById()(this.recordId).__ufzr.userId,
            value:Number(this.getArrageWorkById()(this.recordId).__ufzr.userId),
            title:this.getArrageWorkById()(this.recordId).__ufzr.userName,
        }],
        disabledDate(current) {
          return  current < moment().startOf('day');
        },
        uploadUrl:process.env.NODE_ENV === 'production'?'other/FileManager.upfile.json?param2=2&param3=asro_ajgzhz&param1=' :'api/other/FileManager.upfile.json?param2=2&param3=asro_ajgzhz&param1=' ,
        fileList:[]

      }
    },
    created(){
      this.reqFlies()
      this.reqFzrList()
        .then((res)=>{
          if(res.success){
//            this.data=res.data
            this.fzrList=[]
            res.data.forEach(item=>{
              let a={
                  key:item.id,
                  value:item.id,
                  title:item.name
                }
              this.fzrList.push(a)
            })

          }
        })
    },
    computed:{
      lsid(){
        return  this.recordId
      },
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit'|| this.modelType=='fenpei') {
          initialValues = {...this.getArrageWorkById()(this.recordId)}
        }
        return initialValues
      },
      treeData(){
        return this.initTree(initTableChildren(this.data))
      }
    },
    methods:{
      moment,
      ...mapGetters(['getArrageWorkById','system_zuzhi_list']),
      ...mapActions(['reqFzrList','editRoleMenu','reqWorkFilelist','removeFile']),

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
        this.fileList=fileList},
      reqFlies(){
        if (!this.recordId ||this.recordId=='')return
        const  paramater={
          param2:this.recordId
        }
        this.reqWorkFilelist(paramater)
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
            param1: file.response ? file.response.data[0].serverId :file.uid
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