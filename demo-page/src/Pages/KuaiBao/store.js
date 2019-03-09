const kuaibao = {
  state:{
    kuaibaoList:[],
    xbList:{},
    lcInfo:[]
  },
  mutations: {
    ADD_KUAIBAO: (state, payload) => {
      state.kuaibaoList=payload
      // state.kuaibaoList.push(payload)
    },
    ADD_XUBAO:(state,payload)=>{
      state.xbList[payload.id]=payload.xbData

    },
    ADD_LC_INFO:(state,payload)=>{
      state.lcInfo=payload
    }
  },
  actions: {

  },
  getters:{
    getKuaibaoById:(state)=>(id)=> {
      return state.kuaibaoList.find( todo=> todo.id==id)
    },
    getXubaoById:(state)=>(id,xbid)=> {
      // debugger
      return state.xbList[id].find( todo=> todo.xbid==xbid)

    },
  }
}

export default kuaibao