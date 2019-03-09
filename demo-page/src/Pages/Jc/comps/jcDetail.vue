<template>
  <div class="jc-detail" :style="{height:height}">
    <span v-if="showTree" class="jc-sider" style="width: 300px">
      <a-card style="height: 100%">
        <div slot="title">
          检查记录列表
          <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-if="!treeLoading" type="reload"  @click="reqTreeData"/>
          <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-else type="loading" />
        </div>
        <a-spin :spinning="treeLoading" size="small">
          <a-tree :treeData="treeData" showLine @select="handleSelect" :selectedKeys="treeSelectedKey"/>
        </a-spin>
      </a-card>
    </span>

    <span class="jc-content" :style="{width:showTree ? 'calc(100% - 300px)':'100%'}">
        <a-spin :spinning="contentLoading" wrapperClassName="spinning">
          <a-card style="height: 100%;">
            <div slot="title">检查记录编号：{{selectedJcb ? selectedJcb.title : jcd.jcno ? '[' + jcd.jcdlx + ']' + jcd.jcno :''}}</div>
            <div class="jcjl-detail">
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
                  <a-col :lg="24">
                    <span class="item-title"><strong>执法人员：</strong></span>
                    <span class="item-content">{{jcd.jcusersname}}</span>
                  </a-col>
                </a-row>
                <a-row :gutter="8" align="top">
                  <a-col :lg="24">
                    <span class="item-title"><strong>陪同专家：</strong></span>
                    <span class="item-content" >{{jcd.jczjname}}</span>
                  </a-col>
                </a-row>
              </div>
              <a-divider/>
              <template>
                <a-list :dataSource="jcddetail" bordered>
                  <div slot="header">
                    <a-row :gutter="16">
                      <a-col :lg="20" :md="24">
                        <span><strong>检查内容：</strong></span>
                      </a-col>
                      <a-col :lg="4" :md="24">
                        <span><strong>检查结果：</strong></span>
                      </a-col>
                    </a-row>
                  </div>
                  <a-list-item slot="renderItem" slot-scope="item, index">
                    <div style="width: 100%;">
                      <a-row :gutter="16">
                      <a-col :lg="20" :md="24">
                        <div>{{item.jcnr}}</div>
                        <div v-if="item.yhnr && item.yhnr!=''">
                          <strong>隐患内容：</strong>
                          {{item.yhnr}}
                        </div>
                        <div v-if="item.sysnr && item.sysnr!=''" style="margin-top: 8px">
                          <strong>系统未落实：</strong>
                          {{item.sysnr}}
                         </div>
                      </a-col>
                      <a-col :lg="4" :md="24">
                        <span><strong>{{item.jcjg}}</strong></span>
                      </a-col>
                    </a-row>
                    </div>
                  </a-list-item>
                </a-list>
              </template>
              <template>
              <div style="width:400px ;margin-top: 16px;min-height: 100px">
                <a-upload  :fileList="fileList" :openFileDialogOnClick="false">
                  <a-icon type="file" />附件列表
                </a-upload>
              </div>
              </template>
            </div>
          </a-card>
        </a-spin>
    </span>
  </div>
</template>

<script>
  import {  mapGetters,mapActions } from 'vuex'
  import moment from 'moment'

  export default{
    name:'jcDetail',
    props:{
      showTree:{
        Boolean,
        default:true
      },
      jcType:String,
      height:String,
      departmentId:String,
      qyid:String,
      recordId:String
    },
    created(){
      this.showTree ? this.reqTreeData():this.handleSelect(this.recordId)
    },
    data(){
       return{
         isFirstLoading:true,
         treeData:[],
         treeLoading:false,
         treeSelectedKey:[],
         selectedJcb:{},

         contentLoading:false,
         defaultFileList:[],
         fileList:[],

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
    },
    mounted(){
      this.$nextTick(function () {

      })
    },
    methods:{
      moment,
//      ...mapGetters(['']),
      ...mapActions(['reqQyJcjlList','reqJcjlDetail']),

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
                  title:item.name,
                  key:item.id,
//                  gdlx:item.gdlx,
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
              this.fileList=[]
              this.dwaqfzrlist=res.data[0].dwaqfzrlist
              this.jcd=res.data[0].jcd
              this.jcddetail=res.data[0].jcddetail
              this.signlist=res.data[0].signlist
              this.contentLoading=false
              this.isFirstLoading=false
              const filelist=[]
              if (res.data[0].filelist.length>0){
                res.data[0].filelist.forEach(item=>{
//                    debugger
                  filelist.push({
                    uid: item.id,
                    name: item.shortMsg,
                    status: 'done',
                    response: 'Server Error 500', // custom error message to show
                    url: item.fpath,
                  })
                })
                this.fileList=filelist
              }

            }else{
              this.$message.error(res.message)
              this.contentLoading=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

    }
  }
</script>

<style lang="scss" >
  .jc-detail{
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
    .jc-sider{
      padding:8px;
      /*width:300px;*/
      height: 100%;
      display: inline-block;
    }
    .jc-content{
      vertical-align:top;
      padding:8px;
      padding-left:0;
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
    .jcjl-detail{
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
    }
  }

</style>
