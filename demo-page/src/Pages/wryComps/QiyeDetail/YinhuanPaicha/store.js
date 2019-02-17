import {GeneralQuery,GeneralPostQuery} from './api'
import message from 'ant-design-vue/es/message'
const yinhuanpaicha = {
  state:{
    pcqdList:[],     //排查清单
    yhjlList:[],     //隐患记录

  },
  mutations: {
    INIT_PCQD_LIST: (state, payload) => {
      state.pcqdList=payload
    },
    INIT_YHJL_LIST: (state, payload) => {
      state.yhjlList=payload
    },
  },
  actions: {
    // //查询排查清单列表
    reqPcqdList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S620047.depart',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_PCQD_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    // //查询隐患记录列表
    reqYhjlList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S320181',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_YHJL_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    // //修改企业Gps信息
    // editXqqyGps:(store,params)=>{
    //   return new Promise((resolve, reject) => {
    //     //这里可以增加通用参数，如部门id等
    //     const parameter={
    //       ...params
    //     }
    //     editXqqyGps(parameter)
    //       .then((res)=>{
    //         resolve(res)
    //       })
    //   })
    // },
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

    get_pcqd_list:(state) => {
      state.pcqdList.forEach((item,index)=>{
        item.index=index+1
        // item.departName=item.__ddepartmentId.departName
      })
      return state.pcqdList
    },
    get_yhjl_list:(state) => {
      state.yhjlList.forEach((item,index)=>{
        item.index=index+1
        item.departName=item.__ddepartmentId.departName
        item.userName=item.__ufzUser.userName
      })
      return state.yhjlList
    },

    // getXqqiyeById111:(state)=>(id)=> {
    //   return state.xqqiye.list.find( todo=> todo.id==id)
    // },
    // jxgl_jcx_selOptions111:(state)=>{
    //   const selOptions={}
    //   state.xqqiye.selectedOptions.forEach(option=>{
    //     selOptions[option.name]=[]
    //     if(option.value&&option.value.length>0){option.value.forEach(item=>{
    //       selOptions[option.name].push({label:item.label,value:item.value})
    //     })}
    //   })
    //   return selOptions
    // },
  }
}

export default yinhuanpaicha