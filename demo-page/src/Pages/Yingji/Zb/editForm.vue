<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="装备名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入装备名称"
              v-decorator="[
              'zbname',
              {rules: [{ required: true, message: '请输入装备名称', whitespace: true}],initialValue: initialValues.zbname}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择装备类型"
                       v-decorator="['zbtype',{rules: [{ required: true, message: '请选择装备类型', whitespace: true}],initialValue: initialValues.zbtype}]" >
              <a-select-option v-for="(item) in selectOptions.zbtype" :key="item">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="级别" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择装备级别"
                       v-decorator="['zbjb',{rules: [{ required: true, message: '请选择装备级别', whitespace: true}],initialValue: initialValues.zbjb}]" >
              <a-select-option v-for="(item) in selectOptions.zbjb" :key="item">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="主管部门" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入主管部门" v-decorator="['zgbm',{initialValue: initialValues.zgbm}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="行政区域" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入行政区域" v-decorator="['xzqy',{initialValue: initialValues.xzqy}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="存放地点" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入存放地点" v-decorator="['zbcfcs',{initialValue: initialValues.zbcfcs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="负责人" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入负责人" v-decorator="['fzr',{initialValue: initialValues.fzr}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="联系电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input  size="small" placeholder="请输入联系电话" v-decorator="['fzrlx',{initialValue: initialValues.fzrlx}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="装备数量" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入装备数量"
                            v-decorator="['zbsl',{rules: [{ required: true, message: '请输入装备数量', whitespace: true,type:'number'}],initialValue: initialValues.zbsl}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="计量单位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input style="width: 100%" size="small" placeholder="请输入计量单位"
                            v-decorator="['jldw',{initialValue: initialValues.jldw}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="装备描述" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入装备描述" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['zbms',{initialValue: initialValues.zbms}]" />
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
    name:'zbForm',
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
          initialValues = {...this.getZbById()(this.recordId)}
        }
        return initialValues
      },

    },
    methods:{
      ...mapGetters(['getZbById'])
    }
  }
</script>