import {GeneralQuery,createKbshry,editKbshry,delKbshry} from './api'
import message from 'ant-design-vue/es/message'
const peizhi = {
  state:{
    kuaibaoShry:{list:[],selectedOptions:[]},

  },
  mutations: {

    INIT_KBSHRY_LIST: (state, payload) => {
      state.kuaibaoShry.list=payload
    },

    INIT_KBSHRY_SELECTED_OPTIONS:(state,payload)=>{
      state.kuaibaoShry.selectedOptions=payload
    },

  },
  actions: {
    //查询快报审核人员列表
    reqKbshryList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S360010',
          param1:sys_relateDepId2,
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            if(res.success){
              res.data.forEach((item,index)=>{
                item.key=item.id
                item.index=index+1
              })
              commit('INIT_KBSHRY_LIST',res.data)
              resolve(res)
            }else{
              message.error(res.message)
            }
          })
      })
    },

    reqNameList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S360004',
          param1:sys_relateDepId2,
          limit:10000,
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
              resolve(res)
          })
      })
    },
    reqDepartmentList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350006.wg',
          param2:sys_relateDepId5,
          limit:10000,
          ...params
        }
        GeneralQuery(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //新增快报审核人员
    createKbshry:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createKbshry(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //修改快报审核人员
    editKbshry:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        editKbshry(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },
    //删除快报审核人员
    delKbshry:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        delKbshry(parameter)
          .then((res)=>{
            resolve(res)
          })
      })
    },

  },
  getters:{
    peizhi_kbshry_list:(state) => {
      const list=[]
      state.kuaibaoShry.list.forEach((item,index)=>{
        const tmp={}
        tmp.index=index+1
        tmp.userName=item.__uuserid.userName
        tmp.userlevel=item.userlevel
        tmp.sortNum=item.sortNum
        tmp.departName=item.__uuserid.departmentName
        tmp.userId=item.__uuserid.userId
        tmp.key=item.id
        tmp.id=item.id
        tmp.departId=item.__uuserid.departmentId
        list.push(tmp)
      })
      return list
    },
    getKbshryById:(state,getters)=>(id)=> {
      const target=state.kuaibaoShry.list.find( todo=> todo.id==id)
      const tmp={}
      tmp.userName=target.__uuserid.userName
      tmp.userlevel=target.userlevel
      tmp.sortNum=target.sortNum
      tmp.departName=target.__uuserid.departmentName
      tmp.userId=target.__uuserid.userId
      tmp.key=target.id
      tmp.id=target.id
      tmp.departId=target.__uuserid.departmentId
      return tmp
    },
    peizhi_kbshry_selOptions:(state)=>{
      const selOptions={}
      state.kuaibaoShry.selectedOptions.forEach(option=>{
        selOptions[option.name]=[]
        if(option.value&&option.value.length>0){option.value.forEach(item=>{
          selOptions[option.name].push({label:item.label,value:item.value})
        })}
      })
      return selOptions
    },

  }
}

export default peizhi