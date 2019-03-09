import {GeneralQuery,GeneralPostQuery,reqZfjcbDetail,rmFile,createJcDetail,createFcDetail,reqJcjlDetail,reqJcxx,exportWord,downloadExportFile} from './api'
import message from 'ant-design-vue/es/message'
const jiancazhifa = {
  state:{
    jcList:{list:[],selectedOptions:[]},
    jcbList:{list:[],info:{},jcjllist:[]},
    jcjlList:{list:[],info:{},jcjllist:[]},
    fcList:{list:[],info:{}},
    zfList:{list:[],info:{}}
  },
  mutations: {
    INIT_JCZF_JCLIST: (state, payload) => {
      state.jcList.list=payload
    },
    INIT_JCZF_JCSELECTED_OPTIONS: (state, payload) => {
      state.jcList.selectedOptions=payload
    },
    INIT_JCZF_JCBLIST: (state, payload) => {
      state.jcbList.list=payload
    },
    INIT_JCZF_QYJCJLLIST: (state, payload) => {
      state.jcbList.jcjllist=payload
    },
    INIT_JCZF_QYJCB: (state, payload) => {
      state.jcbList.info=payload
    },
    INIT_JCZF_JCJLLIST: (state, payload) => {
      state.jcjlList.list=payload
    },
    INIT_JCZF_JCJLINFO: (state, payload) => {
      state.jcjlList.info=payload
    },
    INIT_JCZF_FCLIST: (state, payload) => {
      state.fcList.list=payload
    },
    INIT_JCZF_ZFLIST: (state, payload) => {
      state.zfList.list=payload
    },
  },

  actions: {
    //查询检查列表
    reqJcList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350020.pc',
          param1:sys_relateDepId5,
          param2:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCZF_JCLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询检查表列表
    // param1:选中企业的departmentId
    reqJcjcbList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350025',
          param2: sys_relateDepId2,
          limit: 100000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCZF_JCBLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //检查查询页面，查询所有检查记录列表
    reqJcjlList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350031',
          param1: sys_relateDepId5,
          limit: 100000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCZF_JCJLLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //查询检查记录列表
    // param1:选中企业的departmentId
    reqQyJcjlList:({commit},payload)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:payload.type=='jcYdDetail'?'S350026':'S350026.jd',
          param2: sys_relateDepId2,
          limit: 100000,
          ...payload.params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCZF_QYJCJLLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询检查记录详情
    reqJcjlDetail:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          limit: 100000,
          ...params
        }
        reqJcjlDetail(parameter)
          .then((res)=>{
            if(res.success){
              commit('INIT_JCZF_JCJLINFO',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询检查记录详情
    reqJcxxlDetail:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          limit: 100000,
          ...params
        }
        reqJcxx(parameter)
          .then((res)=>{
            if(res.success){
              // commit('INIT_JCZF_QYJCB',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //查询检查表模版的详情
    reqQyZfjcb:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          param2: sys_relateDepId2,
          limit: 100000,
          ...params
        }
        reqZfjcbDetail(parameter)
          .then((res)=>{
            if(res.success){
              commit('INIT_JCZF_QYJCB',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //查询检查人员列表
    reqJcryList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350027',
          param1: sys_relateDepId2,
          limit: 100000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //新增检查单详情
    createJcDetail:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          param1:sys_relateDepId2,
          ...params
        }
        createJcDetail(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //复查查询页面，查询所有需要复查的列表
    // param1: sys_relateDepId2
    // param2: 待复查开关
    // param3: 已复查开关
    reqFcjlList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350023',
          menuId: "10002075",
          param1: sys_relateDepId5,
          limit: 100000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCZF_FCLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //新增检查单复查详情
    createFcDetail:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createFcDetail(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //执法查询页面
    reqZfjlList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350030',
          // menuId: "10002075",
          param1: sys_relateDepId2,
          limit: 100000,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_JCZF_ZFLIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },
    //删除上传文件
    removeFile:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          param2:2,
          ...params
        }
        rmFile(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //导出检查单
    exportJcDetail:(store,params)=>{
  return new Promise((resolve, reject) => {
    //这里可以增加通用参数，如部门id等
    const parameter={
      param1:'zfzgtemplate',
      ...params
    }
    exportWord(parameter)
      .then((res)=>{
        resolve(res)
      })
  })
},

    //下载导出的检查单
    downloadJcDetailFile:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        downloadExportFile(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
  },

  getters:{
    jczf_jc_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.jcList.list
    },
    jczf_jcjl_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.jcjlList.list
    },
    jczf_jcjl_info:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.jcjlList.info
    },
    jczf_fcjl_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.fcList.list
    },
    jczf_zf_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.zfList.list
    },
    getJcById:(state)=>(id)=> {
      return state.jcList.list.find( todo=> todo.id==id)
    },
    getJcjlById:(state)=>(id)=> {
      return state.jcjlList.list.find( todo=> todo.id==id)
    },
    getFcjlById:(state)=>(id)=> {
      return state.fcList.list.find( todo=> todo.id==id)
    },
    getZfById:(state)=>(id)=> {
      return state.zfList.list.find( todo=> todo.id==id)
    },
    jczf_jcb_list:(state) => {
      // state.jcx.list.forEach(item=>item.departName=item.__ddepartmentid.departName)
      return state.jcbList.list
    },
    jczf_jc_selOptions:(state)=>{
      const selOptions={}
      state.jcList.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },
  }
}

export default jiancazhifa