<template>
  <div class="role-form" :style="{height:height}">
    <div class="role-content">
      <a-spin :spinning="contentLoading" wrapperClassName="spinning">
        <a-form :form="form" >
            <a-row :gutter="16">
              <a-col :lg="24">
                <a-form-item label="工作内容" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  {{initialValues.gznr}}

                </a-form-item>
              </a-col>
              <a-col :lg="24" :md="12" :sm="24">
                <a-form-item label="难易程度" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
                  <a-select   placeholder="请选择难易程度"
                              v-decorator="['nycd',{rules: [{ required: true, message: '请选择难易程度', whitespace: true}],initialValue: initialValues.nycd}]" >
                    <a-select-option v-for="(item) in selectOptions.nycd" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
      </a-spin>
    </div>
    <!--<div class="bottom-buttons-bar">-->
      <!--<div>-->
        <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
        <!--<a-button size="small" type="primary"  style="float:right">提交</a-button>-->
        <!--</a-popconfirm>-->
        <!--<a-button size="small" @click="modalCancel" style="float:right">取消</a-button>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
  // import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'
  import { initTableChildren } from '@/utils/tableChildrenInit'


  export default{
    name:'difficultyForm',
    components: {

    },
    props:{
      selectOptions:Object,
      height:String,
      recordId:[String,Number],
      modelType:String,
      dataSource:Array,
      departId:[String,Number],
    },

    data(){
      return{
        sys_relateDepId2,
        form: this.$form.createForm(this),
        contentLoading:false,
        data:[{
          departname:this.getWorkById()(this.recordId).__dssbm.departName,
          id:this.getWorkById()(this.recordId).__dssbm.departId,
        }],


      }
    },
    created(){

      this.reqZuzhiList()
        .then((res)=>{
              if(res.success){
                this.data=res.data
              }
            })
    },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit') {
          initialValues = {...this.getWorkById()(this.recordId)}
        }
        return initialValues
      },
      treeData(){
        return this.initTree(initTableChildren(this.data))
      }
    },
    methods:{
      ...mapGetters(['getWorkById','system_zuzhi_list']),
      ...mapActions(['reqZuzhiList','editRoleMenu']),

      modalCancel(){
        this.$emit('cancel')
      },
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
              if (data.children && data.children.length>0) tmp.children=this.initTree(data.children)
           aaa.push(tmp)
          })
        return aaa
      },
      handleTreeSelect(value,node, extra){
        console.log(value)
        this.departId=value
      },

    }
  }
</script>

<style lang="scss" >
  .role-form{

    .item-title{
      text-align: right;
      display: inline-block;
      width: 100%;
    }
    .spinning{
      height:100%;
      .ant-spin-container{
        height:100%;
      }
    }
    .ant-form-item{
      /*margin-bottom: 8px;*/
    }
    .role-sider{
      padding:8px;

      width:300px;
      height: calc(100% - 45px);
      display: inline-block;
    }
    .role-content{
      vertical-align:top;
      padding:8px;
      padding-left:0;
      padding-right: 24px;
      /*width:calc(100% - 300px);*/
      /*height: calc(100% - 45px);*/
      height: 100%;
      /*display: inline-block;*/
    }
    .ant-card-head{
      padding:0 14px;
      min-height: 32px;
      font-size: 14px;
      .ant-card-head-title{
        padding:8px 0;
      }

    }
    .ant-card-body{
      padding:8px;
      height: calc(100% - 37px);
      overflow: auto;
    }
    .ant-tree-switcher{
      width: 18px !important;
      height: 18px !important;
      line-height: 18px !important;
    }
    .ant-tree-node-content-wrapper{
      height: 18px !important;
      line-height: 18px !important;
      font-size: 12px !important;
    }
    .ant-tree li {
      padding: 2px 0;
    }
    .ant-tree.ant-tree-show-line li:not(:last-child):before{
      left: 8px;
      margin: 4px 0;
    }
    .ant-divider-horizontal{
      margin:12px 0
    }
    .ant-collapse-borderless{
      .ant-form-item{
        margin-bottom: 0px;
      }
      .ant-collapse-content-box{
        padding:0px
      }
    }
    .ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
      padding-top: 0px;
    }
  }
</style>