import {GeneralQuery,GeneralPostQuery,queryZywsInfo,queryZybWhzlInfo,queryZybWhzlInfo111} from './api'
import message from 'ant-design-vue/es/message'
const zhiyeweisheng = {
  state:{
    zywsInfo:null,
    zybwhzl:{
      fc:{man:0,woman:0,total:0},
      hxw:{man:0,woman:0,total:0},
      wlys:{man:0,woman:0,total:0},
      fsxwz:{man:0,woman:0,total:0},
      swyh:{man:0,woman:0,total:0},
    },
    zybWhysFb:[],
    zyJkjh:null,
    zywsJsbz:[],
    zywsJcbg:[]
  },
  mutations: {
    INIT_ZYWS_INFO: (state, payload) => {
      state.zywsInfo=payload
    },
    INIT_ZYWS_ZYB_WHZL: (state, payload) => {
      state.zybwhzl[payload.type]=payload.data
    },
    INIT_ZYWS_ZYB_WHYSFB: (state, payload) => {
      state.zybWhysFb=payload
    },
    INIT_ZYWS_ZYJKJH:(state, payload) => {
      state.zyJkjh=payload
    },
    INIT_ZYWS_JSBZ:(state, payload) => {
      state.zywsJsbz=payload
    },
    INIT_ZYWS_JCBG:(state, payload) => {
      state.zywsJcbg=payload
    },
  },
  actions: {
    //查询职业卫生信息
    queryZywsInfo:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          ...params
        }
        queryZywsInfo(parameter)
          .then((res)=>{
            if(res.success){
              commit('INIT_ZYWS_INFO',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询职业危害因素分类信息
    queryZybWhzl:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const reqType={
          fc:'粉尘',
          hxw:'化学物质类',
          wlys:'物理因素',
          fsxwz:'放射性物质类',
          swyh:null
        }

        for (let key in reqType){
          const parameter=reqType[key]
          ?{param2:encodeURI(reqType[key]),
            ...params}
          :{...params}
          queryZybWhzlInfo(parameter)
            .then((res)=>{
              if(res.success){
                let payload={
                  type:key,
                  data:{
                    man:res.data[0].nan ? res.data[0].nan :0,
                    woman:res.data[0].nv ? res.data[0].nv :0,
                    total:0
                  },
                }
                payload.data.total = payload.data.man+payload.data.woman
                commit('INIT_ZYWS_ZYB_WHZL',payload)
                resolve(res)
              }else{
                message.error(res.message)
              }
            })
        }
        const parameter={...params}
        queryZybWhzlInfo111(parameter)
          .then((res)=>{
            if(res.success){
              let payload={
                type:'swyh',
                data:{
                  man:res.data[0].nan ? res.data[0].nan :0,
                  woman:res.data[0].nv ? res.data[0].nv :0,
                  total:0
                },
              }
              payload.data.total = payload.data.man+payload.data.woman
              commit('INIT_ZYWS_ZYB_WHZL',payload)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    // //查询职业危害因素分布列表
    reqzZybWhysFbList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S620101',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_ZYWS_ZYB_WHYSFB',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //
    // 查询职业卫生警示标识告知卡列表
    reqJsbzList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S620100',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_ZYWS_JSBZ',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    // 查询检查报告列表
    reqJcbgList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S610086',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_ZYWS_JCBG',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //
    // // //查询企业变更信息列表
    // reqQyBgxxList:({commit},params)=>{
    //   return new Promise((resolve, reject) => {
    //     const parameter={
    //       sqlId:'S610063',
    //       ...params
    //     }
    //     GeneralQuery(parameter)
    //       .then((res)=>{
    //         if(res.success){
    //           res.data.forEach((item)=>{
    //             item.key=item.id
    //           })
    //           commit('INIT_QYINFO_BGXX',res.data)
    //           resolve(res)
    //         }else{
    //           message.error(res.message)
    //         }
    //       })
    //   })
    // },


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
    get_zyws_info:(state)=>{
      return state.zywsInfo
    },
    get_zyws_zybwhzl:(state) => {
      return state.zybwhzl
    },
    get_zyws_zybWhysFb:(state)=>{
      state.zybWhysFb.forEach((item,index)=>{
        item.index=index+1
        // item.departName=item.__ddepartmentId.departName
      })
      return state.zybWhysFb
    },
    get_zyws_zyJkjh:(state) => {

      return state.zyJkjh
    },
    get_zyws_jsbz:(state) => {
      state.zywsJsbz.forEach((item,index)=>{
        item.index=index+1
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.zywsJsbz
    },
    get_zyws_jcbg:(state) => {
      state.zywsJcbg.forEach((item,index)=>{
        item.index=index+1
        item.departName=item.__ddepartmentId.departName
      })
      // state.xqqiye.list.forEach(item=>item.departName=item.departName)
      return state.zywsJcbg
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

export default zhiyeweisheng