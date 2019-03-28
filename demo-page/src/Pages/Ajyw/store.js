import {GeneralQuery,GeneralPostQuery,createWork,editWork,delWork,fabuWork,qxfbWork,reqWorkDetail,editWorkNycd,fenpeiWork,editMyWork} from './api'
import message from 'ant-design-vue/es/message'
const jixiao = {
  state:{
    addWork:{list:[],selectedOptions:[]},
    zrwList:{},
    arrageWork:{list:[],selectedOptions:[],selList:[]},
    difficultyWork:{list:[],selectedOptions:[],selList:[],},
    myWork:{list:[],selectedOptions:[],selList:[],},
  },
  mutations: {

    INIT_AJYW_ADD_LIST: (state, payload) => {
      state.addWork.list=payload
    },
    INIT_AJYW_ADD_ZRW:(state, payload) => {
      state.zrwList[payload.pid]=payload.zrwList
    },
    INIT_AJYW_ADD_SELECTED_OPTIONS:(state,payload)=>{
      state.addWork.selectedOptions=payload
    },
    INIT_AJYW_ARRAGE_LIST: (state, payload) => {
      state.arrageWork.list=payload
    },
    INIT_AJYW_ARRAGE_SELECTED_OPTIONS:(state,payload)=>{
      state.arrageWork.selectedOptions=payload
    },
    INIT_AJYW_DIFFICULT_LIST: (state, payload) => {
      state.difficultyWork.list=payload
    },
    INIT_AJYW_DIFFICULT_SELECTED_OPTIONS:(state,payload)=>{
      state.difficultyWork.selectedOptions=payload
    },
    INIT_AJYW_MYWORK_LIST: (state, payload) => {
      state.myWork.list=payload
    },

  },
  actions: {

    //-------------------------------------------------------------------------- 工作录入页面Actions--------------------------------------------------------------------------------

    //查询工作录入列表
    // menuId: sys_menuId
    // param1: sys_relateDepId2
    // sqlId: "S380001"
    reqAddWorkList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S380001',
          menuId:sys_menuId,
          param1:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_AJYW_ADD_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //查询工作子任务列表
    // menuId: sys_menuId
    // param1: sys_relateDepId2
    // sqlId: "S380001"
    reqZrwList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S380001',
          menuId:sys_menuId,
          param1:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
              })
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //新增工作
    // jsonData: "{"hzly":"会议","gznr":"这个就是测试","ssbm":9361,"fzr":"","remark":"这个就是测试这个就是测试"}"
    createAddWork:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createWork(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改工作信息
    editWork:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editWork(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //删除工作
    delWork:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delWork(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //发布工作
    fabuWork:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        fabuWork(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //取消发布工作
    qxfbWork:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        qxfbWork(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },


    //-------------------------------------------------------------------------- 难易程度调整页面Actions--------------------------------------------------------------------------------

    //查询工作详情
    // param1: item.id,
    // param3:'',
    // limit: 100000
    reqWorkDetail:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          param3:'',
          limit: 100000,
          ...params
        }
        reqWorkDetail(parameter)
          .then((res)=> {
            resolve(res)
          })
      })
    },
    //调整工作难易程度
// param1: item.id,
// param2: item.nycd

    editWorkNycd:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          param3:'',
          limit: 100000,
          ...params
        }
        editWorkNycd(parameter)
          .then((res)=> {
            resolve(res)
          })
      })
    },

    //-------------------------------------------------------------------------- 工作分配页面Actions--------------------------------------------------------------------------------
    //查询工作分配列表
    // menuId: sys_menuId
    // param1: sys_relateDepId2
    // param2: "1"        //未分配
    // param3: ""         //已分配
    // sqlId: "S380004"
    reqArrageWorkList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S380004',
          menuId:sys_menuId,
          param1:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_AJYW_ARRAGE_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询负责人选择项列表
    // sqlId: S380002
    // param1: 9361
    // limit: 100000

    reqFzrList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId: 'S380002',
          param1:departmentId,
          limit: 100000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=> {
            resolve(res)
          })
      })
    },

    //工作分配
    // param1: item.id
    // param3: 3068
    // param4: item.jhwctime

    fenpeiWork:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          ...params
        }
        fenpeiWork(parameter)
          .then((res)=> {
            resolve(res)
          })
      })
    },

    //-------------------------------------------------------------------------- 我的工作页面Actions--------------------------------------------------------------------------------
    //查询我的列表
    // menuId: sys_menuId
    // param1: "1"        //未完成
    // param2: ""         //已完成
    // sqlId: "S380005"
    reqMyWorkList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S380005',
          menuId:sys_menuId,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_AJYW_MYWORK_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    editMyWork:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          ...params
        }
        editMyWork(parameter)
          .then((res)=> {
            resolve(res)
          })
      })
    },
  },

  getters:{
    ajyw_work_list:(state) => {
      state.addWork.list.forEach(item=>{
        item.fzr=item.__ufzr.userName
        item.departName=item.__ddepartmentId.departName
        item.ssbm=item.__dssbm.departName
      })
      return state.addWork.list
    },
    getWorkById:(state)=>(id)=> {
      return state.addWork.list.find( todo=> todo.id==id)
    },
    ajyw_work_selOptions:(state)=>{
      const selOptions={}
      state.addWork.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

    ajyw_difficulty_selOptions:(state)=>{
      const selOptions={}
      state.difficultyWork.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

    ajyw_arrage_list:(state) => {
      state.arrageWork.list.forEach(item=>{
        item.fzr=item.__ufzr.userName
        // item.departName=item.__ddepartmentId.departName
        item.ssbm=item.__dssbm.departName
      })
      return state.arrageWork.list
    },
    getArrageWorkById:(state)=>(id)=> {
      return state.arrageWork.list.find( todo=> todo.id==id)
    },
    ajyw_arrage_selOptions:(state)=>{
      const selOptions={}
      state.arrageWork.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

    ajyw_mywork_list:(state) => {
      state.myWork.list.forEach(item=>{
        item.fzr=item.__ufzr.userName
        // item.departName=item.__ddepartmentId.departName
        item.ssbm=item.__dssbm.departName
      })
      return state.myWork.list
    },

    getMyWorkById:(state)=>(id)=> {
      return state.myWork.list.find( todo=> todo.id==id)
    },

    getZrwById:(state)=>(pid,id)=> {
      return state.zrwList[pid].find( todo=> todo.id==id)
    },
  }
}

export default jixiao