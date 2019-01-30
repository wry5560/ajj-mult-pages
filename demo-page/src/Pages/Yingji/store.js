import {GeneralQuery,createWz,editWz,delWz,createZb,editZb,delZb,createTeam,editTeam,delTeam,createPlace,editPlace,delPlace,createZs,editZs,delZs,createZj,editZj,delZj} from './api'
import message from 'ant-design-vue/es/message'
const yingji = {
  state:{
    wz:{list:[],selectedOptions:[]},
    team:{list:[],selectedOptions:[]},
    zb:{list:[],selectedOptions:[]},
    place:{list:[],selectedOptions:[]},
    zhuanjia:{list:[],selectedOptions:[]},
    zhishi:{list:[],selectedOptions:[]},
    yuan:{list:[],selectedOptions:[]},
    yanlian:{list:[],selectedOptions:[]},
  },
  mutations: {

    INIT_WZ_LIST: (state, payload) => {
      state.wz.list=payload
    },
    INIT_ZB_LIST: (state, payload) => {
      state.zb.list=payload
    },
    INIT_TEAM_LIST: (state, payload) => {
      state.team.list=payload
    },
    INIT_PLACE_LIST: (state, payload) => {
      state.place.list=payload
    },
    INIT_ZJ_LIST: (state, payload) => {
      state.zhuanjia.list=payload
    },
    INIT_ZS_LIST: (state, payload) => {
      state.zhishi.list=payload
    },

    INIT_WZ_SELECTED_OPTIONS:(state,payload)=>{
      state.wz.selectedOptions=payload
    },
    INIT_ZB_SELECTED_OPTIONS:(state,payload)=>{
      state.zb.selectedOptions=payload
    },
    INIT_TEAM_SELECTED_OPTIONS:(state,payload)=>{
      state.team.selectedOptions=payload
    },
    INIT_PLACE_SELECTED_OPTIONS:(state,payload)=>{
      state.place.selectedOptions=payload
    },
    INIT_ZJ_SELECTED_OPTIONS:(state,payload)=>{
      stjate.zhuanjia.selectedOptions=payload
    },
    INIT_ZS_SELECTED_OPTIONS:(state,payload)=>{
      state.zhishi.selectedOptions=payload
    },
  },
  actions: {
    //查询物资列表
    reqWzList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S370002',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach(item=>item.key=item.id)
              commit('INIT_WZ_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增物资
    createYjwz:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createWz(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改物资信息
    editYjwz:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editWz(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //删除物资
    delYjwz:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delWz(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //查询装备列表
    reqZbList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S370003',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach(item=>item.key=item.id)
              commit('INIT_ZB_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增装备
    createYjzb:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createZb(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改装备信息
    editYjzb:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editZb(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //删除装备
    delYjzb:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delZb(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //查询应急队伍列表
    reqTeamList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S370004',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach(item=>item.key=item.id)
              commit('INIT_TEAM_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增应急队伍
    createTeam:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createTeam(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改应急队伍
    editTeam:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editTeam(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //删除应急队伍
    delTeam:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delTeam(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //查询避难场所列表
    reqPlaceList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S370001',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach(item=>item.key=item.id)
              commit('INIT_PLACE_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增避难场所
    createPlace:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createPlace(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改避难场所
    editPlace:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editPlace(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //删除避难场所
    delPlace:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delPlace(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //查询专家列表
    reqZjList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S370005',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach(item=>item.key=item.id)
              commit('INIT_ZJ_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增专家
    createYjzj:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createZj(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改专家
    editYjzj:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editZj(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //删除专家
    delYjzj:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delZj(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //查询知识库列表
    reqZsList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S370006',
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach(item=>item.key=item.id)
              commit('INIT_ZS_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增知识
    createYjzs:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createZs(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改知识
    editYjzs:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editZs(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //删除知识
    delYjzs:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delZs(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

  },
  getters:{
    yingji_wz_list:state => state.wz.list,
    getWzById:(state)=>(id)=> {
      return state.wz.list.find( todo=> todo.id==id)
    },
    yingji_wz_selOptions:(state)=>{
      const selOptions={}
      state.wz.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        option.value.forEach(item=>{
          selOptions[option.name].push(item.label)
        })
      })
      return selOptions
    },

    yingji_zb_list:state => state.zb.list,
    getZbById:(state)=>(id)=> {
      return state.zb.list.find( todo=> todo.id==id)
    },
    yingji_zb_selOptions:(state)=>{
      const selOptions={}
      state.zb.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        option.value.forEach(item=>{
          selOptions[option.name].push(item.label)
        })
      })
      return selOptions
    },

    yingji_team_list:state => state.team.list,
    getTeamById:(state)=>(id)=> {
      return state.team.list.find( todo=> todo.id==id)
    },
    yingji_Team_selOptions:(state)=>{
      const selOptions={}
      state.team.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        option.value.forEach(item=>{
          selOptions[option.name].push(item.label)
        })
      })
      return selOptions
    },

    yingji_place_list:state => state.place.list,
    getPlaceById:(state)=>(id)=> {
      return state.place.list.find( todo=> todo.id==id)
    },
    yingji_Place_selOptions:(state)=>{
      const selOptions={}
      state.place.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        option.value.forEach(item=>{
          selOptions[option.name].push(item.label)
        })
      })
      return selOptions
    },

    yingji_zj_list:state => state.zhuanjia.list,
    getZjById:(state)=>(id)=> {
      return state.zhuanjia.list.find( todo=> todo.id==id)
    },
    yingji_zj_selOptions:(state)=>{
      const selOptions={}
      state.zhuanjia.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        option.value.forEach(item=>{
          selOptions[option.name].push(item.label)
        })
      })
      return selOptions
    },

    yingji_zs_list:state => state.zhishi.list,
    getZsById:(state)=>(id)=> {
      return state.zhishi.list.find( todo=> todo.id==id)
    },
    yingji_zs_selOptions:(state)=>{
      const selOptions={}
      state.zhishi.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        option.value.forEach(item=>{
          selOptions[option.name].push(item.label)
        })
      })
      return selOptions
    },
  }
}

export default yingji