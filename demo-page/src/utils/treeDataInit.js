export function initTreeData(data){
  if (data.length && data.length>0){
    // debugger
    const treeData=[]
    data.sort((a,b)=>{
      return b.nodeLevel - a.nodeLevel
    })
    data.forEach(item=>{
      const parent = data.find(i=>item.parentId==i.id)
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
  // data.forEach()
}