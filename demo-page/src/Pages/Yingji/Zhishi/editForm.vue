<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="标题" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入标题"
              v-decorator="[
              'zstitle',
              {rules: [{ required: true, message: '请输入标题', whitespace: true}],initialValue: initialValues.zstitle}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择知识类型"
                       v-decorator="['zstype',{rules: [{ required: true, message: '请选择知识类型', whitespace: true}],initialValue: initialValues.zstype}]" >
              <a-select-option v-for="(item) in selectOptions.zstype" :key="item">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="关键字" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入关键字" v-decorator="['gjz',{initialValue: initialValues.gjz}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="知识内容" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入知识内容" :autosize="{ minRows: 4, maxRows: 10 }"v-decorator="['zscontent',{initialValue: initialValues.zscontent}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="备注" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入知识内容" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['remark',{initialValue: initialValues.remark}]" />
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

  export default{
    name:'zsForm',
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
          //若进行日期转换等操作，须深拷贝
          initialValues ={...this.getZsById()(this.recordId)}
        }
        return initialValues
      },

    },
    methods:{
      ...mapGetters(['getZsById'])
    }
  }
</script>