<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="0">
        <a-col :lg="24" :md="24" :sm="24">
          <a-form-item label="计划名称" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-input
              size="small"
              placeholder="请输入计划名称"
              v-decorator="[
              'planname',
              {rules: [{ required: true, message: '请输入计划名称', whitespace: true}],initialValue: initialValues.planname}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="计划开始日期" :labelCol="{ span: 6 }" :wrapperCol="{ span: 17 }">
            <a-date-picker size="small" placeholder="请选择计划开始日期"
                           style="width: 100%"
                           v-decorator="['planstartDate',{rules: [{ required: true, message: '请选择计划开始日期'}],initialValue: initialValues.planstartDate}]"
                           format="YYYY-MM-DD"
                           :disabledDate="disabledDate"
                           />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="计划结束日期" :labelCol="{ span: 7 }" :wrapperCol="{ span: 17 }">
            <a-date-picker size="small" placeholder="请选择计划结束日期"
                           style="width: 100%"
                           v-decorator="['planendDate',{rules: [{ required: true, message: '请选择计划结束日期'}],initialValue: initialValues.planendDate}]"
                           format="YYYY-MM-DD"
                           :disabledDate="disabledDate"
                           />
          </a-form-item>
        </a-col>

        <a-col :lg="24">
          <a-form-item label="计划内容" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入计划内容" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['neirong',{rules: [{ required: true, message: '请输入计划内容'}],initialValue: initialValues.neirong}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24" :md="12" :sm="24">
          <a-form-item label="是否启用" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-switch  defaultChecked checkedChildren="启用" unCheckedChildren="停用"  v-decorator="['sfqy',{initialValue: initialValues.sfqy}]" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
  import moment from 'moment'
  import {mapGetters} from 'vuex'

  export default{
    name:'jcplanForm',
    props:{
      selectOptions:Object,
      recordId:String,
      modalType:String
    },
    components: {
    },
    data(){
      return{
        form: this.$form.createForm(this),
        // showTimeOption:{ defaultValue: moment('00:00:00', 'HH:mm:ss') },
        disabledDate(current) {
          return  current < moment().startOf('day');
        },
      }
    },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.modalType=='edit') {
          initialValues = {...this.getJcplanById()(this.recordId)}
          initialValues.planstartDate=moment(initialValues.planstartDate)
          initialValues.planendDate=moment(initialValues.planendDate)
          initialValues.sfqy=initialValues.sfqy=='1'?true:false
        }
        return initialValues
      },
    },
    methods:{
      moment,
      ...mapGetters(['getJcplanById'])
    }
  }
</script>