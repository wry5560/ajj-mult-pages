import {GeneralQuery,GeneralPostQuery,guiDang} from './api'
import message from 'ant-design-vue/es/message'
const guidang = {
  state:{
    jcList:{list:[],selectedOptions:[]},
    sgkbList:{list:[],selectedOptions:[]},
    workList:{list:[],selectedOptions:[]},
    ajywList:{list:[],selectedOptions:[]},

  },
  mutations: {
    INIT_GD_JCLIST: (state, payload) => {
      state.jcList.list=payload
    },
    INIT_GD_SGKBLIST: (state, payload) => {
      state.sgkbList.list=payload
    },
    INIT_GD_WORKLIST: (state, payload) => {
      state.workList.list=payload
    },
    INIT_GD_AJYWLIST: (state, payload) => {
      state.ajywList.list=payload
    },
  },

  actions: {
    //查询归档检查列表
    // param2: state(状态，一般情况未归档：【办结】状态，归档为【归档】状态)
    reqGdJcList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S410001',
          param1:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GD_JCLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询归档事故快报列表
    // parma1:departmentId(二级部门)
    // param2：是否为事故上报
    // param3：是否为续报
    // Param4:state(状态，一般情况未归档：【办结】状态，归档为【归档】状态)

    reqGdSgkbList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S410002',
          param1:sys_relateDepId2,
          param2:1,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GD_SGKBLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询归档日常工作列表
    // parma1:departmentId(二级部门)
    // Param2:state(状态，一般情况未归档：【办结】状态，归档为【归档】状态)

    reqGdWorkList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S410003',
          param1:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GD_WORKLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询归档安监业务列表
    // parma1:state(状态，一般情况未归档：【办结】状态，归档为【归档】状态)

    reqGdAjywList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S410004',
          param1:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_GD_AJYWLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },


    //归档
    createGuidang:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          ...params
        }
        guiDang(parameter)
          .then((res)=>{
            resolve(res)
            // if(res.success){
              // res.data.forEach((item)=>{
              //   item.key=item.id
              // })
              // commit('INIT_GD_JCLIST',res.data)
            //   resolve(res)
            // }else{
            //   reject(res)
              // message.error(res.message)
            // }
          })
      })
    }
  },

  getters:{
    guidang_jc_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.jcList.list
    },
    guidang_sgkb_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.sgkbList.list
    },
    guidang_work_list:(state) => {
      state.workList.list.forEach(item=>{
        item.fzr=item.__ufzr.userName
        // item.departName=item.__ddepartmentId.departName
        item.ssbm=item.__dssbm.departName
      })
      return state.workList.list
    },
    guidang_ajyw_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.ajywList.list
    },



    // getZfById:(state)=>(id)=> {
    //   return state.zfList.list.find( todo=> todo.id==id)
    // },
    // jczf_jc_selOptions:(state)=>{
    //   const selOptions={}
    //   state.jcList.selectedOptions.forEach(option=>{
    //     selOptions[option.name]=[]
    //     if(option.value&&option.value.length>0){option.value.forEach(item=>{
    //       selOptions[option.name].push({label:item.label,value:item.value})
    //     })}
    //   })
    //   return selOptions
    // },
  }
}

export default guidang