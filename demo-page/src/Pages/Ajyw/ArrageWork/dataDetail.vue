<template>
  <div class="role-form" :style="{height:height}">
    <div class="role-content" :style="contentStyle">
      <a-spin :spinning="contentLoading" wrapperClassName="spinning">
        <a-form :form="form" >
          <a-row :gutter="16">
            <a-col :lg="24">
              <a-form-item label="工作内容" :labelCol="{ span: 4 }" :wrapperCol="{ span: 20 }">
                {{wdgz.gznr}}

                </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="开始时间" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                {{wdgz.starttime && wdgz.starttime != '' ? moment(wdgz.starttime).format('YYYY-MM-DD HH:ss') : ''}}
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="要求完成时间" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                {{wdgz.jhwctime && wdgz.jhwctime !='' ? moment(wdgz.jhwctime).format('YYYY-MM-DD') : ''}}
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="难易程度" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                {{wdgz.nycd}}
              </a-form-item>
            </a-col>
            <a-col :lg="12" :md="12" :sm="24">
              <a-form-item label="完成进度" :labelCol="{ span: 8 }" :wrapperCol="{ span: 16 }">
                {{wdgz.wcjd && wdgz.wcjd != '' ?  wdgz.wcjd : '0' }} %
              </a-form-item>
            </a-col>
          </a-row>
          <a-row>
            <div ><strong>工作记录详情：</strong></div>
            <a-divider/>
          </a-row>
          <!--<div style="margin-bottom: 12px" class="my-work">-->
            <!--<a-row v-if="wdgzdetail.length>0" :gutter="16">-->
              <!--<a-col :lg="18" :md="24" :offset="1">-->
                <!--<span style="padding-left: 0px;" class="gzjl-title"><strong>工作内容描述：</strong></span>-->
              <!--</a-col>-->
              <!--<a-col :lg="5" :md="24">-->
                <!--<span class="gzjl-title"><strong>工作进度：</strong></span>-->
              <!--</a-col>-->
            <!--</a-row>-->
            <!--<div v-else style="text-align: center">暂无工作详情</div>-->
          <!--</div>-->
          <!--<a-row  :gutter="12" v-for="(item,index) in wdgzdetail" :key="item.id" style="border-top: 1px solid #e0e0e0">-->
            <!--<a-col :lg="1">-->
              <!--<div style="text-align: center;line-height: 36px">{{index + 1}}</div>-->
            <!--</a-col>-->
            <!--<a-col :lg="18" :md="24">-->
              <!--<a-form-item label="" :wrapperCol="{ span: 24 }">-->
                <!--&lt;!&ndash;<a-textarea placeholder="请输入工作内容" :autosize="{ minRows: 1, maxRows: 2 }" @change="gznrChange([...arguments,index,item])"&ndash;&gt;-->
                            <!--&lt;!&ndash;v-decorator="[`gznr-${item.id}`,{rules: [{ required: true, message: '请输入工作内容', whitespace: true}],initialValue: item ? item.gznr:''}]"/>&ndash;&gt;-->
                <!--{{item.gznr}}-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <!--<a-col :lg="4" :md="22">-->
              <!--<a-form-item  :wrapperCol="{ span: 24 }">-->
                <!--&lt;!&ndash;<a-input-number&ndash;&gt;-->
                  <!--&lt;!&ndash;style="width: 100%"&ndash;&gt;-->
                  <!--&lt;!&ndash;placeholder="请输入工作进度"&ndash;&gt;-->
                  <!--&lt;!&ndash;:min="0"&ndash;&gt;-->
                  <!--&lt;!&ndash;:formatter="value => `${value}%`"&ndash;&gt;-->
                  <!--&lt;!&ndash;:parser="value => value.replace('%', '')"&ndash;&gt;-->
                  <!--&lt;!&ndash;@change="jdChange([...arguments,index,item])"&ndash;&gt;-->
                  <!--&lt;!&ndash;v-decorator="[`gzjd-${item.id}`,{rules: [{ required: true, message: '请输入工作进度', type:'number',whitespace: true}],initialValue: item ? item.gzjd:''}]"/>&ndash;&gt;-->
                <!--{{item.gzjd}}-->
              <!--</a-form-item>-->
            <!--</a-col>-->
            <!--<a-col :lg="1":md="2">-->
              <!--&lt;!&ndash;<a href="javascript:;"@click="removeGz(index)"><a-icon type="close-circle" style="color:gray;margin-top:12px;"/></a>&ndash;&gt;-->
            <!--</a-col>-->
          <!--</a-row>-->
          <!--<a-button type="dashed" style="width: 100%" icon="plus"@click="addGz">添加工作详情</a-button>-->
        </a-form>
        <a-table
          bordered
          :rowClassName="rowClass"
          :dataSource="wdgzdetail"
          :columns="table.columns"
          :pagination="false"
          :size="table.size"
          :loading="table.tableIsLoading"
          :rowSelection="table.rowSelection"
        />
      </a-spin>
    </div>
    <!--<div class="bottom-buttons-bar">-->
    <!--<div>-->
      <!--<a-popconfirm title="您确认提交当前信息吗？" placement="topRight" okText="Yes" cancelText="No" @confirm="handleCommit">-->
      <!--&lt;!&ndash;<a-button size="small" type="primary"  style="float:right">提交</a-button>&ndash;&gt;-->
      <!--</a-popconfirm>-->
      <!--<a-button size="small" @click="emitCancel" style="float:right">返回</a-button>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
  //如果有使用时间选择器，则打开下面的注释，引入moment
   import moment from 'moment'
  import {mapGetters,mapActions} from 'vuex'
  import { initTableChildren } from '@/utils/tableChildrenInit'


  export default{
    name:'workDetail',
    components: {

    },
    props:{
      selectOptions:Object,
      height:String,
      maxHeight:String,
      recordId:[String,Number],
      modelType:String,
      dataSource:Array,
      departId:[String,Number],
    },

    data(){
      return {
        sys_relateDepId2,
        form: this.$form.createForm(this),
        contentLoading: false,
        wdgz:{},
        wdgzdetail: [],
        contentStyle:{
          padding:'16px',
          'padding-bottom':'72px',
          'max-height':parseInt(this.maxHeight)-50+'px',
          overflow: 'auto'
        },
        //表格配置
        table: {
          dataSource: [],
          columns: [
            {title: '序号', dataIndex: 'index',key:1, width: '50px', align: 'center'},
            {title: '工作内容描述', dataIndex: 'gznr',key:2, width: '500px', align: 'left', },
            {title: '工作进度', dataIndex: 'gzjd', key:3,width: '80px', align: 'center'},
          ],
          size: 'small',
          tableIsLoading: false,
//          scrollSize: {x: 1450, y: window.innerHeight - 112},
          scrollSize:null,
//           rowSelection:{
//             selectedRowKeys: [],
//             onChange: this.onSelectChange,
//             columnWidth:'20px',
//           }
          rowSelection: null
        },
      }
    },
    created(){
      this.reqDetail()

    },
    computed:{
      initialValues(){
        let initialValues={}
        if(this.modelType=='edit'|| this.modelType=='fenpei') {
          initialValues = {...this.getMyWorkById()(this.recordId)}
        }
        return initialValues
      },
      treeData(){
        return this.initTree(initTableChildren(this.data))
      },
      zongJd(){
          let jd=0
        this.wdgzdetail.forEach(item=>{
          jd=jd+item.gzjd
        })
        return jd
      }
    },
    methods:{
      moment,
      ...mapGetters(['getMyWorkById','']),
      ...mapActions(['reqWorkDetail','editMyWork']),

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
      //单双行条纹样式
      rowClass(record, index){
        if (index % 2 == 1) return 'even-rows'
      },
      handleTreeSelect(value,node, extra){
        console.log(value)
        this.departId=value
      },
      reqDetail(){
          this.contentLoading=true
         const paramater={
           param1:this.recordId,
//           param3:'0'
         }
         this.reqWorkDetail(paramater)
           .then((res)=>{
             if(res.success){
               this.wdgz=res.data[0].wdgz
               this.wdgzdetail=res.data[0].wdgzdetail
               this.wdgzdetail.forEach((item,index)=>{
                   item.index=index+1
                   item.key=item.key
                 item.gzjd=item.gzjd+' %'
               })
               this.contentLoading=false
             }else{
               this.$message.error('获取工作详情失败')
               this.contentLoading=false
             }
           })
           .catch((err)=>{
              console.log(JSON.stringify(err))
             this.contentLoading=false
           })
      },
      addGz(){
        this.wdgzdetail.push({
          gznr:'',
          gzjd:0,
          id:moment().valueOf()+Math.ceil(Math.random()*1000)
        })
      },
      removeGz(index){
        this.wdgzdetail.splice(index,1)
      },
      handleCommit(){
        this.form.validateFields((err, values) => {
          if (!err) {
            this.contentLoading=true
              this.wdgz.wcjd=this.zongJd
            const paramater={
                jsonData:JSON.stringify({
                  wdgz:this.wdgz,
                  wdgzdetail:this.wdgzdetail
                })
            }
            this.editMyWork(paramater)
              .then((res)=>{
                if(res.success){
                  this.$message.success('提交成功！')
                  this.$emit('cancel','success')
                  this.contentLoading=false
                }else{
                  this.$message.error(res.message)
                  this.contentLoading=false
                }
              })
              .catch((err)=>{
                console.log(JSON.stringify(err))
                this.contentLoading=false
              })
          }
        })
      },
      jdChange(){

        const value=arguments[0][0]
        const index=arguments[0][1]
        const item=arguments[0][2]
        this.wdgzdetail[index].gzjd=value
        if(this.zongJd>100){
//        if(value>50){
//            debugger
//          this.$message.error('')
          const aaa=`gzjd-${item.id}`
          const oldValue=this.form.getFieldValue(aaa)
//          const tmp={}
//          tmp[aaa]=50
//          this.form.setFieldsValue(tmp)
          this.wdgzdetail[index].gzjd=oldValue
          const form=this.form
          this.$error({
            title:'总进度不能超过100%，请重新设置！',
            style:{top:'300px'},
//            centered:'true',
            onOk(){
            form.resetFields()
            }
          })
        }
      },
      gznrChange(){
//        debugger
        const e=arguments[0][0]
        const index=arguments[0][1]
        this.wdgzdetail[index].gznr=e.target.value
      },
      emitCancel(){
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="scss" >
  .gzjl-title{
      :before {
      display: inline-block;
      margin-right: 4px;
      content: '*';
      font-family: SimSun;
      line-height: 1;
      font-size: 14px;
      color: #f5222d;
    }
  }
  .gznr-title{
    :before {
      display: inline-block;
      margin-right: 4px;
      content: '*';
      font-family: SimSun;
      line-height: 1;
      font-size: 14px;
      color: #f5222d;
    }
  }
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
      margin-bottom: 8px;
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
      .ant-table-small > .ant-table-content > .ant-table-body{
        margin: 0px;
      }
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