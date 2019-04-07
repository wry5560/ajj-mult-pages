import {GeneralQuery,GeneralPostQuery,} from './api'
import message from 'ant-design-vue/es/message'
import moment from 'moment'
const query = {
  state:{
    qiyeQuery:{list:[],selectedOptions:[],searchVlaues:{},totalCount:null},
    qiyeZichaQuery:{list:[],selectedOptions:[],searchVlaues:{},totalCount:null},
    qiyeJcQuery:{list:[],selectedOptions:[],searchVlaues:{},totalCount:null},
  },
  mutations: {

    INIT_QUERY_QIYE_LIST: (state, payload) => {
      state.qiyeQuery.list=payload.data
      state.qiyeQuery.totalCount=payload.totalCount
    },
    INIT_QUERY_QIYE_SELECTED_OPTIONS:(state,payload)=>{
      state.qiyeQuery.selectedOptions=payload
    },
    INIT_QUERY_QIYE_SEARCHVALUES:(state, payload) => {
      state.qiyeQuery.searchVlaues=payload
    },
    CLEAR_QUERY_QIYE_SEARCHVALUES:(state) => {
      state.qiyeQuery.searchVlaues={}
    },
    INIT_QUERY_QIYEZICHA_LIST: (state, payload) => {
      state.qiyeZichaQuery.list=payload.data
      state.qiyeZichaQuery.totalCount=payload.totalCount
    },
    INIT_QUERY_QIYEZICHA_SELECTED_OPTIONS:(state,payload)=>{
      state.qiyeZichaQuery.selectedOptions=payload
    },
    INIT_QUERY_QIYEZICHA_SEARCHVALUES:(state, payload) => {
      state.qiyeZichaQuery.searchVlaues=payload
    },
    CLEAR_QUERY_QIYEZICHA_SEARCHVALUES:(state) => {
      state.qiyeZichaQuery.searchVlaues={}
    },
    INIT_QUERY_QIYEJC_LIST: (state, payload) => {
      state.qiyeJcQuery.list=payload.data
      state.qiyeJcQuery.totalCount=payload.totalCount
    },
    INIT_QUERY_QIYEJC_SELECTED_OPTIONS:(state,payload)=>{
      state.qiyeJcQuery.selectedOptions=payload
    },
    INIT_QUERY_QIYEJC_SEARCHVALUES:(state, payload) => {
      state.qiyeJcQuery.searchVlaues=payload
    },
    CLEAR_QUERY_QIYEJC_SEARCHVALUES:(state) => {
      state.qiyeJcQuery.searchVlaues={}
    },
  },
  actions: {

    //-------------------------------------------------------------------------- 企业查询Actions--------------------------------------------------------------------------------

    //企业查询
    //
    // param1-9 分别为：单位名称、单位地址、企业类型、企业类型2、国名经济类型、国名经济类型2、国名经济类型3、国名经济类型4、工贸行业类型
    // sqlId: "S430001"
    reqQiyeQueryList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S430001',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QUERY_QIYE_LIST',res)
              resolve(res)
            }else{
              resolve(res)
            }
          })
      })
    },


    //-------------------------------------------------------------------------- 企业自查查询Actions--------------------------------------------------------------------------------
    //企业自查查询 企业列表
    //
    // param1:开始时间、param2:结束时间、param3-param11分别为：单位名称、单位地址、企业类型、企业类型2、国名经济类型、国名经济类型2、国名经济类型3、国名经济类型4、工贸行业类型
    // sqlId: "S430002"
    reqQiyeZichaQueryList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S430002',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QUERY_QIYEZICHA_LIST',res)
              resolve(res)
            }else{
              resolve(res)
            }
          })
      })
    },
    //企业排查信息查询
    //
    // param1：企业部门编号、param2:工单类型（16：风险排查、17：岗位排查）、param3:是否完成、param4:开始时间、param5:结束时间、param6-param14分别为：单位名称、单位地址、企业类型、企业类型2、国名经济类型、国名经济类型2、国名经济类型3、国名经济类型4、工贸行业类型
    // sqlId: "S430003"
    reqQiyeZichaInfoList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S430003',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QUERY_QIYEZICHA_LIST',res)
              resolve(res)
            }else{
              resolve(res)
            }
          })
      })
    },
    //企业隐患列表 查询
    //
    // 参数：param1：企业部门编号、param2:是否完成、param3:开始时间、param4:结束时间、param5-param13分别为：单位名称、单位地址、企业类型、企业类型2、国名经济类型、国名经济类型2、国名经济类型3、国名经济类型4、工贸行业类型
    // sqlId: "S430004"
    reqQiyeZichaYinhuanList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S430004',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QUERY_QIYEZICHA_LIST',res)
              resolve(res)
            }else{
              resolve(res)
            }
          })
      })
    },

    //-------------------------------------------------------------------------- 企业检查Actions--------------------------------------------------------------------------------
    //企业自查查询 企业列表
    //
    // 参数：param1：安监二级部门、param2:开始时间、param3:结束时间、param4-param14分别为：单位名称、单位地址、企业类型、企业类型2、国名经济类型、国名经济类型2、国名经济类型3、国名经济类型4、工贸行业类型、检查人员、复查人员
    // sqlId: "S430005"
    reqQiyeJcQueryList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S430005',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QUERY_QIYEJC_LIST',res)
              resolve(res)
            }else{
              resolve(res)
            }
          })
      })
    },
    //企业排查信息查询
    //
    // 参数：param1：安监二级部门、param2:开始时间、param3:结束时间、param4:是否复查、param5-param13分别为：单位名称、单位地址、企业类型、企业类型2、国名经济类型、国名经济类型2、国名经济类型3、国名经济类型4、工贸行业类型 param14:检查人员、param15:复查人员
    // sqlId: "S430006"
    reqQiyeJcInfoList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S430006',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.jcid
              })
              commit('INIT_QUERY_QIYEJC_LIST',res)
              resolve(res)
            }else{
              resolve(res)
            }
          })
      })
    },
    //企业隐患列表 查询
    //
    // 参数：param1：安监二级部门、param2:开始时间、param3:结束时间、param4:复查结果、param5-param13分别为：单位名称、单位地址、企业类型、企业类型2、国名经济类型、国名经济类型2、国名经济类型3、国名经济类型4、工贸行业类型
    // sqlId: "S430007"
    reqQiyeJcYinhuanList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S430007',
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_QUERY_QIYEJC_LIST',res)
              resolve(res)
            }else{
              resolve(res)
            }
          })
      })
    },


  },

  getters:{
    //-------------------------------------------------------------------------- 企业查询getters--------------------------------------------------------------------------------
    query_qiye_list:(state) => {
      state.qiyeQuery.list.forEach(item=>{
        // item.fzr=item.__ufzr.userName
        // item.departName=item.__ddepartmentId.departName
        // item.ssbm=item.__dssbm.departName
      })
      return state.qiyeQuery.list
    },
    query_qiye_totalCount:(state) => {
      return state.qiyeQuery.totalCount
    },
    getQiyeQueryDetailById:(state)=>(id)=> {
      return state.qiyeQuery.list.find( todo=> todo.id==id)
    },
    getQiyeSearchValues:(state)=>(id)=> {
      return state.qiyeQuery.searchVlaues
    },
    query_qiye_selOptions:(state)=>{
      const selOptions={}
      state.qiyeQuery.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

    //-------------------------------------------------------------------------- 企业自查getters--------------------------------------------------------------------------------
    query_qiyezicha_list:(state) => {
      state.qiyeZichaQuery.list.forEach(item=>{
        // item.fzr=item.__ufzr.userName
        // item.departName=item.__ddepartmentId.departName
        // item.ssbm=item.__dssbm.departName
      })
      return state.qiyeZichaQuery.list
    },
    query_qiyezicha_totalCount:(state) => {
      return state.qiyeZichaQuery.totalCount
    },
    getQiyeZichaQueryDetailById:(state)=>(id)=> {
      return state.qiyeZichaQuery.list.find( todo=> todo.id==id)
    },
    getQiyeZiChaSearchValues:(state)=>(id)=> {
      return state.qiyeZichaQuery.searchVlaues
    },
    query_qiyezicha_selOptions:(state)=>{
      const selOptions={}
      state.qiyeZichaQuery.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

    //-------------------------------------------------------------------------- 企业检查getters--------------------------------------------------------------------------------
    query_qiyejc_list:(state) => {
      state.qiyeJcQuery.list.forEach(item=>{
        // item.fzr=item.__ufzr.userName
        // item.departName=item.__ddepartmentId.departName
        // item.ssbm=item.__dssbm.departName
      })
      return state.qiyeJcQuery.list
    },
    query_qiyejc_totalCount:(state) => {
      return state.qiyeJcQuery.totalCount
    },
    getQiyeJcQueryDetailById:(state)=>(id)=> {
      return state.qiyeJcQuery.list.find( todo=> todo.id==id)
    },
    getQiyeJcSearchValues:(state)=>(id)=> {
      return state.qiyeJcQuery.searchVlaues
    },
    query_qiyejc_selOptions:(state)=>{
      const selOptions={}
      state.qiyeJcQuery.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

  }
}

export default query