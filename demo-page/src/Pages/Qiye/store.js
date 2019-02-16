import {GeneralQuery,GeneralPostQuery,editXqqyGps} from './api'
import message from 'ant-design-vue/es/message'
const jixiao = {
  state:{
    xqqiye:{list:[],selectedOptions:[]},
  },
  mutations: {
    INIT_XQQIYE_LIST: (state, payload) => {
      state.xqqiye.list=payload
    },

  },
  actions: {
    //查询企业列表
    reqXqqyList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610069.wg',
          param2:sys_relateDepId5,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_XQQIYE_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //修改企业Gps信息
    editXqqyGps:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editXqqyGps(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    // //新增检查项
    // createJcx:(store,params)=>{
    //   return new Promise((resolve, reject) => {
    //     //这里可以增加通用参数，如部门id等
    //     const parameter={
    //       ...params
    //     }
    //     createJcx(parameter)
    //       .then((res)=>{
    //         resolve(res)
    //       })
    //   })
    // },
    // //修改检查项信息
    // editJcx:(store,params)=>{
    //   return new Promise((resolve, reject) => {
    //     //这里可以增加通用参数，如部门id等
    //     const parameter={
    //       ...params
    //     }
    //     editJcx(parameter)
    //       .then((res)=>{
    //         resolve(res)
    //       })
    //   })
    // },
    // //删除检查项
    // delJcx:(store,params)=>{
    //   return new Promise((resolve, reject) => {
    //     //这里可以增加通用参数，如部门id等
    //     const parameter={
    //       ...params
    //     }
    //     delJcx(parameter)
    //       .then((res)=>{
    //         resolve(res)
    //       })
    //   })
    // },
  },

  getters:{
    qiye_xqqiye_list:(state) => {
      state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.xqqiye.list
    },
    getXqqiyeById:(state)=>(id)=> {
      return state.xqqiye.list.find( todo=> todo.id==id)
    },
    // jxgl_jcx_selOptions:(state)=>{
    //   const selOptions={}
    //   state.jcx.selectedOptions.forEach(option=>{
    //     selOptions[option.name]=[]
    //     if(option.value&&option.value.length>0){option.value.forEach(item=>{
    //       selOptions[option.name].push({label:item.label,value:item.value})
    //     })}
    //   })
    //   return selOptions
    // },
  }
}

export default jixiao