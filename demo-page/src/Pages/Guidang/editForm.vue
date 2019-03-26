<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="归档类型1" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              placeholder="请输入归档类型1"
              v-decorator="[
              'gdfl',
              {rules: [{ required: true, message: '请输入归档类型1', whitespace: true}],initialValue: initialValues.gdfl}
            ]" />
          </a-form-item>
        </a-col>

        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="归档类型2" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              placeholder="请输入归档类型2"
              v-decorator="[
              'gdfl2',
              {rules: [{ required: true, message: '请输入归档类型2', whitespace: true}],initialValue: initialValues.gdfl2}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="归档时间" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-date-picker  placeholder="请选择归档时间"
                            style="width: 100%"
                            v-decorator="['gdtime',{rules: [{ required: true, message: '请选择归档时间',type:'object'}],initialValue: moment()}]"
                            format="YYYY-MM-DD HH:mm"
                            :disabledDate="disabledDate"
                            :showTime="showTimeOption"/>
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
//  import {GeneralQuerySelChildren} from  '../api'

  export default{
    name:'editForm',
    props:{
      selectOptions:Object,
      recordId:String,
      modelType:String
    },
    components: {
    },
    data(){
      return{
        form: this.$form.createForm(this),
        disabledDate(current) {
          return  current > moment().endOf('day');
        },
        showTimeOption:{ defaultValue: moment() },
      }
    },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit') {
          initialValues = {...this.getJcxById()(this.recordId)}
        }
        return initialValues
      },

    },
    methods:{
      moment,
      ...mapGetters(['getJcxById']),
//      selLoadData(selectedOptions){
////          debugger
//        const targetOption = selectedOptions[selectedOptions.length - 1];
////          alert(JSON.stringify(selectedOptions))
////        targetOption.loading=true
//        const parameter ={
//          param1 : targetOption.value
//        }
//        GeneralQuerySelChildren(parameter)
//          .then((res)=>{
//            if(res.success){
////              alert(JSON.stringify(res.data))
////              targetOption.loading=false
//              targetOption.children=res.data
//              targetOption.children.forEach((item)=>{
//                item.value=item.VALUE
//                delete item.VALUE
//              })
//              this.selectOptions["风险"]=[...this.selectOptions["风险"]]
//            }else{
//              this.$message.error(res.message)
//            }
//          })
//          .catch((err)=>{JSON.stringify(err)})
//      },
    }
  }
</script>