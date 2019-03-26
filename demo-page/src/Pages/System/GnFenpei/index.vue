<template>
  <div class="wg-fenpei">
    <a-row :gutter="16" style="height: 100%">
      <a-col :lg="12"  style="height: 100%">
        <div class="left-tree">
          <a-card style="height: 100%">
            <div slot="title">
              组织列表
              <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-if="!leftTreeOption.treeLoading" type="reload"  @click="reqLeftTreeData"/>
              <a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-else type="loading" />
            </div>
            <a-spin :spinning="leftTreeOption.treeLoading" size="small">
              <a-tree
                :treeData="leftTreeOption.treeData"
                showLine @select="handleTreeSelect"
                :selectedKeys="leftTreeOption.treeSelectedKey"
                :expandedKeys.sync="leftTreeOption.expandedKeys"
              />
            </a-spin>
          </a-card>
        </div>
      </a-col>
      <a-col :lg="12"  style="height: 100%">
        <div class="right-tree">
          <a-card style="height: 100%">
            <div slot="title">
              菜单列表
              <!--<a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-if="!rightTreeOption.treeLoading" type="reload"  @click="reqTreeData"/>-->
              <!--<a-icon style="float: right;font-size:12px;margin-top:5px;color:gray" v-else type="loading" />-->
              <a-button type="primary" size="small"style="float: right;" @click="saveWgfp">保存</a-button>
            </div>
            <a-spin :spinning="rightTreeOption.treeLoading" size="small">
              <a-tree
                checkStrictly
                checkable
                :treeData="rightTreeOption.treeData"
                showLine
                @expand="onExpand"
                @check="onCheck"
                v-model="rightTreeOption.checkedKeys"
                :expandedKeys.sync="rightTreeOption.expandedKeys"
              />
            </a-spin>
          </a-card>
        </div>
      </a-col>
    </a-row>

  </div>
</template>

<script>

  import {mapGetters, mapActions} from 'vuex'


  export default{
    name:'gongnengFenpei',

    data(){
        return{
          isFirstLoading:true,
          menuData:[],
          resData:[],
          authedMenu:[],

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
    computed:{
      parentNodes(){
        return this.findParentNodes(this.rightTreeOption.treeData)
      }
    },
    created(){
      this.reqLeftTreeData()
    },

    methods:{
      ...mapGetters(['']),
      ...mapActions(['reqZuzhiData','reqZzMenuList','editZzMenu']),
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
              if(this.isFirstLoading) {
                this.leftTreeOption.treeSelectedKey=[this.leftTreeOption.treeData[0].key]
                this.leftTreeOption.treeSelectedTitle=this.leftTreeOption.treeData[0].title
                this.leftTreeOption.expandedKeys.push(this.leftTreeOption.treeData[0].key)
//                this.isFirstLoading=false
                this.handleTreeSelect(this.leftTreeOption.treeData[0].key,{})
              }
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
            param1:this.leftTreeOption.treeSelectedKey[0]
        }
        this.reqZzMenuList(paramater)
          .then((res)=>{
            if(res.success){
              this.menuData=[]
              this.authedMenu=[]
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
                  this.authedMenu.push({
                    id: item.id,
                    authed:  item.authed,
                    pId:item.pId
                  })
                  tmpData.push(item)
                }
                this.menuData.push({
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
      initTree(datas){
//          debugger
        let aaa=[]
        datas.forEach((data,index)=>{
//              debugger
          const tmp={
            title:data.name,
            value:data.id,
            key:data.id,
            pId:data.pId
          }
          if (data.children && data.children.length>0) {
            const i=this.rightTreeOption.checkedKeys.checked.findIndex(i=>i==data.id)
            if(i>-1)this.rightTreeOption.checkedKeys.checked.splice(i,1)
            tmp.children=this.initTree(data.children)
          }
          aaa.push(tmp)
        })
        return aaa
      },
      initTableChildren(data=[]) {

        let dataSource=[...data]
        // 删除 所有 children,以防止多次调用
        dataSource.forEach(function (item) {
          delete item.children;
        });

        // 将数据存储为 以 id 为 KEY 的 map 索引数据列
        let map = {};
        dataSource.forEach(function (item) {
          map[item.id] = item;
        });
//        console.log(map);
        let val = [];
        dataSource.forEach(function (item) {
          // 以当前遍历项，的pid,去map对象中找到索引的id
          let parent = map[item.pId];
          // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
          if (parent) {
            (parent.children || ( parent.children = [] )).push(item);
          } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item);
          }
        });
        return val;
      },
      handleTreeSelect(selectedKeys,{node=null}){
        if(selectedKeys.length>0)this.leftTreeOption.treeSelectedKey=selectedKeys
        this.reqRightTreeData()
      },

      findParentNodes(datas){
        let val=[]
        datas.forEach(item=>{
          if(item.children && item.children.length>0){
            const tmp={
              key:item.key,
              children:[]
            }
            item.children.forEach(i=>tmp.children.push(i.key))
            val.push(tmp)
            val=val.concat(this.findParentNodes(item.children))
          }
        })
        return val
      },
      initChecked(parent){
//          debugger
        if (  !parent || !parent.children || parent.children.lenght==0 ) return
        let i=0
        let halfNum=0
        parent.children.forEach((item)=>{
//              debugger
//          const aaa=this.checkedKeys
          if (item.children && item.children.length>0) this.initChecked(item)
          const indexInSelectKeys=this.rightTreeOption.checkedKeys.checked.findIndex(a=>a==item)
          const indexInHalfSelectKeys=this.rightTreeOption.checkedKeys.halfChecked.findIndex(a=>a==item)
          if (indexInSelectKeys>-1) i += 1
          if (indexInHalfSelectKeys>-1) halfNum += 1
        })
        switch (i){
          case 0:
            const index1= this.rightTreeOption.checkedKeys.checked.findIndex(a=>a==parent.key)
            if (index1>-1)this.rightTreeOption.checkedKeys.checked.splice(index1,1)
            const index2= this.rightTreeOption.checkedKeys.halfChecked.findIndex(a=>a==parent.key)
            if (halfNum==0){
              if (index2>-1)this.rightTreeOption.checkedKeys.halfChecked.splice(index2,1)
            }else{
              if (index2<0)this.rightTreeOption.checkedKeys.halfChecked.push(parent.key)
            }
            break
          case parent.children.length:
            const index3= this.rightTreeOption.checkedKeys.checked.findIndex(a=>a==parent.key)
            const index4= this.rightTreeOption.checkedKeys.halfChecked.findIndex(a=>a==parent.key)
            if(index3<0)this.rightTreeOption.checkedKeys.checked.push(parent.key)
            if(index4>-1)this.rightTreeOption.checkedKeys.halfChecked.splice(index4,1)
            break
          default:
            const index5= this.rightTreeOption.checkedKeys.checked.findIndex(a=>a==parent.key)
            const index6= this.rightTreeOption.checkedKeys.halfChecked.findIndex(a=>a==parent.key)
            if (index5>-1)this.rightTreeOption.checkedKeys.checked.splice(index5,1)
            if(index6<0)this.rightTreeOption.checkedKeys.halfChecked.push(parent.key)
        }
      },
      checkedChildren(type,menuId){
        if(type=='checked'){
          const index1=this.parentNodes.findIndex(i=>i.key==menuId)
          if(index1>-1){
            this.parentNodes[index1].children.forEach(key=>{
              const index11=this.rightTreeOption.checkedKeys.checked.findIndex(i=>i==key)
              if (index11<0) this.rightTreeOption.checkedKeys.checked.push(key)
              const index12=this.rightTreeOption.checkedKeys.halfChecked.findIndex(i=>i==key)
              if (index12>-1)this.rightTreeOption.checkedKeys.halfChecked.splice(index12,1)
              this.checkedChildren('checked',key)
            })
          }
        }else if(type=='unChecked'){
          const index2=this.parentNodes.findIndex(i=>i.key==menuId)
          if(index2>-1){
            this.parentNodes[index2].children.forEach(key=>{
              const index21=this.rightTreeOption.checkedKeys.checked.findIndex(i=>i==key)
              if (index21>-1) this.rightTreeOption.checkedKeys.checked.splice(index21,1)
              const index22=this.rightTreeOption.checkedKeys.halfChecked.findIndex(i=>i==key)
              if (index22>-1)this.rightTreeOption.checkedKeys.halfChecked.splice(index22,1)
              this.checkedChildren('unChecked',key)
            })
          }
        }
      },
      initParent(pId){
//          debugger
        const parent=this.parentNodes.find(i=>i.key==pId)
        if(parent) {
          this.initChecked(parent)
          this.initParent( this.menuData.find(i=>i.id==pId).pId)
        }
      },
      onExpand (expandedKeys) {
        console.log('onExpand', expandedKeys)
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.rightTreeOption.expandedKeys = expandedKeys
//        this.autoExpandParent = false
      },
      onCheck (checkedKeys,{checked,node}) {
//          debugger
        console.log('onCheck checkedKeys', checkedKeys)
//        console.log('onCheck info', info)
        this.rightTreeOption.checkedKeys = checkedKeys
        if(checked){
          this.checkedChildren('checked',node.value)
        }else{
          this.checkedChildren('unChecked',node.value)
        }
        const aaa= this.menuData.find(i=>i.id==node.value)
        this.initParent(aaa.pId)

      },
      saveWgfp(){
        this.rightTreeOption.treeLoading=true
        const menuData=this.menuData
        const authedMenu=this.authedMenu
        const adds=[]
        const dels=[]
        const selKeys=this.rightTreeOption.checkedKeys.checked.concat(this.rightTreeOption.checkedKeys.halfChecked)
        selKeys.forEach(i=>{
          const index=authedMenu.findIndex(item=>item.id==i)
          if(index ==-1){
            adds.push(menuData.find(item=>item.id==i))
          }
        })
        authedMenu.forEach(item=>{
          const index=selKeys.findIndex(i=>i==item.id)
          if(index ==-1)dels.push(item)
        })
        const paramater2={
          param1: JSON.stringify({
            storeMap1:adds
          }),
          param2:  JSON.stringify({
            storeMap1:dels
          }),
          param3: this.leftTreeOption.treeSelectedKey[0],
        }
        this.editZzMenu(paramater2)
          .then(res=>{
            if(res.success){
              this.$message.success('保存成功！')
              this.reqRightTreeData()
            }else{
              this.$message.error('保存失败！')
              this.rightTreeOption.treeLoading=false
            }
          })
          .catch(err=>{
            this.$message.error('保存失败！')
            this.rightTreeOption.treeLoading=false
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .wg-fenpei{
    background-color: #f7f8fc;
    height: 100%;
    padding:12px;
    .left-tree{
      float: right;
      height: 100%;
      width: 450px;
      overflow: auto;
    }
    .right-tree{
      height: 100%;
      width: 450px;
      overflow: auto;
    }
  }
</style>