<template>
  <div >
    <a-form :form="form" >
      <a-row :gutter="16">
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="组织名称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input
              size="small"
              placeholder="请输入组织名称"
              v-decorator="[
              'departname',
              {rules: [{ required: true, message: '请输入组织名称', whitespace: true}],initialValue: initialValues.departname}
            ]" />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="上级组织" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-tree-select
              showSearch
              searchPlaceholder="请输入组织名称"
              treeNodeFilterProp="title"
              :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
              :treeData="treeData"
              treeDefaultExpandAll
              size="small"
              placeholder="请选择上级组织"
               v-decorator="['parentid',{rules: [{ required: true, message: '请选择上级组织', whitespace: true,type:'number'}],initialValue: this.modelType=='edit'? Number(initialValues.parentid)  :recordId}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="组织简称" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input size="small" placeholder="请输入组织简称" v-decorator="['shortNm',{initialValue: initialValues.shortNm}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="12" :md="12" :sm="24">
          <a-form-item label="排序号" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
            <a-input-number style="width: 100%" size="small" placeholder="请输入排序号"
                            v-decorator="['sortNum',{initialValue: initialValues.sortNum}]" />
          </a-form-item>
        </a-col>
        <a-col :lg="24">
          <a-form-item label="描述" :labelCol="{ span: 3 }" :wrapperCol="{ span: 21 }">
            <a-textarea size="small" placeholder="请输入描述" :autosize="{ minRows: 4, maxRows: 8 }"v-decorator="['departDesc',{initialValue: initialValues.departDesc}]" />
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
  import { initTableChildren } from '@/utils/tableChildrenInit'

  export default{
    name:'zuzhiForm',
    props:{
      selectOptions:Object,
      recordId:[String,Number],
      modelType:String,
      dataSource:Array,
    },
    components: {
    },
    data(){
      return{
        form: this.$form.createForm(this),
        data:[...this.system_zuzhi_list()]
      }
    },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit') {
          initialValues = {...this.getZuzhiById()(this.recordId)}
        }
        return initialValues
      },
      treeData(){
          const data=this.initTree(initTableChildren(this.data))
        this.disableItem(data)
        return data
      }
    },
    methods:{
      ...mapGetters(['getZuzhiById','system_zuzhi_list']),

      initTree(datas){
//          debugger
          let aaa=[]
          datas.forEach((data,index)=>{
//              debugger
              const tmp={
                title:data.departname,
                value:data.id,
                key:data.id,
              }
              tmp.disabled= data.id == this.recordId
              if (data.children && data.children.length>0) {
                  tmp.children=this.initTree(data.children)
              }
           aaa.push(tmp)
          })
        return aaa
      },
      disableItem(datas){
          datas.forEach(item=>{
//              debugger
            if (item.children && item.children.length>0){
//                  debugger
              if(item.disabled) item.children.forEach(i=>i.disabled=true)
              this.disableItem(item.children)
            }
          })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .display-none{
    display: none;
  }
</style>