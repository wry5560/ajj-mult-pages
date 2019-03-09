<template>
  <div >
    <a-form @submit="handleSubmit" :form="form" >
      <a-row :gutter="16">
        <a-col :lg="24" v-if="sbType=='ch'">
          <a-form-item  label="撤回理由" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea :autosize="{ minRows: 6}" placeholder="请输入撤回理由"
                        v-decorator="['chly',{rules: [{ required: true, message: '请输入撤回理由', whitespace: true,}]}]" />
          </a-form-item>
        </a-col>
        <a-col v-if="this.sbType=='xb'" :lg="12" :md="12" :sm="24">
          <a-form-item label="续报标题" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              placeholder="请输入续报标题"
              v-decorator="[
              'xbtitle',
              {rules: [{ required: true, message: '请输入续报标题', whitespace: true}],initialValue: initialValues.xbtitle}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="this.sbType=='sh'? 24:12" :md="this.sbType=='sh'? 24:12" :sm="24">
          <a-form-item label="接报时间" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-date-picker  placeholder="请选择接报时间"
                           style="width: 100%"
                           v-decorator="['jbtime',{rules: [{ required: true, message: '请选择接报时间',type:'object'}],initialValue: initialValues.jbtime}]"
                           format="YYYY-MM-DD HH:mm"
                           :disabledDate="disabledDate"
                           :showTime="showTimeOption"/>
          </a-form-item>
        </a-col>
        <a-col :lg="this.sbType=='sh'? 24:12" :md="this.sbType=='sh'? 24:12" :sm="24">
          <a-form-item label="接报来源" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              placeholder="请输入接报来源"
              v-decorator="[
              'jbly',
              {rules: [{ required: true, message: '请输入事故名称', whitespace: true}],initialValue: initialValues.jbly}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="this.sbType=='sh'? 24:12" :md="this.sbType=='sh'? 24:12" :sm="24">
          <a-form-item label="发生时间" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-date-picker  placeholder="请选择发生时间"
                           style="width: 100%"
                           v-decorator="['fstime',{rules: [{ required: true, message: '请选择发生时间',type:'object'}],initialValue: initialValues.fstime}]"
                           format="YYYY-MM-DD HH:mm"
                           :disabledDate="disabledDate"
                           :showTime="showTimeOption"/>
          </a-form-item>
        </a-col>
        <a-col  :lg="12" :md="12" :sm="24">
          <a-form-item v-if="this.sbType!='sh'" label="审核人" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择审核人"
                       v-decorator="['shr',{rules: [{ required: true, message: '请选择审核人', whitespace: true,type:'number'}]}]" >
              <a-select-option v-for="(item) in shrList" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="事件描述" :labelCol="this.sbType=='sh'?{ span: 6 }:{ span: 3 }" :wrapperCol="this.sbType=='sh'?{ span: 18}:{ span: 21 }">
            <a-textarea  placeholder="请输入事件描述" :autosize="{ minRows: 4, maxRows: 18 }"v-decorator="['jbms',{rules: [{ required: true, message: '请输入事件描述'}],initialValue: initialValues.jbms}]" />
          </a-form-item>
        </a-col>

      </a-row>
      <a-form-item v-show="showSubmit">
        <a-button htmlType="submit">上 报</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import AFormItem from "ant-design-vue/es/form/FormItem";
  import moment from 'moment'
  import {GeneralQuery} from '../api'


  export default{
    moment,
    props:{
      showSubmit:{
        type:Boolean,
        default:true
      },
      selectOptions:Object,
      sbData:Object,
      sbType:String
    },
    components: {
        AFormItem
    },
    created(){
      this.reqShrList()
    },
    data(){
      return{
        form: this.$form.createForm(this),
        showTimeOption:{ defaultValue: moment('00:00:00', 'HH:mm:ss') },
        disabledDate(current) {
          return  current > moment().endOf('day');
        },
        shrList:[]
      }
      },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.sbType=='xb'||this.sbType=='ch') {
          initialValues = {...this.sbData}
//          const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
//          initialValues.sgdj=initialValues.sgdj && initialValues.sgdj!='' ? ls["事故等级"].find(item =>item.value==initialValues.sgdj).label :''
//          initialValues.sgxz=initialValues.sgxz && initialValues.sgxz!=''? ls["事故性质"].find(item =>item.value==initialValues.sgxz).label :''
//          initialValues.shlb=initialValues.shlb && initialValues.shlb!=''? ls["事故伤害类型"].find(item =>item.value==initialValues.shlb).label :''
//          initialValues.sglx=initialValues.sglx && initialValues.sglx!=''? ls["事故类型"].find(item =>item.value==initialValues.sglx).label :''
          initialValues.fstime=moment(initialValues.fstime,'YYYY-MM-DD HH:mm')
          initialValues.jbtime=moment(initialValues.jbtime,'YYYY-MM-DD HH:mm')
        }else if(this.sbType=='sh'){
          initialValues = {...this.sbData}
          initialValues.fstime=moment(initialValues.fstime)
          initialValues.jbtime=moment(initialValues.jbtime,'YYYY-MM-DD HH:mm')
        }else if(this.sbType=='sb'){
          initialValues.jbtime=moment()
        }
        return initialValues
      }
    },
    methods:{
      handleSubmit (e) {
        e.preventDefault()
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$notification['error']({
              message: 'Received values of form:',
              description: JSON.stringify(values)
            })
          }
        })
      },
      reqShrList(){
        const parameter={
          sqlId:'S360015',
          param1:sys_relateDepId2,
          param2:1,
          limit:1000,
          start:0
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                this.shrList.push({
                  value:item.id,
                  label:item.name
                })
              })
            }else{
              message.error('获取审核人列表失败！')
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
    }
    }
  }
</script>