import {GeneralQuery,GeneralPostQuery,createJcx,editJcx,delJcx,addJcb,delJcb,createZxjcplan,editZxjcplan,delZxjcplan} from './api'
import message from 'ant-design-vue/es/message'
const jixiao = {
  state:{
    jcx:{list:[],selectedOptions:[]},
    jcb:{list:[],selectedOptions:[],selList:[]},
    zxjcplan:{list:[],selectedOptions:[],}
  },
  mutations: {

    INIT_JCX_LIST: (state, payload) => {
      state.jcx.list=payload
    },

    INIT_JCX_SELECTED_OPTIONS:(state,payload)=>{
      state.jcx.selectedOptions=payload
    },
    INIT_JCB_LIST: (state, payload) => {
      state.jcb.list=payload
    },
    INIT_JCBSEL_LIST: (state, payload) => {
      state.jcb.selList=payload
    },
    INIT_ZXJCPLAN_LIST: (state, payload) => {
      state.zxjcplan.list=payload
    },
  },
  actions: {
    //查询检查项列表
    reqJcxList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350012',
          param1:sys_relateDepId2,
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCX_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增检查项
    createJcx:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createJcx(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改检查项信息
    editJcx:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editJcx(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //删除检查项
    delJcx:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delJcx(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //查询日常检查表列表
    reqJcbList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350013',
          param1:sys_relateDepId2,
          param2:'日常',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCB_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    reqJcbSelList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350014',
          param1:sys_relateDepId2,
          param2:'日常',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCBSEL_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    addJcbxm:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          param1:sys_relateDepId2,
          ...params
        }
        addJcb(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //删除日常检查表项目
    delJcbxm:(store,payload)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...payload.parameter
        }
        delJcb(parameter,payload.type)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //查询专项检查计划列表
    reqZxjcplanList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350015',
          param1:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_ZXJCPLAN_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增检查项
    createZxjcplan:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createZxjcplan(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改检查项信息
    editZxjcplan:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editZxjcplan(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //删除检查项
    delZxjcplan:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delZxjcplan(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
  },

  getters:{
    jxgl_jcx_list:(state) => {
      state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.jcx.list
    },
    getJcxById:(state)=>(id)=> {
      return state.jcx.list.find( todo=> todo.id==id)
    },
    jxgl_jcx_selOptions:(state)=>{
      const selOptions={}
      state.jcx.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

    jxgl_jcb_list:(state) => {
      state.jcb.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.jcb.list
    },
    jxgl_jcbsel_list:(state) => {
      state.jcb.selList.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.jcb.selList
    },

    jxgl_zxjcplan_list:(state) => {
      state.zxjcplan.list.forEach((item,index)=>{
        item.departName=item.__ddepartmentid.departName
        item.index=index+1
      })
      return state.zxjcplan.list
    },
    getJcplanById:(state)=>(id)=> {
      return state.zxjcplan.list.find( todo=> todo.id==id)
    },
  }
}

export default jixiao