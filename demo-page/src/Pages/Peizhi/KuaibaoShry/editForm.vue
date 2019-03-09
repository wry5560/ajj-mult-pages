<template>
  <div style="margin-top: 30px;margin-bottom: 20px">
    <a-form :form="form" >
      <a-row :gutter="16" :style="{'margin-bottom':'20px'}">
        <a-col :lg="11" :md="12" :sm="24">
          <a-form-item label="选择人员" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select  placeholder="请选择人员" mode="multiple" :disabled="modelType=='edit'" allowClear @focus="reqNames" :labelInValue="true"
              v-decorator="[ 'userNames',{rules: [{ required: true, message: '请选择人员', whitespace: true,type:'array',validateTrigger:'blur'}],initialValue: initialValues.user}]" >
              <a-select-option v-for="(item) in privateSelectOptions.userNames" :key="item.id" :value="item.id" >{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :lg="11" :md="12" :sm="24">
          <a-form-item label="审核等级" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-select   placeholder="请选择审核等级"
                       v-decorator="['userlevel',{rules: [{ required: true, message: '请选择审核等级', whitespace: true}],initialValue: initialValues.userlevel}]" >
              <a-select-option v-for="(item) in selectOptions.userlevel" :key="item.value":value="item.value">{{item.label}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <!--<a-row :gutter="16">-->
        <!--<a-col :lg="11" :md="12" :sm="24">-->
          <!--<a-form-item label="排序号" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">-->
            <!--<a-input-number style="width: 100%"  placeholder="请输入排序号" v-decorator="['sortNum',{rules: [{ required: true, message: '请输入排序号', whitespace: true,type:'number'}],initialValue: initialValues.sortNum}]" />-->
          <!--</a-form-item>-->
        <!--</a-col>-->
        <!--<a-col :lg="11">-->
          <!--<a-form-item label="所属部门" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">-->
            <!--<a-select   placeholder="请选择所属部门" allowClear @focus="reqDepartments" :labelInValue="true"-->
                        <!--v-decorator="['departName',{rules: [{ required: true, message: '请选择所属部门', whitespace: true,validateTrigger:'blur',type:'object'}],initialValue: initialValues.depart}]" >-->
              <!--<a-select-option v-for="(item) in privateSelectOptions.departNames" :key="item.id" :value="item.id">{{item.name}}</a-select-option>-->
            <!--</a-select>-->
          <!--</a-form-item>-->
        <!--</a-col>-->
      <!--</a-row>-->
    </a-form>
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
  // import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'

  export default{
    name:'kuaibaoShryForm',
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
        privateSelectOptions:{
          userNames:[],
          departNames:[]
        }

      }
    },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit') {
          //若进行日期转换等操作，须深拷贝
          initialValues ={...this.getKbshryById()(this.recordId)}
          initialValues.user=[{
            key:initialValues.userId,
            label:initialValues.userName
          }]
//          initialValues.user=initialValues.userName
          initialValues.depart={
            key:initialValues.departId,
            label:initialValues.departName
          }
        }
        return initialValues
      },
    },

    mounted(){
      this.reqNames();
      this.reqDepartments();
    },
    methods:{
      ...mapGetters(['getKbshryById']),
      ...mapActions(['reqNameList','reqDepartmentList']),
      reqNames(){
        this.reqNameList()
          .then((res)=>{
            if(res.success){
              this.privateSelectOptions.userNames=res.data
            }
          })
          .catch((err)=>{return})
      },
      reqDepartments(){
        this.reqDepartmentList()
          .then((res)=>{
            if(res.success){
              this.privateSelectOptions.departNames=res.data
            }
          })
          .catch((err)=>{return})
      }
    }
  }
</script>