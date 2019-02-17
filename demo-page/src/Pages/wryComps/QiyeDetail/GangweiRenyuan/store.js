import {GeneralQuery,GeneralPostQuery} from './api'
import message from 'ant-design-vue/es/message'
const gangweirenyuan = {
  state:{
    gangweiList:[],     //岗位
    renyuanList:[],    //人员
    chizhengList:[],   //持证人员
    qingdanLsit:[],     //岗位清单
    peixunList:[],     //培训
  },
  mutations: {
    INIT_GWRY_GWLIST: (state, payload) => {
      state.gangweiList=payload
    },
    INIT_GWRY_RYLIST: (state, payload) => {
      state.renyuanList=payload
    },
    INIT_GWRY_CZLIST: (state, payload) => {
      state.chizhengList=payload
    },
    INIT_GWRY_QDLIST:(state, payload) => {
      state.qingdanLsit=payload
    },
    INIT_GWRY_PXLIST:(state, payload) => {
      state.peixunList=payload
    },
  },
  actions: {
    // //查询岗位列表
    reqGangweiList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610059',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GWRY_GWLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    // //查询企业人员列表
    reqRenyuanList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610051',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GWRY_RYLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    // 查询企业持证人员列表
    reqChizhengList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610050',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GWRY_CZLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    // //查询企业岗位清单列表
    reqGwqdList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610075',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GWRY_QDLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    // //查询企业培训列表
    reqPeixunList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610055',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GWRY_PXLIST',res.data)
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

    get_gwry_gwlist:(state) => {
      state.gangweiList.forEach((item,index)=>{
        item.index=index+1
        item.departName=item.__ddepartmentId.departName
      })
      return state.gangweiList
    },
    get_gwry_rylist:(state) => {
      state.renyuanList.forEach((item,index)=>{
        item.index=index+1
        item.departName=item.__ddepartmentId.departName
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.renyuanList
    },
    get_gwry_czrylist:(state) => {
      state.chizhengList.forEach((item,index)=>{
        item.index=index+1
        item.departName=item.__ddepartmentId.departName
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.chizhengList
    },
    get_gwry_gwqdlist:(state) => {
      state.qingdanLsit.forEach((item,index)=>{
        item.index=index+1
        // item.departName=item.__ddepartmentId.departName
        // item.uchangeuser=item.__uchangeuser.userName
        // item.uaudituser=item.__uaudituser.userName
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.qingdanLsit
    },
    get_gwry_pxlist:(state) => {
      state.peixunList.forEach((item,index)=>{
        // debugger
        item.index=index+1
        item.departName=item.__ddepartmentid.departName
        // item.uchangeuser=item.__uchangeuser.userName
        // item.uaudituser=item.__uaudituser.userName
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.peixunList
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

export default gangweirenyuan