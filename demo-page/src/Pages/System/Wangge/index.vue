<template>
  <div class="system-wangge" style="height: 100%;">
    <span  v-if="showTree" class="wry-sider" style="width: 250px">
      <a-card style="height: 100%">
        <div slot="title">
          网格列表
          <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-if="!siderTreeOption.treeLoading" type="reload"  @click="reqTreeData"/>
          <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-else type="loading" />
        </div>
        <a-spin :spinning="siderTreeOption.treeLoading" size="small">
          <a-tree
            :treeData="siderTreeOption.treeData"
            showLine @select="handleTreeSelect"
            :selectedKeys="siderTreeOption.treeSelectedKey"
            :expandedKeys.sync="siderTreeOption.expandedKeys"
          />
        </a-spin>
      </a-card>
    </span>
    <span class="wry-content" style="width: calc(100% - 250px)">
      <span class="left-content">
        <div class="left-tree">
          <a-card style="height: 100%">
            <div slot="title">
              待选入企业
              <!--<a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-if="!leftTreeOption.treeLoading" type="reload"  @click="reqLeftTreeData"/>-->
              <!--<a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-else type="loading" />-->
            </div>
            <a-spin :spinning="leftTreeOption.treeLoading" size="small">
              <a-tree
                :treeData="leftTreeOption.treeData"
                showLine
                :expandedKeys.sync="leftTreeOption.expandedKeys"
              />
            </a-spin>
          </a-card>
        </div>
        <div class="middle-button">
          <div style="position: relative;top:35%">
            <div style="margin-bottom: 16px"><a-button type="primary">选入 ></a-button></div>
            <div><a-button >< 选出 </a-button></div>
          </div>
        </div>
        <div class="right-tree">
          <a-card style="height: 100%">
            <div slot="title">
             已选入企业
              <!--<a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-if="!rightTreeOption.treeLoading" type="reload"  @click="reqTreeData"/>-->
              <!--<a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-else type="loading" />-->
              <!--<a-button type="primary" size="small"style="float: right;" @click="saveWgfp">保存</a-button>-->
            </div>
            <a-spin :spinning="rightTreeOption.treeLoading" size="small">
              <a-tree
                checkStrictly
                checkable
                :treeData="rightTreeOption.treeData"
                showLine
                @check="onCheck"
                v-model="rightTreeOption.checkedKeys"
                :expandedKeys.sync="rightTreeOption.expandedKeys"
              />
            </a-spin>
          </a-card>
        </div>
      </span>
      <span class="wangge-search" style="height: 100%">
        <div style="height: 100%">
          <div style="height: 100%">111</div>
        </div>
      </span>
    </span>

  </div>
</template>

<script>
  //常用通用工具类
  import {mapGetters, mapActions} from 'vuex'
  import {initColumn} from '@/utils/tableColumnInit'
  import {initTableChildren} from '@/utils/tableChildrenInit'
  import moment from 'moment'

  const pageName = 'wangge'

  export default{
    name:'Wangge',

    props:{
      showTree:{
        Boolean,
        default:true
      }
    },

    data(){
      return{
        isFirstLoading:true,                 //控制左侧树第一次加载数据时是否自动请求第一条选项的数据
        contentLoading:false,               //如果没有用表格，可以套一个spin，绑定该参数进行load动画的控制
        pageLoading: false,

        //侧边栏树的配置
        siderTreeOption:{
          treeData:[],
          treeSelectedKey:[],
          treeSelectedTitle:'',
          treeLoading:false,
          expandedKeys:[]
        },
        leftTreeOption:{
          treeData:[],
          treeSelectedKey:[],
          treeSelectedTitle:'',
          treeLoading:false,
          expandedKeys:[]
        },

        rightTreeOption:{
          treeData:[],
          treeSelectedKey:[],
          treeSelectedTitle:'',
          treeLoading:false,
          expandedKeys:[],
          checkedKeys:{
            checked:[],
            halfChecked:[]
          },
        },
      }
    },

    beforeCreate(){
//        debugger
      //如果是测试环境，则设置以下localstorage
      if (process.env.NODE_ENV !== 'production') {
        const lsTemp = require('../../../temp/lsTemp')
        localStorage.setItem('/asrsajjdic', JSON.stringify(lsTemp.asrsajjdic))
        localStorage.setItem('/asrsajjfixsearch', JSON.stringify(lsTemp.asrsajjfixsearch))
      }
    },
    created(){
      if(this.showTree) this.reqTreeData()
//      this.reqTableData()
//      this.table.columns = initColumn(this.table.columns)
    },

//    mounted(){
//      this.$nextTick(function () {
////          debugger
//        let _this = this
//        window.onresize = function () {
////              debugger
//          _this.table.scrollSize.y = _this.search.showAdvanced ? window.innerHeight - 190 : window.innerHeight - 120
//          _this.modalOption.bodyStyle['max-height'] = window.innerHeight - 140 + 'px'
//          _this.modalOption.bodyStyle['height'] = window.innerHeight - 140 + 'px'
//        }
//        // document.getElementsByClassName('ant-table-body')[0].style.height=`${window.innerHeight-250}px`
//
//        //初始化选择项,存入vuex相应store的state中
//        const ls = JSON.parse(localStorage.getItem('/asrsajjdic'))
//
//        const tmp = []
//        selOptions.forEach(item => {
//          tmp.push({name: item, value: ls[item], lable: item})
//        })
//        this.$store.commit(selOptionMutation, tmp)
//        this.modalOption.selectOptions = this.$store.getters[getSelOpitons]
////        this.modalOption.selectOptions['企业类型'].forEach((item)=>{
////          item.isLeaf=false
////          item.loading=false
////        })
////        this.modalOption.selectOptions['国民经济行业分类'].forEach(item=>item.isLeaf=false)
//
//        const lsSearch = JSON.parse(localStorage.getItem('/asrsajjfixsearch'))['人员列表']
//        this.search.placeholder = "请输入" + lsSearch["0"][0].dispNm + "..."
//        this.search.searchOption = lsSearch
//      })
//    },

    methods:{
      moment,
      ...mapGetters(['']),
      ...mapActions(['reqWanggeList',]),

      //请求左侧树的数据，如果页面是第一次加载，则会自动选中第一条数据并发送数据请求，若不需要自动请求数据，则将data中isFirstLoading设为false
      reqTreeData(){
        this.siderTreeOption.treeLoading=true
        this.reqWanggeList()
          .then((res)=>{
            if(res.success){
              this.siderTreeOption.treeData=[]
              const treeData=[]
              res.data.forEach((item)=>{
                treeData.push({
                  title:item.name,
                  key:item.id,
                  value:item.id,
                  ...item
                })
              })
              this.siderTreeOption.treeData=this.initTreeData(treeData)
              this.siderTreeOption.treeLoading=false
              if(this.isFirstLoading) {
                this.siderTreeOption.treeSelectedKey=[this.siderTreeOption.treeData[0].key]
                this.siderTreeOption.treeSelectedTitle=this.siderTreeOption.treeData[0].title
                this.siderTreeOption.expandedKeys.push(this.siderTreeOption.treeData[0].key)
                this.isFirstLoading=false
//                this.handleTreeSelect(this.siderTreeOption.treeData[0].key,{})
              }
            }else{
              this.$message.error(res.message)
              this.siderTreeOption.treeLoading=false
            }
          })
          .catch(err=>console.log(JSON.stringify(err)))
      },

      reqLeftTreeData(){
        this.leftTreeOption.treeLoading=true
//        const paramater={
////          param1:
//        }
        this.reqZuzhiData()
          .then((res)=>{
            if(res.success){
              this.leftTreeOption.treeData=[]
              const treeData=[]
              res.data.forEach((item)=>{
                treeData.push({
                  title:item.name,
                  key:item.id,
                  value:item.id,
                  ...item
                })
              })
              this.leftTreeOption.treeData=this.initTreeData(treeData)
              this.leftTreeOption.treeLoading=false
            }else{
              this.$message.error(res.message)
              this.leftTreeOption.treeLoading=false
            }
          })
          .catch(err=>{
            console.log(JSON.stringify(err))
            this.leftTreeOption.treeLoading=false
          })
      },
      reqRightTreeData(){
        this.rightTreeOption.treeLoading=true
        const paramater={
          param3:this.leftTreeOption.treeSelectedKey[0]
        }
        this.reqWgfpList(paramater)
          .then((res)=>{
            if(res.success){
              this.wgData=[]
              this.authedWg=[]
              const tmpData=[]
              this.resData=res.data
              this.rightTreeOption.checkedKeys={
                checked:[],
                halfChecked:[]
              }
              res.data.forEach(item=>{
                if(item.authed=='true') {
                  const tmpKeyIndex=  this.rightTreeOption.checkedKeys.checked.findIndex(i=>i==item.id)
                  if(tmpKeyIndex==-1)this.rightTreeOption.checkedKeys.checked.push(item.id)
                  this.authedWg.push({
                    id: item.id,
                    authed:  item.authed,
                    pId:item.pId
                  })
                  tmpData.push(item)
                }
                this.wgData.push({
                  id: item.id,
                  authed:  item.authed,
                  pId:item.pId
                })
              })
              this.rightTreeOption.treeData= this.initTree(this.initTableChildren(res.data))
//                debugger
              this.parentNodes.forEach(item=>this.initChecked(item))
              this.parentNodes.forEach(item=>this.initChecked(item))
              this.parentNodes.forEach(item=>this.initChecked(item))
              this.parentNodes.forEach(item=>this.initChecked(item))
              this.parentNodes.forEach(item=>this.initChecked(item))
              this.parentNodes.forEach(item=>this.initChecked(item))
              if(this.isFirstLoading) {
                this.rightTreeOption.expandedKeys.push(this.rightTreeOption.treeData[0].key)
                this.isFirstLoading=false
              }
              this.rightTreeOption.treeLoading=false
            }else{
              this.$message.error(res.message)
              this.rightTreeOption.treeLoading=false
            }
          })
          .catch(err=>{
            console.log(JSON.stringify(err))
            this.rightTreeOption.treeLoading=false
          })
      },
      //左侧树选择后，请求相应数据
      handleTreeSelect(selectedKeys,{node=null}){
        if(selectedKeys.length>0)this.siderTreeOption.treeSelectedKey=selectedKeys

        if(node) this.siderTreeOption.treeSelectedTitle=node.title
//        this.contentLoading=true
//        const paramater={
//            param1:selectedKeys
//        }
//        this.reqTableData()
//        alert(selectedKeys)
//        this.selectedJcb=this.treeData.find(i=>i.key==this.treeSelectedKey)
//        const paramater={
//          param1: this.qyid,
//          param3: this.treeSelectedKey,
//          param4: this.selectedJcb.gdlx,
//        }
//        this.reqQyZfjcb(paramater)
//          .then((res)=>{
//            if(res.success){
//              this.dwaqfzrlist=res.data[0].dwaqfzrlist
//              this.jcd=res.data[0].jcd
//              this.jcddetail=res.data[0].jcddetail
//              this.contentLoading=false
//              this.isFirstLoading=false
//
//            }else{
//              this.$message.error(res.message)
//              this.contentLoading=false
//            }
//          })
//          .catch(err=>console.log(JSON.stringify(err)))
      },
      //格式化tree数据的方法
      initTreeData(data){
//        debugger
        if (data.length && data.length>0){
          // debugger
          const treeData=[]
//        data.sort((a,b)=>{
//          return b.nodeLevel - a.nodeLevel
//        })
          data.forEach(item=>{
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

      onCheck(){

      }
    }
  }
</script>

<style lang="scss">
  .system-wangge{
    min-width: 1170px;
    .ant-form-item {
      margin-bottom: 0px;
    }
    .wry-sider{
      padding:8px;
      /*width:300px;*/
      /*height: calc(100% - 45px);*/
      height: 100%;
      display: inline-block;
    }

    .wry-content{
      vertical-align:top;
      padding:8px;
      padding-left:0;
      min-width:920px;
      /*width:calc(100% - 300px);*/
      /*height: calc(100% - 45px);*/
      height: 100% ;
      display: inline-block;
      .left-content{
        vertical-align:middle;
        height: 100%;
        width:80%;
        display: inline-block;
        min-width: 720px;
        .left-tree{
          vertical-align:middle;
          height: 100%;
          width: 42%;
          min-width: 300px;
          overflow: auto;
          display: inline-block;
        }
        .middle-button{
          vertical-align:middle;
          text-align: center;
          height: 100%;
          width: 15%;
          min-width: 90px;
          display: inline-block;
        }
        .right-tree{
          vertical-align:middle;
          height: 100%;
          min-width: 300px;
          width: 42%;
          overflow: auto;
          display: inline-block;
        }
      }
      .wangge-search{
        vertical-align:middle;
        height: 100%;
        width:20%;
        min-width: 150px;
        display: inline-block;
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
      width: 20px !important;
      height: 20px !important;
      line-height: 20px !important;
    }
    .ant-tree-node-content-wrapper{
      height: 20px !important;
      line-height: 20px !important;
      font-size: 14px !important;
    }
    .ant-tree li {
      padding: 2px 0;
    }
    .ant-tree.ant-tree-show-line li:not(:last-child):before{
      left: 8px;
      margin: 4px 0;
    }
  }
</style>