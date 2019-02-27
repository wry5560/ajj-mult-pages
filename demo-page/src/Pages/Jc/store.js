import {GeneralQuery,GeneralPostQuery,} from './api'
import message from 'ant-design-vue/es/message'
const jiancazhifa = {
  state:{
    jcList:{list:[],selectedOptions:[]},
  },
  mutations: {
    INIT_JCZF_JCLIST: (state, payload) => {
      state.jcList.list=payload
    },
    INIT_JCZF_JCSELECTED_OPTIONS: (state, payload) => {
      state.jcList.selectedOptions=payload
    },
  },

  actions: {
    //查询检查项列表
    reqJcList:({commit},params)=>{
      return new Promise((resolve, reject) => {
        const parameter={
          sqlId:'S350020.pc',
          param1:sys_relateDepId2,
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
    //新增检查项
    createJcx:(store,params)=>{
      return new Promise((resolve, reject) => {
        //这里可以增加通用参数，如部门id等
        const parameter={
          ...params
        }
        createJcx(parameter)
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
    getJcById:(state)=>(id)=> {
      return state.jcList.list.find( todo=> todo.id==id)
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