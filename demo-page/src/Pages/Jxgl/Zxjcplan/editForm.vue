<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="0">
        <a-col :lg="12" :md="24" :sm="24">
          <a-form-item label="计划名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入计划名称"
              v-decorator="[
              'planname',
              {rules: [{ required: true, message: '请输入计划名称', whitespace: true}],initialValue: initialValues.planname}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="24" :sm="24">
          <a-row>
            <a-col :lg="12">
              <a-form-item v-if="sfycx=='0'"label="计划周期" :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }">
                <a-select style="width:100%" size="small" placeholder="请选择计划周期"
                           v-decorator="['scheTime',{rules: [{ required: true, message: '请选择计划周期', whitespace: true}],initialValue: initialValues.scheTime}]" >
                  <a-select-option v-for="item in selectOptions.scheTime" :key="item.value">{{item.label}}</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item v-if="sfycx=='1'"label="计划周期" :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }">
                <a-input disabled style="width:100%" size="small" placeholder=""
                          v-decorator="['jhzq',{initialValue: '一次性'}]" >
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :lg="12" >
              <a-form-item  label="是否启用" :labelCol="{ span: 12 }" :wrapperCol="{ span: 12 }">
                <a-switch v-if="this.modalType=='add'" checkedChildren="启用" unCheckedChildren="停用"  v-decorator="['sfqy',{rules:[{type:'boolean'}],initialValue: true,valuePropName:'checked'}]" />
                <a-switch v-else  checkedChildren="启用" unCheckedChildren="停用"  v-model="sfqyChecked" @change="onSfqyChange"/>
              </a-form-item>
            </a-col>
          </a-row>
        </a-col>
        <a-col :lg="12" :md="24" :sm="24">
            <span class="wry-time-label">计划开始日期</span>
            <span class="wry-date-picker">
              <a-form-item>
                <a-date-picker size="small" placeholder="请选择计划开始日期"
                               style="width: 100%"
                               v-decorator="['planstartDate',{rules: [{ required: true, message: '请选择计划开始日期',type:'object'}],initialValue: initialValues.planstartDate}]"
                               format="YYYY-MM-DD"
                               :disabledDate="disabledDate"
                />
              </a-form-item>
          </span>
          <span style="display: inline-block">
            <a-form-item >
            <a-time-picker size="small" placeholder="开始时间"
                           :defaultOpenValue="defaultOpenValue"
                           v-decorator="['planstartTime',{rules: [{ required: true, message: '请选择计划开始时间',type:'object'}],initialValue: initialValues.planstartTime}]"
                           format="HH:mm"

            />
          </a-form-item>
          </span>
        </a-col>

        <a-col :lg="12" :md="23" :sm="24">
          <span class="wry-time-label">计划结束日期</span>
          <span class="wry-date-picker">
            <a-form-item>
            <a-date-picker size="small" placeholder="请选择计划结束日期"
                           style="width: 100%"
                           v-decorator="['planendDate',{rules: [{ required: true, message: '请选择计划结束日期',type:'object'}],initialValue: initialValues.planendDate}]"
                           format="YYYY-MM-DD"
                           :disabledDate="disabledDate"
                           />
              </a-form-item>
          </span>
          <span style="display: inline-block">
            <a-form-item >
          <a-time-picker size="small" placeholder="结束时间"
                         :defaultOpenValue="defaultOpenValue"
                         v-decorator="['planendTime',{rules: [{ required: true, message: '请选择计划结束时间',type:'object'}],initialValue: initialValues.planendTime}]"
                         format="HH:mm"
        />
            </a-form-item>
          </span>
        </a-col>

        <a-col :lg="24">
          <a-form-item label="计划内容" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入计划内容" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['neirong',{rules: [{ required: true, message: '请输入计划内容'}],initialValue: initialValues.neirong}]" />
          </a-form-item>
        </a-col>

      </a-row>
    </a-form>
    <jcx-table-form
      :propModalType="modalType"
      :recordId="recordId"
      @selected="selJcx"
      :tableHeight="tableHeight"
    />
    <qy-table-form
      :propModalType="modalType"
      :recordId="recordId"
      @selected="selJcqy"
      :tableHeight="tableHeight"
    />

    <template>
      <div style="width:400px ;margin-top: 16px;min-height: 100px;margin-left: 36px;">
        <a-upload :action="uploadUrl+ (modalType=='add'?lsId:recordId)" :multiple="true" :fileList="fileList" @change="handleChange"  :remove="rmFile">
          <a-button>
            <a-icon type="upload" /> 上传附件
                  </a-button>
        </a-upload>
      </div>
    </template>
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
  import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'
  import jcxTableForm from './jcxTableForm.vue'
  import qyTableForm from './qyTableForm.vue'
  import AFormItem from "ant-design-vue/es/form/FormItem";

  export default{
    moment,
    name:'jcplanForm',
    props:{
      lsId:String,
      selectOptions:Object,
      recordId:String,
      modalType:String,
      tableHeight:Number,
      sfycx:String,
      sfqy:Boolean
    },
    components: {
      AFormItem, jcxTableForm,
      qyTableForm
    },
    data(){
      return{
        form: this.$form.createForm(this),
        // showTimeOption:{ defaultValue: moment('00:00:00', 'HH:mm:ss') },
        disabledDate(current) {
          return  current < moment().startOf('month');
        },
        sfqyChecked:this.sfqy,
        uploadUrl:process.env.NODE_ENV === 'production'?'other/FileManager.upfile.json?param2=2&param3=asro_defjcbplan&param1=' :'api/other/FileManager.upfile.json?param2=2&param3=asro_defjcbplan&param1=' ,
        fileList:[],
      }
    },
    computed:{
//      lsid(){
//        return this.modalType=='add'? 'lsundefined-'+moment().valueOf()+Math.ceil(Math.random()*1000):this.recordId
//      },
      initialValues(){
        let initialValues={}
        if(this.modalType=='edit') {
          initialValues = {...this.getJcplanById()(this.recordId)}
          initialValues.planstartDate=moment(initialValues.planstartDate,'YYYY-MM-DD')
          initialValues.planstartTime=moment(initialValues.planstartTime!=''?initialValues.planstartTime:'00:00','HH:mm')
          initialValues.planendDate=moment(initialValues.planendDate,'YYYY-MM-DD')
          initialValues.planendTime=moment(initialValues.planendTime!=''?initialValues.planendTime:'00:00','HH:mm')
          initialValues.sfqy=initialValues.sfqy=='1' ? true : false
        }
        return initialValues
      },
      initialSfqy(){
        if(this.modalType=='add'){
          return true
        }else{
          return this.initialValues.sfqy ? true:false
        }

      },
      defaultOpenValue(){
          return moment('00:00','HH:mm')
      }
    },
    created(){
//      const filelist=[]
//      if (this.getJcplanById()(this.recordId).filelist.length>0) {
//        this.getJcplanById()(this.recordId).filelist.forEach(item => {
////                    debugger
//          filelist.push({
//            uid: item.id,
//            name: item.shortMsg,
//            status: 'done',
//            response: 'Server Error 500', // custom error message to show
//            url: item.fpath,
//          })
//        })
//        this.fileList = filelist
//      }
        if(this.modalType!='add')this.reqFlies()
    },
    methods:{
      ...mapGetters(['getJcplanById']),
      ...mapActions(['removeFile','reqFilelist']),
      selJcx(selects){
        this.$emit('selJcx',selects)
      },
      selJcqy(selects){
        this.$emit('selJcqy',selects)
      },
      onSfqyChange(checked){
        const params={
          param1:this.recordId
        }
         if  (checked){
             this.$store.dispatch('startZxjcplan',params)
               .then((res)=>{
                 if(res.success){
                   this.$message.success('已启用')
                   this.$emit('sfqyChanged',1)
                   this.sfqyChecked=true
                 }else{
                     this.$message.error('启用失败! '+ " "+ res.message)
                 }
               })
               .catch((err)=>console.log(JSON.stringify(err)))
         }
         else{
           this.$store.dispatch('stopZxjcplan',params)
             .then((res)=>{
               if(res.success){
                 this.$message.success('已停用')
                 this.$emit('sfqyChanged',0)
                 this.sfqyChecked=false
               }else{
                 this.$message.error('停用失败! '+ " "+ res.message)
               }
             })
             .catch((err)=>console.log(JSON.stringify(err)))
         }
      },

      handleChange(info){
         debugger
        let fileList = info.fileList
        fileList.forEach((file)=>{
          if(file.response){
            if(file.response.success){
              file.url=file.response.data[0].urlpicpath+file.response.data[0].cpPic_name
            }else{
              file.status="error"
//              this.$message.error(file.response.message)
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
        this.reqFilelist(paramater)
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
            param1: this.modalType=='add' ? file.response.data[0].serverId :file.uid
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
    }
  }
</script>
<style lang="scss" scoped>
  .wry-time-label{
    color: rgba(0, 0, 0, 0.85);
    line-height:40px;
    width: 25%;
    display: inline-block;
    text-align: right;
    margin-bottom:32px
  }
  .wry-time-label:before {
    display: inline-block;
    margin-right: 4px;
    content: '*';
    font-family: SimSun;
    line-height: 1;
    font-size: 14px;
    color: #f5222d;
  }
  .wry-time-label:after {
    content: ':';
    margin: 0 8px 0 2px;
    position: relative;
    top: -0.5px;}
  .wry-date-picker{
    width: calc(75% - 136px);
    display: inline-block;
    margin-right: 8px
  }
</style>