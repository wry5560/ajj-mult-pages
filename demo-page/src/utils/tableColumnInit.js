export function initColumn(columns=[]) {

  const tmpColumns=[...columns]

  tmpColumns.forEach((column)=>{
    if(column.children && column.children.length>0) column.children=initColumn(column.children)
    column.key=column.dataIndex
    const align=column.align ||''
    const titleAlign=column.titleAlign ? column.titleAlign : align
    if (column.align) delete column.align
    // debugger
    column.customCell=(record,recordIndex)=>{
      return{
        style:{
          'width':column.width,
          'min-width':column.width,
          'max-width':column.width,
          'text-align':align,
          'text-overflow':'ellipsis',
          'overflow':'hidden',
          'white-space':'nowrap',
          ...column.style
        },
      }
    }
    column.customHeaderCell=(thisColumn)=>{
      return{
        style: {
          'text-align':titleAlign
        }
      }
    }
    // debugger
    if ( !column.hasOwnProperty('customRender')|| column.customRender=='' ){
      if(column.hasOwnProperty('scopedSlots')){
        if(!column.scopedSlots.hasOwnProperty('customRender')|| column.scopedSlots.customRender==''){
          column.scopedSlots.customRender='defaultcustomRender'
        }
      }else{
        column.scopedSlots={}
        column.scopedSlots.customRender='defaultcustomRender'
      }
    }
  })
  return tmpColumns
}
