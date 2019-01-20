<template>
  <div >
    <a-form @submit="handleSubmit" :form="form" >
      <a-row :gutter="16">
        <a-divider >基本信息</a-divider>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故名称" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small"
              placeholder="请输入事故名称"
              v-decorator="[
              'sgnm',
              {rules: [{ required: true, message: '请输入事故名称', whitespace: true}]}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="发生时间" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入事故发生时间" v-decorator="['fssj',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="区域" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入事故区域" v-decorator="['qy',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="行业分类" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-select  size="small" placeholder="请选择行业分类" v-decorator="['hy',]" >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="管理分类" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-select size="small" placeholder="请选择管理分类" v-decorator="['glfl',]" >
            </a-select>
          </a-form-item>
        </a-col>
        <a-divider orientation="">单位信息</a-divider>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故发生单位" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入事故发生单位" v-decorator="['sgfsdw',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故单位地址" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入事故单位地址" v-decorator="['sgdwdz',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故发生地点" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入事故发生地点" v-decorator="['sgfsd',]" />
          </a-form-item>
        </a-col>

        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="报送单位" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input  size="small" placeholder="请输入事故报送单位" v-decorator="['bsdw',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="监理单位" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入监理单位" v-decorator="['jldw',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="建设单位" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入建设单位" v-decorator="['jsdw',]" />
          </a-form-item>
        </a-col>
        <a-divider orientation="">伤亡及损失</a-divider>

        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="死亡人数" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入死亡人数" v-decorator="['swrs',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="受伤人数" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入受伤人数" v-decorator="['ssrs',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="重伤人数" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入重伤人数" v-decorator="['zsrs',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="涉险人数" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入涉险人数" v-decorator="['sxrs',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="失踪人数" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入失踪人数" v-decorator="['szrs']" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="直接经济损失" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-input size="small" placeholder="请输入直接经济损失" v-decorator="['jjss']" />
          </a-form-item>
        </a-col>
        <a-divider orientation="">详细信息</a-divider>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故等级" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-select size="small" placeholder="请选择事故等级" v-decorator="['sgdj']" >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故类型" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-cascader size="small" @change="" placeholder="请选择事故类型" changeOnSelect v-decorator="['sglx']"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故伤害类别" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-select size="small" placeholder="请选择事故伤害类别" v-decorator="['shlb']" >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故性质" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-select size="small" placeholder="请选择事故性质" v-decorator="['sgxz']" >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="是否纳入统计" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
            <a-select size="small" placeholder="请选择是否纳入统计" v-decorator="['sfnrtj']" >
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="事故简况" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入事故简况" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['sgjk',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="事故原因" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入事故原因" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['sgyy',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="已采取措施" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入已采取措施" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['cqcs',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="事故处理结果" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入事故处理结果" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['cljg',]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="备注" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21}">
            <a-textarea size="small" placeholder="请输入备注" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['bz',]" />
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


  export default{
    props:{
      showSubmit:{
        type:Boolean,
        default:true
      }
    },
    components: {
        AFormItem
    },
    data(){
          return{
            form: this.$form.createForm(this)
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
    }
  }
</script>