<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="条目类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择条目类型"
                       v-decorator="['tmlx',{rules: [{ required: true, message: '请选择条目类型', whitespace: true}],initialValue: initialValues.tmlx}]" >
              <a-select-option v-for="(item) in selectOptions.tmlx" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="检查类型" :labelCol="{ span: 5 }" :wrapperCol="{ span: 19 }">
            <a-cascader :options="selectOptions['风险']"  style="width:100%" size="small" :loadData="selLoadData" placeholder="请选择检查类型"
                        v-decorator="['jclx',{rules: [{ required: true, message: '请选择检查类型', whitespace: true,type:'array',validator:function(rule, value, cb) {

                         if (value[0]) {
                             cb();
                             return;
                         }
                         cb('请选择检查类型')
                        }}],initialValue: [initialValues.jclx,initialValues.jclx2]}]"/>
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="检查内容" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入检查内容" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['jcnr',{rules: [{ required: true, message: '请输入检查内容', whitespace: true}],initialValue: initialValues.jcnr}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="检查依据" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入检查依据" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['jcyj',{rules: [{ required: true, message: '请输入检查依据', whitespace: true}],initialValue: initialValues.jcyj}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="隐患时提示" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入物资描述" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['yhts',{initialValue: initialValues.yhts}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="系统未落实提示" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入系统未落实提示" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['systs',{initialValue: initialValues.systs}]" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
  // import moment from 'moment'
  import {mapGetters} from 'vuex'
  import {GeneralQuerySelChildren} from  '../api'

  export default{
    name:'jcxForm',
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
      ...mapGetters(['getJcxById']),
      selLoadData(selectedOptions){
//          debugger
        const targetOption = selectedOptions[selectedOptions.length - 1];
//          alert(JSON.stringify(selectedOptions))
//        targetOption.loading=true
        const parameter ={
          param1 : targetOption.value
        }
        GeneralQuerySelChildren(parameter)
          .then((res)=>{
            if(res.success){
//              alert(JSON.stringify(res.data))
//              targetOption.loading=false
              targetOption.children=res.data
              targetOption.children.forEach((item)=>{
                item.value=item.VALUE
                delete item.VALUE
              })
              this.selectOptions["风险"]=[...this.selectOptions["风险"]]
            }else{
              this.$message.error(res.message)
            }
          })
          .catch((err)=>{JSON.stringify(err)})
      },
    }
  }
</script>