<template>
  <div class="work-form" :style="{height:height,'min-height':'300px'}">
    <div class="work-content">
      <a-spin :spinning="contentLoading" wrapperClassName="spinning">
        <a-form :form="form" >
            <a-row  :gutter="16">
              <a-col :lg="14" :md="24" :offset="1" style="margin-bottom: 12px">
                <span style="padding-left: 0px;" class="gzjl-title"><strong>子任务内容：</strong></span>
              </a-col>
              <a-col :lg="4" :md="24">
                <span class="gzjl-title"><strong>所属局办：</strong></span>
              </a-col>
              <a-col :lg="5" :md="24">
                <span class="gzjl-title"><strong>所属部门：</strong></span>
              </a-col>
            </a-row>
            <a-row  :gutter="12" v-for="(item,index) in zrw" :key="item.id">
              <a-col :lg="1">
                <div style="text-align: center;line-height: 36px">{{index + 1}}</div>
              </a-col>
              <a-col :lg="14" :md="24">
                <a-form-item label="" :wrapperCol="{ span: 24 }">
                  <a-textarea placeholder="请输入任务内容" :autosize="{ minRows: 1, maxRows: 2 }" @change="gznrChange([...arguments,index,item])"
                              v-decorator="[`gznr-${item.id}`,{rules: [{ required: true, message: '请输入任务内容', whitespace: true}],initialValue: item ? item.gznr:''}]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="4" :md="22">
                <a-form-item  :wrapperCol="{ span: 24 }">
                  <a-tree-select
                    showSearch
                    searchPlaceholder="请选择所属局办"
                    treeNodeFilterProp="title"
                    :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
                    :treeData="departs"
                    treeDefaultExpandAll
                    @change="dipartmentIdChange([...arguments,index,item])"
                    placeholder="请选择所属局办"
                    @select="handleTreeSelect"
                    v-decorator="[`dipartmentId-${item.id}`,{rules: [{ required: true, message: '请选择所属局办', whitespace: true,type:'number'}],initialValue: item ? item.dipartmentId:null}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="4" :md="22">
                <a-form-item  :wrapperCol="{ span: 24 }">
                  <a-tree-select
                    showSearch
                    searchPlaceholder="请选择所属部门"
                    treeNodeFilterProp="title"
                    :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }"
                    :treeData="ssbmTree[index]"
                    treeDefaultExpandAll
                    @change="ssbmChange([...arguments,index,item])"
                    placeholder="请选择所属部门"
                    @select="handleTreeSelect"
                    v-decorator="[`ssbm-${item.id}`,{initialValue: item ? item.ssbm:null}]" />
                </a-form-item>
              </a-col>
              <a-col :lg="1":md="2">
                <a href="javascript:;"@click="removeZrw(index)"><a-icon type="close-circle" style="color:gray;margin-top:12px;"/></a>
              </a-col>
            </a-row>
            <a-button type="dashed" style="width: 100%" icon="plus"@click="addZrw">添加子任务</a-button>
          </span>
          </a-form>
      </a-spin>
    </div>
    <div class="bottom-buttons-bar">
      <div>
        <a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">
        <a-button size="small" type="primary"  style="float:right">提交</a-button>
        </a-popconfirm>
        <a-button size="small" @click="modalCancel" style="float:right">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
  // import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'
  import { initTableChildren } from '@/utils/tableChildrenInit'
  import moment from 'moment'


  const createAction='addZrw'             //新增子任务
  // const editAction ='editWork'             //新增记录

  export default{
    name:'addZrwForm',
    components: {

    },
    props:{
      selectOptions:Object,
      height:String,
      recordId:[String,Number],
      parentid:[String,Number],
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
          departname:this.recordId && this.recordId !='' ? (this.parentid=='0'? this.getWorkById()(this.recordId).__dssbm.departName : this.getZrwById()(this.parentid,this.recordId).__dssbm.departName ):'',
          id: this.recordId && this.recordId!='' ? (this.parentid=='0'?this.getWorkById()(this.recordId).__dssbm.departId :  this.getZrwById()(this.parentid,this.recordId).__dssbm.departId) : '' ,
        }],
        zrw:[
          {gznr:'',ssbm:null,departmentId:sys_relateDepId2,id:'lsid-'+moment().valueOf()+Math.ceil(Math.random()*1000)}
          ],
        ssbmTree:[]
      }
    },
    created(){
      const paramater={
          param2:'2'
      }
      this.reqZuzhiList(paramater)
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
          initialValues = this.parentid=='0'?{...this.getWorkById()(this.recordId)}:{...this.getZrwById()(this.parentid,this.recordId)}
        }
        return initialValues
      },
      departmentsTree(){
        return this.initTree(initTableChildren(this.data))
      },
      departs(){
        const tmp=[]
        this.data.forEach(i=>{
          if(i.parentid=='2')tmp.push({
            key:i.id,
            title:i.departname,
            value:i.id,
          })})
        return tmp
      },
      treeData(){
        const tmp= this.departmentsTree
        const aaa=tmp[0].children
        return aaa && aaa.length > 0 ? [aaa.find(i=>i.value==sys_relateDepId2)]:[]
      }
    },
    methods:{
      moment,
      ...mapGetters(['getWorkById','system_zuzhi_list','getZrwById']),
      ...mapActions(['reqZuzhiList','editRoleMenu','addZrw']),

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
        // this.departId=value
      },
      addZrw(){
        this.zrw.push({
          gznr:'',
          ssbm:null,
          departmentId:sys_relateDepId2,
          id:'lsid-'+moment().valueOf()+Math.ceil(Math.random()*1000)
        })
      },
      removeZrw(index){
        this.zrw.splice(index,1)
      },

      handleCommit(){
        this.form.validateFields((err, values) => {
          if (!err) {
            this.contentLoading=true
            const zrw=[]
            this.zrw.forEach(i=>{
              const tmp={
                gznr:i.gznr,
                ssbm:i.ssbm,
                departmentId:i.departmentId,
                parentid:this.recordId
              }
              zrw.push(tmp)
            })
            // if (this.modelType=='edit'){
            //   data.id=this.recordId
//              values.wzbzbm=this.$store.getters[getDetailById](this.modalOption.recordId).wzbzbm
//             }
//            values.departmentid=sys_relateDepId2
            let parameter={
              jsonData:JSON.stringify({
                // gzhz:data,
                zrw:zrw,

              }),
            }
            switch (this.modelType) {
              case 'addZrw':
                this.$store.dispatch(createAction,parameter).then((res)=>{
                  if (res.success==true){
//                      debugger
                    this.$message.success('提交成功！')
//                    setTimeout(()=>{
//                    this.contentLoading=false
                    this.$emit('cancel','successZrw')
                    this.contentLoading=false
//                      }
//                      ,300)
                  }else{
                    this.$message.error(res.message+'请稍后再试！')
                    this.contentLoading=false
                  }
                })
                break
              case 'edit':
                  const parameter2={
                    jsonData:JSON.stringify(data)}
                this.$store.dispatch(editAction,parameter2).then((res)=>{
                  if (res.success==true){
                    this.$message.success('提交成功！')
//                    setTimeout(()=>{
                        this.modalLoading=false
                        this.$emit('cancel','success')
                        this.contentLoading=false
//                      }
//                      ,300
//                    )
                  }else{
                    this.$message.error(res.message+'请稍后再试！')
                    this.contentLoading=false
                  }
                })
                break
            }
          }
        })
      },
      gznrChange(){
//        debugger
        const e=arguments[0][0]
        const index=arguments[0][1]
        this.zrw[index].gznr=e.target.value
      },
      ssbmChange(){
        const value=arguments[0][0]
        const index=arguments[0][3]
        const item=arguments[0][2]
//        debugger
        this.zrw[index].ssbm=value

      },
      dipartmentIdChange(){
        const value=arguments[0][0]
        const index=arguments[0][3]
        const item=arguments[0][2]
//        debugger
        this.zrw[index].departmentId=value
        const tmp=this.departmentsTree && this.departmentsTree.length>0  ? this.departmentsTree:[]
        const tmpChildren=tmp.length>0 ? tmp[0]:[]
        this.ssbmTree[index]=tmpChildren.children.find(i=>i.value==this.zrw[index].departmentId).children
      },
    }
  }
</script>

<style lang="scss" >
  .work-form{

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
      margin-bottom: 8px;
    }
    .role-sider{
      padding:8px;

      width:300px;
      height: calc(100% - 45px);
      display: inline-block;
    }
    .work-content{
      vertical-align:top;
      padding:8px;
      padding-bottom: 72px;
      padding-left:24px;
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