<template>
  <div class="role-menu">
    <div v-if="type!='query'" style="margin-bottom: 8px"><a-icon type="info-circle" theme="twoTone" twoToneColor="#52c41a"/>  请至 [ 功能分配 ] 配置以下可选菜单列表</div>
    <a-tree
      showLine
      checkStrictly
      :checkable="type!='query'"
      @expand="onExpand"
      :expandedKeys="expandedKeys"
      :autoExpandParent="autoExpandParent"
      v-model="checkedKeys"
      @select="onSelect"
      @check="onCheck"
      :treeData="treeData"
    />
  </div>
</template>

<script>
  import {mapGetters,mapActions} from 'vuex'

  export default{
    name:'roleMenuTree',

    props:{
      recordId:[String,Number],
      departId:[String,Number],
      type:String,
    },

    data(){
        return{
          expandedKeys:[],
          autoExpandParent:false,
          checkedKeys:{
              checked:[],
            halfChecked:[]
          },

          selectedKeys:[],
          treeData:[],

          resData:[],

          menuData:[],
          authedMenus:[]
        }
    },
    created(){
//        if(this.type!='add'){
          this.reqTreeData()
//        }
    },
    mounted(){

    },
    watch: {
      checkedKeys(val) {
//        console.log('onCheck', val)
      },
      departId:function () {
//        this.reqTreeData()
        this.reqDepartTreeData()
      }
    },
    computed:{
      parentNodes(){
        return this.findParentNodes(this.treeData)
      }
    },
    methods:{
      ...mapActions(['reqRoleMenu','editRoleMenu','reqDepartMenu']),

      onExpand (expandedKeys) {
        console.log('onExpand', expandedKeys)
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.expandedKeys = expandedKeys
//        this.autoExpandParent = false
      },
      onCheck (checkedKeys,{checked,node}) {
//          debugger
        console.log('onCheck checkedKeys', checkedKeys)
//        console.log('onCheck info', info)
        this.checkedKeys = checkedKeys
        if(checked){
          this.checkedChildren('checked',node.value)
        }else{
          this.checkedChildren('unChecked',node.value)
        }
        const aaa= this.menuData.find(i=>i.id==node.value)
        this.initParent(aaa.pId)

      },
      onSelect (selectedKeys, info) {
        console.log('onSelect', info)
        this.selectedKeys = selectedKeys
      },
      reqTreeData(){
          const paramater={
            param4: this.recordId,
            param25 :this.departId,
          }
         this.reqRoleMenu(paramater)
           .then((res)=>{
              if(res.success){
                  this.menuData=[]
                  const tmpData=[]
                this.resData=res.data
                  res.data.forEach(item=>{
                   if(item.authed=='true') {
                   const tmpKeyIndex=  this.checkedKeys.checked.findIndex(i=>i==item.id)
                    if(tmpKeyIndex==-1)this.checkedKeys.checked.push(item.id)
                     this.authedMenus.push({
                       id: item.id,
                       fullId:  item.fullId,
                       ctype:  item.ctype,
                       authed:  item.authed,
                       pId:item.pId
                     })
                     tmpData.push(item)
                   }
                    this.menuData.push({
                      id: item.id,
                      fullId:  item.fullId,
                      ctype:  item.ctype,
                      authed:  item.authed,
                      pId:item.pId
                    })
                  })
                this.treeData=this.type=='query'
                  ? this.initTree(this.initTableChildren(tmpData))
                  : this.initTree(this.initTableChildren(res.data))
//                debugger
                this.parentNodes.forEach(item=>this.initChecked(item))
                this.parentNodes.forEach(item=>this.initChecked(item))
                this.parentNodes.forEach(item=>this.initChecked(item))
                this.parentNodes.forEach(item=>this.initChecked(item))
                this.parentNodes.forEach(item=>this.initChecked(item))
                this.parentNodes.forEach(item=>this.initChecked(item))
              }else{
                this.$message.error(res.message)
              }
           })
           .catch((err)=>console.log(JSON.stringify(err)))
      },
      reqDepartTreeData(){
        const paramater={
          param2: this.departId,
        }
        this.reqDepartMenu(paramater)
          .then((res)=>{
            if(res.success){
              this.menuData=[]
              const tmpData=[]
              res.data.forEach(item=>{
                if(item.authed=='true') {
                  const tmpKeyIndex=  this.checkedKeys.checked.findIndex(i=>i==item.id)
                  if(tmpKeyIndex==-1)this.checkedKeys.checked.push(item.id)
                  this.authedMenus.push({
                    id: item.id,
                    fullId:  item.fullId,
                    ctype:  item.ctype,
                    authed:  item.authed,
                    pId:item.pId
                  })
                  tmpData.push(item)
                }
                this.menuData.push({
                  id: item.id,
                  fullId:  item.fullId,
                  ctype:  item.ctype,
                  authed:  item.authed,
                  pId:item.pId
                })
              })
              this.treeData=this.type=='query'
                ? this.initTree(this.initTableChildren(tmpData))
                : this.initTree(this.initTableChildren(res.data))
              this.parentNodes.forEach(item=>this.initChecked(item))
            }else{
              this.$message.error(res.message)
            }
          })
          .catch((err)=>console.log(JSON.stringify(err)))
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
              const i=this.checkedKeys.checked.findIndex(i=>i==data.id)
            if(i>-1)this.checkedKeys.checked.splice(i,1)
              tmp.children=this.initTree(data.children)
          }
          aaa.push(tmp)
        })
        return aaa
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
          const indexInSelectKeys=this.checkedKeys.checked.findIndex(a=>a==item)
          const indexInHalfSelectKeys=this.checkedKeys.halfChecked.findIndex(a=>a==item)
          if (indexInSelectKeys>-1) i += 1
          if (indexInHalfSelectKeys>-1) halfNum += 1
        })
        switch (i){
          case 0:
            const index1= this.checkedKeys.checked.findIndex(a=>a==parent.key)
            if (index1>-1)this.checkedKeys.checked.splice(index1,1)
            const index2= this.checkedKeys.halfChecked.findIndex(a=>a==parent.key)
            if (halfNum==0){
              if (index2>-1)this.checkedKeys.halfChecked.splice(index2,1)
              }else{
              if (index2<0)this.checkedKeys.halfChecked.push(parent.key)
            }
              break
          case parent.children.length:
            const index3= this.checkedKeys.checked.findIndex(a=>a==parent.key)
            const index4= this.checkedKeys.halfChecked.findIndex(a=>a==parent.key)
                if(index3<0)this.checkedKeys.checked.push(parent.key)
                if(index4>-1)this.checkedKeys.halfChecked.splice(index4,1)
              break
          default:
            const index5= this.checkedKeys.checked.findIndex(a=>a==parent.key)
            const index6= this.checkedKeys.halfChecked.findIndex(a=>a==parent.key)
            if (index5>-1)this.checkedKeys.checked.splice(index5,1)
            if(index6<0)this.checkedKeys.halfChecked.push(parent.key)
        }
      },
      checkedChildren(type,menuId){
        if(type=='checked'){
          const index1=this.parentNodes.findIndex(i=>i.key==menuId)
          if(index1>-1){
            this.parentNodes[index1].children.forEach(key=>{
              const index11=this.checkedKeys.checked.findIndex(i=>i==key)
              if (index11<0) this.checkedKeys.checked.push(key)
              const index12=this.checkedKeys.halfChecked.findIndex(i=>i==key)
              if (index12>-1)this.checkedKeys.halfChecked.splice(index12,1)
              this.checkedChildren('checked',key)
            })
          }
        }else if(type=='unChecked'){
          const index2=this.parentNodes.findIndex(i=>i.key==menuId)
          if(index2>-1){
            this.parentNodes[index2].children.forEach(key=>{
              const index21=this.checkedKeys.checked.findIndex(i=>i==key)
              if (index21>-1) this.checkedKeys.checked.splice(index21,1)
              const index22=this.checkedKeys.halfChecked.findIndex(i=>i==key)
              if (index22>-1)this.checkedKeys.halfChecked.splice(index22,1)
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
      }
    }
  }
</script>

<style lang="scss" scoped >


</style>