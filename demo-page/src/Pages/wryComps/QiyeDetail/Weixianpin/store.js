import {GeneralQuery,GeneralPostQuery} from './api'
import message from 'ant-design-vue/es/message'
const weixianpin = {
  state:{
    wxpList:[],     //危险品

  },
  mutations: {
    INIT_WXP_LIST: (state, payload) => {
      state.wxpList=payload
    },
  },
  actions: {
    // //查询危险品列表
    reqQyWxpList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610056',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_WXP_LIST',res.data)
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

    get_wxp_list:(state) => {
      state.wxpList.forEach((item,index)=>{
        item.index=index+1
        // item.departName=item.__ddepartmentId.departName
      })
      return state.wxpList
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

export default weixianpin