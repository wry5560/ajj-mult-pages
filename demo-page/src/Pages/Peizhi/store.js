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
              res.data.forEach(item=>item.key=item.id)
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
        tmp.index=index
        tmp.userName=item.__uuserid.userName
        tmp.userlevel=item.userlevel
        tmp.sortNum=item.sortNum
        tmp.departName=item.__ddepartmentid.departName
        tmp.userId=item.__uuserid.userId
        tmp.key=item.id
        list.push(tmp)
      })
      return list
    },
    getKbshryById:(state,getters)=>(id)=> {
      return getters.peizhi_kbshry_list[id]
      // return state.kuaibaoShry.list.find( todo=> todo.id==id)
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