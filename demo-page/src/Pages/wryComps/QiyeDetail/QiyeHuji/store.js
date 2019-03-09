import {GeneralQuery,GeneralPostQuery,queryQySfaq,queryAjdwInfoByDepart} from './api'
import message from 'ant-design-vue/es/message'
const qyhuji = {
  state:{
    qyInfo:{
      sfaq:null,
      info:{},     //基本信息
      },
    aqfzr:[],    //安全负责人
    aqglzd:[],   //企业安全管理制度
    qyzz:[],     //企业证照
    bgxx:[],     //变更信息
  },
  mutations: {
    INIT_QYINFO_SFAQ: (state, payload) => {
      state.qyInfo.sfaq=payload
    },
    INIT_QYINFO_INFO: (state, payload) => {
      state.qyInfo.info=payload
    },
    INIT_QYINFO_AQFZR: (state, payload) => {
      state.aqfzr=payload
    },
    INIT_QYINFO_AQGLZD:(state, payload) => {
      state.aqglzd=payload
    },
    INIT_QYINFO_QYZZ:(state, payload) => {
      state.qyzz=payload
    },
    INIT_QYINFO_BGXX:(state, payload) => {
      state.bgxx=payload
    },
  },
  actions: {
    //查询企业是否有安全生产信息
    queryQySfaq:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          // sqlId:'S610069.wg',
          // param2:sys_relateDepId2,
          ...params
        }
        queryQySfaq(parameter)
          .then((res)=>{
            if(res.success){
              res.data.length ==0? commit('INIT_QYINFO_SFAQ',false):commit('INIT_QYINFO_SFAQ',true)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    // 通过ID查询企业信息
    queryAjdwInfoByDepart:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          // sqlId:'S610069.wg',
          // param2:sys_relateDepId2,
          ...params
        }
        queryAjdwInfoByDepart(parameter)
          .then((res)=>{
            if(res.success){
              // res.data.forEach((item)=>{
              //   item.key=item.id
              // })
              commit('INIT_QYINFO_INFO',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    // //查询企业安全生产负责人列表
    reqQyAqfzrList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S620118.ajj',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QYINFO_AQFZR',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    // //查询企业安全生产管理制度列表
    reqQyAqglzdList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S620120.app',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QYINFO_AQGLZD',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    // //查询企业证照列表
    reqQyZzList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610019.ajj',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QYINFO_QYZZ',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    // //查询企业变更信息列表
    reqQyBgxxList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610063',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QYINFO_BGXX',res.data)
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
    get_qiye_info:(state)=>{
      return state.qyInfo.info
    },
    get_qiye_sfaq:(state)=>{
      return state.qyInfo.sfaq
    },
    get_qiye_aqfzr:(state) => {
      state.aqfzr.forEach((item,index)=>{
        item.index=index+1
        item.departName=item.__ddepartmentId.departName
      })
      return state.aqfzr
    },
    get_qiye_aqglzd:(state) => {
      state.aqglzd.forEach((item,index)=>{
        item.index=index+1
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.aqglzd
    },
    get_qiye_qyzz:(state) => {
      state.qyzz.forEach((item,index)=>{
        item.index=index+1
        item.departName=item.__ddepartmentId.departName
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.qyzz
    },
    get_qiye_bgxx:(state) => {
      state.bgxx.forEach((item,index)=>{
        item.index=index+1
        // item.departName=item.__ddepartmentId.departName
        item.uchangeuser=item.__uchangeuser.userName
        item.uaudituser=item.__uaudituser.userName
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.bgxx
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

export default qyhuji