<template>
  <div class="fc-detail" :style="{height:height}">
    <span class="fc-content" style="width:100%">
        <a-spin :spinning="contentLoading" wrapperClassName="spinning">
          <a-card style="height: 100%;">
            <div slot="title">检查单编号：{{jcd.jcno ? '[' + jcd.jcdlx + ']' + jcd.jcno :''}}</div>
            <a-form  :form="form">
            <div class="fcjl-detail">
              <div>
                <a-row :gutter="8" align="top">
                <a-col :lg="12">
                  <span class="item-title"><strong>被检查单位：</strong></span>
                  <span class="item-content">{{jcd.dwmc}}</span>
                </a-col>
                <a-col :lg="12">
                  <span class="item-title"><strong>单位地址：</strong></span>
                  <span class="item-content" >{{jcd.dwdz}}</span>
                </a-col>
              </a-row>
                <a-row :gutter="8" align="top">
                  <a-col :lg="12">
                    <span class="item-title"><strong>法定代表：</strong></span>
                    <span class="item-content">{{jcd.fr}}</span>
                  </a-col>
                  <a-col :lg="12">
                    <span class="item-title"><strong>联系方式：</strong></span>
                    <span class="item-content" >{{jcd.frlx}}</span>
                  </a-col>
                </a-row>
                <a-row :gutter="8" align="top">
                  <a-col :lg="12">
                    <span class="item-title"><strong>安全负责人：</strong></span>
                    <span class="item-content">{{jcd.safefzr}}</span>
                  </a-col>
                  <a-col :lg="12">
                    <span class="item-title"><strong>联系方式：</strong></span>
                    <span class="item-content" >{{jcd.safefzrlxfs}}</span>
                  </a-col>
                </a-row>
                <a-row :gutter="8" align="top">
                  <a-col :lg="12">
                    <span class="item-title"><strong>所属辖区：</strong></span>
                    <span class="item-content">{{jcd.ssxq}}</span>
                  </a-col>
                  <a-col :lg="12">
                    <span class="item-title"><strong>从业人员：</strong></span>
                    <span class="item-content" >{{jcd.cyrs && jcd.cyrs!=''? jcd.cyry : ' - '}} 人</span>
                  </a-col>
                </a-row>
                <a-row :gutter="8" align="top">
                  <a-col :lg="12">
                    <span class="item-title"><strong>检查场所：</strong></span>
                    <span class="item-content">{{jcd.jcdz}}</span>
                  </a-col>
                  <a-col :lg="12">
                    <span class="item-title"><strong>检查时间：</strong></span>
                    <span class="item-content" >{{jctime}}</span>
                  </a-col>
                </a-row>
                <a-row :gutter="8" align="top">
                  <a-col :lg="12">
                    <span class="item-title"><strong>复查人员：</strong></span>
                    <span class="item-content">{{jcd.jcusersname}}</span>
                  </a-col>
                  <a-col :lg="12">
                    <span class="item-title"><strong>陪同专家：</strong></span>
                    <span class="item-content" >{{jcd.jczjname}}</span>
                  </a-col>
                </a-row>
                <div class="margin-less">
                  <a-row :gutter="8" align="top">
                  <a-col :lg="12" :md="12" :sm="24" >
                    <a-form-item label="复查开始时间" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
                        <a-date-picker  placeholder="请选择复查开始时间"
                                        style="width: 100%"
                                        v-decorator="['fctimestart',{rules: [{ required: true, message: '请选择复查开始时间',type:'object'}],initialValue: jcd.fctimestart && jcd.fctimestart!=''?this.moment(jcd.fctimestart) : this.moment()}]"
                                        format="YYYY-MM-DD HH:mm"
                                        showTime
                                        :disabledDate="disableStartDate"
                        />
                    </a-form-item>
                  </a-col>
                </a-row>
                  <a-row :gutter="8" align="top">
                    <a-col :lg="12" :md="12" :sm="24">
                      <a-form-item label="复查人员" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
                        <span style="display: inline-block;width: 70%">
                          <a-select  placeholder="请选择复查人员" :options="jcryList" mode="multiple"  allowClear  :labelInValue="true"
                                     v-decorator="[ 'fcry',{rules: [{ required: true, message: '请选择复查人员', whitespace: true,type:'array',validateTrigger:'blur'}]}]" >
                          </a-select>
                        </span>
                        <span style="display: inline-block;width: 30%">
                          <a-tree-select :treeData="ssbm" style="width:100%;padding-left:5px"   placeholder="所属部门筛选" v-model="jcryDepartmentId" @select="jcryDepartSel"
                                         allowClear :dropdownStyle="{'max-height':'300px'}"/>
                        </span>
                      </a-form-item>
                    </a-col>
                  </a-row>
                  <a-row :gutter="8" align="top">
                    <a-col :lg="12">
                    <a-form-item label="复查专家" :labelCol="{ span: 5 }" :wrapperCol="{ span: 18 }">
                      <span style="display: inline-block;width: 70%">
                        <a-select  placeholder="请选择复查专家":options="zhuanjiaList"  mode="multiple"  allowClear :labelInValue="true"
                                   v-decorator="[ 'fczhuanjia',{rules: [{ whitespace: true,type:'array',validateTrigger:'blur'}]}]" >
                        </a-select>
                      </span>
                       <span style="display: inline-block;width: 30%">
                        <a-tree-select :treeData="ssbm" style="width:100%;padding-left:5px"   placeholder="所属部门筛选" v-model="jczjDepartmentId" @select="jczjDepartSel"
                                       allowClear :dropdownStyle="{'max-height':'300px'}"/>
                      </span>
                    </a-form-item>
                  </a-col>
                </a-row>
                </div>

              </div>
              <a-divider/>
              <template>
                <div class="yh-list">
                  <div style="width: 100%;" v-for="(item,index) in jcddetail" :key="item.id">
                      <a-row :gutter="16" align="middle">
                        <a-col :lg="18" :md="24">
                          <span><strong>检查内容：</strong>{{item.jcnr}}</span>
                        </a-col>
                        <a-col :lg="6" :md="24">
                          <span><strong>检查结果：{{item.jcjg}}</strong></span>
                        </a-col>
                      </a-row>
                      <a-row type="flex" align="middle" v-if="(item.yhnr && item.yhnr!='')||(item.sysnr && item.sysnr!='')" :gutter="16" style="margin-top: -12px;margin-bottom: 8px">
                        <a-col :lg="18" :md="24">
                          <div v-if="item.yhnr && item.yhnr!=''">
                            <strong>隐患内容：</strong>
                            {{item.yhnr}}
                          </div>
                          <div v-if="item.sysnr && item.sysnr!=''" style="margin-top: 8px">
                            <strong>系统未落实：</strong>
                            {{item.sysnr}}
                           </div>
                        </a-col>
                        <a-col :lg="6" :md="22">
                          <span class="ant-form-item-required" style="left:-10px;position: relative">
                            <span style="display: inline-block"><strong >复查结果：</strong></span>
                            <span style="display: inline-block; width:calc(100% - 100px)">
                              <a-form-item >
                              <a-select  placeholder="请选择复查结果" size="small"
                                         v-decorator="[ `jcdetail[${index}].${item.id}.fcjg`,{rules: [{ required: true, message: '请选择复查结果', whitespace: true,}],initialValue:item.fcjg && item.fcjg !='' ? item.fcjg : undefined}]" >
                                <a-select-option v-for="selitem in selectOptions.fcjg" :key="selitem.value">{{selitem.label}}</a-select-option>
                              </a-select>
                           </a-form-item>
                            </span>
                          </span>

                        </a-col>
                      </a-row>
                    </div>
                </div>

              </template>
              <template>
              <div style="width:400px ;margin-top: 16px;min-height: 200px">
                <a-upload  :defaultFileList="defaultFileList"  :openFileDialogOnClick="false">
                  <a-icon type="file" />附件列表
                </a-upload>
              </div>
              </template>
            </div>
            </a-form>
          </a-card>
        </a-spin>
    </span>
    <div class="bottom-buttons-bar">
      <div>
        <a-button size="small" type="primary" @click="handelCommit" style="float:right">完成复查</a-button>
        <a-button size="small" @click="modalCancel" style="float:right">取消</a-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import moment from 'moment'


  const selOptions=['fcjg']
  export default{
    name:'fcForm',
    props:{
      showTree:{
        Boolean,
        default:false
      },
      jcType:String,
      height:String,
      departmentId:String,
      qyid:String,
      recordId:String
    },
    created(){
      this.showTree ? this.reqTreeData():this.handleSelect(this.recordId)
      this.reqJcNameList()
      this.reqZuzhiData()
        .then((res)=>{
          if(res.success){
            this.ssbm=[]
//            debugger
            const treeData=[{
              title:'全部',
              key:'0000',
              value:'0000',
              pId:'0',
              id:'0000'
            }]
            res.data.forEach((item)=>{
              treeData.push({
                title:item.name,
                key:item.id,
                value:item.id,
                ...item
              })
            })
            this.ssbm=this.initTreeData(treeData)
//            this.siderTreeOption.treeLoading=false
            this.jcryDepartmentId=this.ssbm[0].key
            this.jczjDepartmentId=this.ssbm[0].key
          }
        })
        .catch(err=>console.log(JSON.stringify(err)))
    },
    data(){
      return{
        isFirstLoading:true,
        jcryDepartmentId:undefined,
        jczjDepartmentId:undefined,
        ssbm:[],
        treeData:[],
        treeLoading:false,
        treeSelectedKey:[],
        selectedJcb:{},
        disableStartDate(current) {
          return  current > moment().endOf('day');
        },
        form: this.$form.createForm(this),
        jcryList:[],
        zhuanjiaList:[],
        contentLoading:false,
        defaultFileList:[],
        fileList:[],
        selectOptions:[],

        dwaqfzrlist:[],
        jcd:{},
        jcddetail:[],
        signlist:[],
      }
    },
    computed:{
      jctime(){
        if(this.jcd.jctimestart && this.jcd.jctimeend){
          return moment(this.jcd.jctimestart).format('YYYY-MM-DD HH:mm')+' 至 ' + moment(this.jcd.jctimeend).format('YYYY-MM-DD HH:mm')
        }
      },
      fctime(){
        if(this.jcd.fctimestart && this.jcd.fctimeend){
          return moment(this.jcd.fctimestart).format('YYYY-MM-DD HH:mm')+' 至 ' + moment(this.jcd.fctimeend).format('YYYY-MM-DD HH:mm')
        }
      }
    },
    mounted(){
      this.$nextTick(function () {
        let _this=this
        window.onresize = function(){
//          _this.table.scrollSize.y=  _this.search.showAdvanced ? window.innerHeight - 190 :window.innerHeight - 112
//          _this.modalOption.bodyStyle.height=window.innerHeight-80 + 'px'
        }

        //初始化选择项,存入vuex相应store的state中
        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))

        const tmp={}
        selOptions.forEach(item=>{tmp[item]=ls[item]})
        this.selectOptions=tmp
      })
    },
    methods:{
      moment,
//      ...mapGetters(['']),
      ...mapActions(['reqQyJcjlList','reqJcjlDetail','reqJcryList','createFcDetail','reqZuzhiData']),

      jcryDepartSel(selectKey){
        const jcryList=[]
        if(selectKey) this.jcryList.forEach(item=>{
          item={...item}
          item.class= item.departmentid==selectKey ||selectKey=='0000'?  '' :'display-none'
          jcryList.push(item)
        })
        this.jcryList=jcryList
      },
      jczjDepartSel(selectKey){
        const zhuanjiaList=[]
        if(selectKey) this.zhuanjiaList.forEach(item=>{
          item={...item}
          item.class= item.departmentid==selectKey ||selectKey=='0000'?  '' :'display-none'
          zhuanjiaList.push(item)
        })
        this.zhuanjiaList=zhuanjiaList
      },
      reqJcNameList(){
//        this.contentLoading=true
        this.reqJcryList()
          .then((res)=>{
            if(res.success){
              const _this=this
              res.data.forEach((item)=>{
                item.class=''
                item.title=item.name
                item.key=item.id
              })
              setTimeout( ()=>{
                _this.zhuanjiaList=res.data
                _this.jcryList=res.data
//                  _this.contentLoading=false
              }, 200)
            }else{
              this.$message.error(res.message)
              this.contentLoading=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      reqTreeData(){
        this.treeLoading=true
        const params={
          param1:this.qyid
        }
        const type=this.jcType
        const payload={
          params,
          type
        }
        this.reqQyJcjlList(payload)
          .then((res)=>{
            if(res.success){
              this.treeData=[]
              res.data.forEach((item)=>{
                this.treeData.push({
                  id:item.id,
                  title:item.name,
                  key:item.id + '?'+item.gdlx,
                  gdlx:item.gdlx,
                })
              })
              this.treeLoading=false
              if(this.isFirstLoading) {
                this.handleSelect(this.treeData[0].key)
                this.treeSelectedKey=[this.treeData[0].key]
              }
            }else{
              this.$message.error(res.message)
              this.treeLoading=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      initTreeData(data){
//        debugger
        if (data.length && data.length>0){
          // debugger
          const treeData=[]
//        data.sort((a,b)=>{
//          return b.nodeLevel - a.nodeLevel
//        })
          data.forEach(item=>{
//              debugger
            const parent = data.find(i=>item.pId==i.id)
            if (parent){
              if(!parent.children){
                parent.children=[]
              }
              parent.children.push(item)
            }else{
              treeData.push(item)
            }
          })
          return treeData
        }else{
          return []
        }
      },
      handleSelect(selectedKeys){
        if(selectedKeys.length>0)this.treeSelectedKey=selectedKeys
        this.contentLoading=true
        this.selectedJcb=this.treeData.find(i=>i.key==this.treeSelectedKey)
        const paramater={
          param1: this.treeSelectedKey,
        }
        this.reqJcjlDetail(paramater)
          .then((res)=>{
            if(res.success){
              this.dwaqfzrlist=res.data[0].dwaqfzrlist
              this.jcd=res.data[0].jcd
              this.jcddetail=res.data[0].jcddetail
              this.jcddetail.forEach(i=>i.key=i.id)
              this.signlist=res.data[0].signlist
              this.contentLoading=false
              this.isFirstLoading=false
            }else{
              this.$message.error(res.message)
              this.contentLoading=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },
      handleSelectChange(){
      },
      modalCancel(){
        this.$emit('cancel')
      },
      handelCommit(){
        this.form.validateFields((err, values) => {
          if (!err) {
              debugger
            this.contentLoading=true
            const jsonData={
              zfjc:{},
              zfjcdetail:[],
            }
            jsonData.zfjc={...this.jcd}
            jsonData.zfjc.fctimestart=values.fctimestart.format('YYYY-MM-DD HH:mm')
//            if (values.zgwcDate)jsonData.zfjc.yqzgsj=values.zgwcDate.format('YYYY-MM-DD')

            values.jcdetail.forEach((detail)=>{
              const id= Object.keys(detail)[0]
              const detailIndex=this.jcddetail.findIndex(i=>i.id==id)
              const postDetail=detailIndex>-1 ?{...this.jcddetail[detailIndex]}:{}
              postDetail.fcjg=detail[id].fcjg

              jsonData.zfjcdetail.push(postDetail)
            })
            if (this.showTree){
              jsonData.zfusers=[]
              jsonData.zjusers=[]
              values.fcry.forEach((item)=>{
                const tmpKey=item.key.split('?')[1]
                jsonData.zfusers.push(this.jcryList.find(i=>i.id==tmpKey))
              })
              values.fczhuanjia.forEach((item)=>{
                const tmpKey=item.key.split('?')[1]
                jsonData.zjusers.push(this.zhuanjiaList.find(i=>i.id==tmpKey))
              })

            }
            const paramater={
              jsonData:JSON.stringify(jsonData)
            }
            this.createFcDetail(paramater)
              .then((res)=>{
                if(res.success){
                  this.$message.success('提交成功')
                  this.contentLoading=false
                  this.$emit('cancel','success')
                }else{
                  this.$message.error(res.message)
                  this.contentLoading=false
                }
              })
              .catch(err=>console.log(JSON.stringify(err)))
          }})
//        this.modalCancel()
      },
    }
  }
</script>

<style lang="scss" >
  .fc-detail{
    background-color: #f5f5f5;

    .spinning{
      height:100%;
      .ant-spin-container{
        height:100%;
      }
    }
    .ant-form-item{
      margin-bottom: 8px;
    }
    .margin-less{
      .ant-form-item{
        margin-bottom: 0px !important;
      }
    }
    .fc-sider{
      padding:8px;
      /*width:300px;*/
      height: 100%;
      display: inline-block;
    }
    .fc-content{
      vertical-align:top;
      padding:8px;
      /*padding-left:0;*/
      /*width:calc(100% - 300px);*/
      height: 100%;
      display: inline-block;
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
    .fcjl-detail{
      padding: 24px;
      padding-top:12px;
      .ant-row{
        margin-bottom: 12px;
      }
      .ant-list{
        .ant-row{
          margin-bottom: 0px;
        }
      }
      .item-title{
        vertical-align:top;
        display: inline-block;
        width: 100px;
      }
      .item-content{
        vertical-align:top;
        display: inline-block;
        width: calc(100% - 100px)
      }
      .yh-list{
        .ant-row{
          margin: 12px 0;
        }
        .ant-row:last-child{
          margin: 12px 0;
        }
        .ant-form-item{
          margin:0 !important;
        }
        border: solid 1px #e2e2e2;
        border-radius: 12px;
        padding:0 16px ;
        > div {
          border-bottom: solid 1px #e2e2e2;
        }
        > div:last-child{
          border-bottom: none;
        }
      }
    }
  }

</style>
