<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="物资名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入物资名称"
              v-decorator="[
              'wzname',
              {rules: [{ required: true, message: '请输入物资名称', whitespace: true}],initialValue: initialValues.wzname}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="物资类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择物资类型"
                       v-decorator="['wztype',{rules: [{ required: true, message: '请选择物资类型', whitespace: true}],initialValue: initialValues.wztype}]" >
              <a-select-option v-for="(item) in selectOptions.wztype" :key="item">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="物资级别" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select size="small" placeholder="请选择物资级别"
                      v-decorator="['wzjb',{rules: [{ required: true, message: '请选择物资级别', whitespace: true}],initialValue: initialValues.wzjb}]" >
              <a-select-option v-for="(item) in selectOptions.wzjb" :key="item">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="物资数量" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入物资数量"
                            v-decorator="['wzsl',{rules: [{ required: true, message: '请输入物资数量', whitespace: true,type:'number'}],initialValue: initialValues.wzsl}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="计量单位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入计量单位" v-decorator="['jldw',{initialValue: initialValues.jldw}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="存放场所" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入存放场所" v-decorator="['wzcfcs',{initialValue: initialValues.wzcfcs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="主管部门" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入主管部门" v-decorator="['zgbm',{initialValue: initialValues.zgbm}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="行政区" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入行政区" v-decorator="['xzqy',{initialValue: initialValues.xzqy}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="负责人" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入负责人" v-decorator="['fzr',{initialValue: initialValues.fzr}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="负责人电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input  size="small" placeholder="请输入负责人电话" v-decorator="['fzrlx',{initialValue: initialValues.fzrlx}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="传真" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入传真" v-decorator="['cz',{initialValue: initialValues.cz}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="物资描述" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入物资描述" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['wzms',{initialValue: initialValues.wzms}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="备注" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入备注" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['remark',{initialValue: initialValues.remark}]" />
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
    name:'wzForm',
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
          initialValues = {...this.getWzById()(this.recordId)}
        }
        return initialValues
      },

    },
    methods:{
      ...mapGetters(['getWzById'])
    }
  }
</script>