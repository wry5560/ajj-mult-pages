<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="姓名" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入装备名称"
              v-decorator="[
              'xm',
              {rules: [{ required: true, message: '请输入装备名称', whitespace: true}],initialValue: initialValues.xm}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="性别" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择装备类型"
                       v-decorator="['xb',{rules: [{ required: true, message: '请选择专家性别', whitespace: true}],initialValue: initialValues.xb}]" >
              <a-select-option key="m">男</a-select-option>
              <a-select-option key="f">女</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="出生日期" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-date-picker  style="width: 100%"size="small" placeholder="请选择出生日期"
                       v-decorator="['csrq',{rules: [{ required: true, message: '请选择出生日期', whitespace: true,type:'object'}],initialValue: initialValues.csrq}]" >
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="移动电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入移动电话" v-decorator="['mobilePhone',{initialValue: initialValues.mobilePhone}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="单位电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入单位电话" v-decorator="['dwdh',{initialValue: initialValues.dwdh}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="住宅电话" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入存放地点" v-decorator="['zzdh',{initialValue: initialValues.zzdh}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="其他联系信息" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入其他联系信息" v-decorator="['qtlxfs',{initialValue: initialValues.qtlxfs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="最高学历" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input  size="small" placeholder="请输入最高学历" v-decorator="['zgxl',{initialValue: initialValues.zgxl}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="毕业学校" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input style="width: 100%" size="small" placeholder="请输入毕业学校"
                            v-decorator="['byxx',{initialValue: initialValues.byxx}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="毕业年月" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-month-picker style="width: 100%" size="small" placeholder="请选择毕业年月"
                            v-decorator="['bynf',{initialValue: initialValues.bynf}]" >
            </a-month-picker>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="现工作单位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input style="width: 100%" size="small" placeholder="请输入现工作单位"
                            v-decorator="['gzdw',{initialValue: initialValues.gzdw}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="现从事专业" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入现从事专业" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['cszy',{initialValue: initialValues.cszy}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="职务" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入职务" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['zw',{initialValue: initialValues.zw}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="技术职称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入技术职称" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['zc',{initialValue: initialValues.zc}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="专业专长" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入专业专长" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['zyzc',{initialValue: initialValues.zyzc}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="行业类别" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入行业类别" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['hylb',{initialValue: initialValues.hylb}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="专家组" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入专家组" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['zjzbh',{initialValue: initialValues.zjzbh}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
          <a-form-item label="聘用职务" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入聘用职务" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['pyzw',{initialValue: initialValues.pyzw}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8">
        <a-form-item label="推荐单位意见" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
          <a-input size="small" placeholder="请输入推荐单位意见" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['djdw',{initialValue: initialValues.djdw}]" />
        </a-form-item>
      </a-col>
        <a-col :lg="8">
          <a-form-item label="推荐人" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入推荐人" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['djr',{initialValue: initialValues.djr}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="起聘日期" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-date-picker style="width: 100%" size="small" placeholder="请选择起聘日期"
                            v-decorator="['qprq',{initialValue: initialValues.qprq}]" >
            </a-date-picker>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="届满日期" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-date-picker style="width: 100%" size="small" placeholder="请选择届满日期"
                            v-decorator="['ymrq',{initialValue: initialValues.ymrq}]" >
            </a-date-picker>
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
  import moment from 'moment'
  import {mapGetters} from 'vuex'

  export default{
    name:'zjForm',
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
          initialValues = {...this.getZjById()(this.recordId)}
          initialValues.csrq=moment(initialValues.csrq,'YYYY-MM-DD')
          initialValues.bynf=moment(initialValues.bynf,'YYYY-MM')
          initialValues.qprq=moment(initialValues.qprq,'YYYY-MM-DD')
          initialValues.ymrq=moment(initialValues.ymrq,'YYYY-MM-DD')
        }
        return initialValues
      },

    },
    methods:{
      moment,
      ...mapGetters(['getZjById'])
    }
  }
</script>