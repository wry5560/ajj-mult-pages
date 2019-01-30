<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="避难场所名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入避难场所名称"
              v-decorator="[
              'bncsname',
              {rules: [{ required: true, message: '请输入避难场所名称', whitespace: true}],initialValue: initialValues.bncsname}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择避难场所类型"
                       v-decorator="['cstype',{rules: [{ required: true, message: '请选择避难场所类型', whitespace: true}],initialValue: initialValues.cstype}]" >
              <a-select-option v-for="(item) in selectOptions.cstype" :key="item">{{item}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="行政区域" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入行政区域" v-decorator="['xzqy',{rules: [{ required: true, message: '请输入行政区域', whitespace: true}],initialValue: initialValues.xzqy}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="地址" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入避难场所地址" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['dz',{rules: [{ required: true, message: '请输入避难场所地址', whitespace: true}],initialValue: initialValues.dz}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="联系电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input  size="small" placeholder="请输入联系电话" v-decorator="['lxdh',{rules: [{ required: true, message: '请输入联系电话', whitespace: true}],initialValue: initialValues.lxdh}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="面积" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input style="width: 100%" size="small" placeholder="请输入面积"
                     v-decorator="['area',{rules: [{ required: true, message: '请输入面积', whitespace: true}],initialValue: initialValues.area}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="可容纳人数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入可容纳人数"
                            v-decorator="['krrs',{rules: [{ required: true, message: '请输入可容纳人数', whitespace: true,type:'number'}],initialValue: initialValues.krrs}]" />
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
    name:'placeForm',
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
          initialValues = {...this.getPlaceById()(this.recordId)}
        }
        return initialValues
      },

    },
    methods:{
      ...mapGetters(['getPlaceById'])
    }
  }
</script>