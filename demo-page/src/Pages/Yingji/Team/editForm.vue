<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="队伍名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入队伍名称"
              v-decorator="[
              'dwname',
              {rules: [{ required: true, message: '请输入队伍名称', whitespace: true}],initialValue: initialValues.dwname}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="队伍类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择队伍类型"
                       v-decorator="['dwtype',{rules: [{ required: true, message: '请选择队伍类型', whitespace: true}],initialValue: initialValues.dwtype}]" >
              <a-select-option v-for="(item) in selectOptions.dwtype" :key="item">{{item}}</a-select-option>
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
            <a-input size="small" placeholder="请输入行政区域" v-decorator="['xzqy',{rules: [{ required: true, message: '请输入行政区域', whitespace: true}],initialValue: initialValues.xzqy}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="负责人" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入负责人" v-decorator="['fzr',{rules: [{ required: true, message: '请输入负责人', whitespace: true}],initialValue: initialValues.fzr}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="负责人电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input  size="small" placeholder="请输入负责人电话" v-decorator="['fzrlx',{rules: [{ required: true, message: '请输入负责人电话', whitespace: true}],initialValue: initialValues.fzrlx}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="队伍地址" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入队伍地址" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['dz',{rules: [{ required: true, message: '请输入队伍地址', whitespace: true}],initialValue: initialValues.dz}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="队伍人数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入队伍人数"
                            v-decorator="['dwrs',{rules: [{ required: true, message: '请输入物资数量', whitespace: true,type:'number'}],initialValue: initialValues.dwrs}]" />
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
    name:'teamForm',
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
          initialValues = {...this.getTeamById()(this.recordId)}
        }
        return initialValues
      },

    },
    methods:{
      ...mapGetters(['getTeamById'])
    }
  }
</script>