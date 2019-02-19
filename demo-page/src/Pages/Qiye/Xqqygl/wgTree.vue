<template>
    <div>
      <a-tree
        showLine
        :defaultExpandedKeys="expandedKeys"
        @select="onSelect"
        v-if="this.treeData.length>0"
      >
        <a-tree-node v-for="item in treeData" :key="item.id" :title="item.nodeNm">
          <template v-if="item.children && item.children.length>0">
             <a-tree-node v-for="i in item.children" :key="i.id" :title="i.nodeNm">
               <template v-if="i.children && i.children.length>0">
                 <a-tree-node v-for="j in i.children" :key="j.id" :title="j.nodeNm">
                   <template v-if="j.children && j.children.length>0">
                     <a-tree-node v-for="a in j.children" :key="a.id" :title="a.nodeNm">
                       <template v-if="a.children && a.children.length>0">
                         <a-tree-node v-for="b in a.children" :key="b.id" :title="b.nodeNm">
                           <template v-if="b.children && b.children.length>0">
                             <a-tree-node v-for="c in b.children" :key="c.id" :title="c.nodeNm">
                               <template v-if="c.children && c.children.length>0">
                                 <a-tree-node v-for="d in c.children" :key="d.id" :title="d.nodeNm">
                                 </a-tree-node>
                               </template>
                             </a-tree-node>
                           </template>
                         </a-tree-node>
                       </template>
                     </a-tree-node>
                   </template>
                 </a-tree-node>
               </template>
             </a-tree-node>
          </template>
        </a-tree-node>
      </a-tree>
    </div>
</template>

<script>
  let tmp=[]
    export default {
      name: "wgTree",
      components:{
      },
      props:{
        treeData: Array
      },
      data(){
        return{
          expandedKeys:[]
        }
      },
      mounted(){
      },
      computed:{
      },
      watch:{
        treeData:function(newTreeData){
          this.initExpandedKeys(newTreeData)
          this.expandedKeys=tmp
          tmp=[]
        }
      },
      methods:{
        initExpandedKeys(treeData){
          treeData.forEach(item=>{
            if (item.children && item.children.length>0){
              tmp.push(item.id)
              this.initExpandedKeys(item.children)
            }
          })
        },
        onSelect(selectedKeys){
          this.$emit('select',selectedKeys[0])
        }
      }
    }
</script>

<style scoped>

</style>