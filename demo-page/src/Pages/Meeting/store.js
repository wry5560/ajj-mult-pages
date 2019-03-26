import {GeneralQuery,GeneralPostQuery,createHy,editHy,delHy,endhy,} from './api'
import message from 'ant-design-vue/es/message'
const meeting = {
  state:{
    meeting:{list:[],selectedOptions:[]},

  },
  mutations: {

    INIT_MEETING_LIST: (state, payload) => {
      state.meeting.list=payload
    },

    INIT_MEETING_SELECTED_OPTIONS:(state,payload)=>{
      state.meeting.selectedOptions=payload
    },

  },
  actions: {

    //-------------------------------------------------------------------------- 会议管理页面Actions--------------------------------------------------------------------------------

    //查询工作录入列表
    // menuId: sys_menuId
    // param1: sys_relateDepId2
    // sqlId: "S420001"
    reqMeethinList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S420001',
          param1:sys_relateDepId2,
          ...params
        }
        GeneralPostQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item)=>{
                item.key=item.id
              })
              commit('INIT_MEETING_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    //新增会议
    // jsonData
    createHy:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createHy(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改工作信息
    editHy:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editHy(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //删除工作
    delHy:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delHy(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

    //结束会议
    endhy:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        endhy(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

  },

  getters:{
    meeting_list:(state) => {
      state.meeting.list.forEach(item=>{
        // item.fzr=item.__ufzr.userName
        item.departmentid=item.__ddepartmentid.departId
        // item.ssbm=item.__dssbm.departName
      })
      return state.meeting.list
    },
    getMeetingById:(state)=>(id)=> {
      return state.meeting.list.find( todo=> todo.id==id)
    },
    meeting_selOptions:(state)=>{
      const selOptions={}
      state.meeting.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

  }
}

export default meeting