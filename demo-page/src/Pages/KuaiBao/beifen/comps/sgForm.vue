<template>
  <div >
    <a-form @submit="handleSubmit" :form="form" >
      <a-row :gutter="16">
        <a-divider >基本信息</a-divider>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入事故名称"
              v-decorator="[
              'sgnm',
              {rules: [{ required: true, message: '请输入事故名称', whitespace: true}],initialValue: initialValues.sgnm}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="发生时间" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-date-picker size="small" placeholder="请选择事故发生时间"
                           style="width: 100%"
                           v-decorator="['fssj',{rules: [{ required: true, message: '请选择事故发生时间'}],initialValue: initialValues.fssj}]"
                           format="YYYY-MM-DD HH:mm"
                           :disabledDate="disabledDate"
                           :showTime="showTimeOption"/>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="区域" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入事故区域" v-decorator="['qy',{initialValue: initialValues.qy}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="行业分类" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  size="small" placeholder="请选择行业分类" v-decorator="['hy',{initialValue: initialValues.hy}]" >
              <a-select-option v-for="(item,index) in selectOptions.hyType" :key="item[0]">{{item[0]}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="管理分类" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select size="small" placeholder="请选择管理分类" v-decorator="['glfl',{initialValue: initialValues.glfl}]" >
              <a-select-option v-for="(item,index) in selectOptions.glType" :key="item[0]">{{item[0]}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="事故简况" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入事故简况" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['sgjk',{rules: [{ required: true, message: '请输入事故简况', whitespace: true}],initialValue: initialValues.sgjk}]" />
          </a-form-item>
        </a-col>
        <a-divider >单位信息</a-divider>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="发生单位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入事故发生单位" v-decorator="['sgfsdw',{initialValue: initialValues.sgfsdw}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="单位地址" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入事故单位地址" v-decorator="['sgdwdz',{initialValue: initialValues.sgdwdz}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故地点" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入事故发生地点" v-decorator="['sgfsd',{initialValue: initialValues.sgfsd}]" />
          </a-form-item>
        </a-col>

        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="报送单位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input  size="small" placeholder="请输入事故报送单位" v-decorator="['bsdw',{initialValue: initialValues.bsdw}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="监理单位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入监理单位" v-decorator="['jldw',{initialValue: initialValues.jldw}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="建设单位" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入建设单位" v-decorator="['jsdw',{initialValue: initialValues.jsdw}]" />
          </a-form-item>
        </a-col>
        <a-divider >伤亡及损失</a-divider>

        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="死亡人数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入死亡人数" v-decorator="['swrs',{initialValue: initialValues.swrs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="受伤人数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入受伤人数" v-decorator="['ssrs',{initialValue: initialValues.ssrs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="重伤人数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入重伤人数" v-decorator="['zsrs',{initialValue: initialValues.zsrs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="涉险人数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入涉险人数" v-decorator="['sxrs',{initialValue: initialValues.sxrs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="失踪人数" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入失踪人数" v-decorator="['szrs',{initialValue: initialValues.szrs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="经济损失" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入直接经济损失" v-decorator="['jjss',{initialValue: initialValues.jjss}]" />
          </a-form-item>
        </a-col>
        <a-divider >详细信息</a-divider>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故等级" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select size="small" placeholder="请选择事故等级" v-decorator="['sgdj',{initialValue: initialValues.sgdj}]" >
              <a-select-option v-for="(item,index) in selectOptions.sgdj" :key="item[0]">{{item[0]}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故类型" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <!--<a-cascader size="small" @change="" placeholder="请选择事故类型" changeOnSelect v-decorator="['sglx']"/>-->
            <a-select size="small" @change="" placeholder="请选择事故类型" changeOnSelect v-decorator="['sglx',{initialValue: initialValues.sglx}]">
              <a-select-option v-for="(item,index) in selectOptions.sglx" :key="item[0]">{{item[0]}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="伤害类别" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select size="small" placeholder="请选择事故伤害类别" v-decorator="['shlb',{initialValue: initialValues.shlb}]" >
              <a-select-option v-for="(item,index) in selectOptions.shlb" :key="item[0]">{{item[0]}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="8" :md="12" :sm="24">
          <a-form-item label="事故性质" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select size="small" placeholder="请选择事故性质" v-decorator="['sgxz',{initialValue: initialValues.sgxz}]" >
              <a-select-option v-for="(item,index) in selectOptions.sgxz" :key="item[0]">{{item[0]}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <!--<a-col :lg="8" :md="12" :sm="24">-->
          <!--<a-form-item label="是否统计" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">-->
            <!--<a-select size="small" placeholder="请选择是否纳入统计" v-decorator="['sfnrtj']" >-->
              <!--<a-select-option key="yes">1</a-select-option>-->
              <!--<a-select-option key="no">0</a-select-option>-->
            <!--</a-select>-->
          <!--</a-form-item>-->
        <!--</a-col>-->

        <a-col :lg="24">
          <a-form-item label="事故原因" :labelCol="{ span: 2}" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入事故原因" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['sgyy',{initialValue: initialValues.sgyy}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="已采取措施" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入已采取措施" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['cqcs',{initialValue: initialValues.cqcs}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="处理结果" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22 }">
            <a-textarea size="small" placeholder="请输入事故处理结果" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['cljg',{initialValue: initialValues.cljg}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="备注" :labelCol="{ span: 2 }" :wrapperCol="{ span: 22}">
            <a-textarea size="small" placeholder="请输入备注" :autosize="{ minRows: 2, maxRows: 6 }"v-decorator="['bz',{initialValue: initialValues.bz}]" />
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
  import moment from 'moment'


  export default{
    moment,
    props:{
      showSubmit:{
        type:Boolean,
        default:true
      },
      selectOptions:Object,
      sbData:Object,
      sbType:String
    },
    components: {
        AFormItem
    },
    data(){
      return{
        form: this.$form.createForm(this),
        showTimeOption:{ defaultValue: moment('00:00:00', 'HH:mm:ss') },
        disabledDate(current) {
          return  current > moment().endOf('day');
        },
      }
      },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.sbType=='xb') {
          initialValues = {...this.sbData}
          const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
          initialValues.sgdj=initialValues.sgdj && initialValues.sgdj!='' ? ls["事故等级"].find(item =>item.value==initialValues.sgdj).label :''
          initialValues.sgxz=initialValues.sgxz && initialValues.sgxz!=''? ls["事故性质"].find(item =>item.value==initialValues.sgxz).label :''
          initialValues.shlb=initialValues.shlb && initialValues.shlb!=''? ls["事故伤害类型"].find(item =>item.value==initialValues.shlb).label :''
          initialValues.sglx=initialValues.sglx && initialValues.sglx!=''? ls["事故类型"].find(item =>item.value==initialValues.sglx).label :''
          initialValues.fssj=moment(initialValues.fssj)
        }else if(this.sbType=='sh'){
          initialValues = {...this.sbData}
          initialValues.fssj=moment(initialValues.fssj)
        }
        return initialValues
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