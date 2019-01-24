const kuaibao = {
  state:{
    kuaibaoList:[],
    xbList:{},
  },
  mutations: {
    ADD_KUAIBAO: (state, payload) => {
      state.kuaibaoList=payload
      // state.kuaibaoList.push(payload)
    },
    ADD_XUBAO:(state,payload)=>{
      debugger
      state.xbList[payload.id]=[]
      state.xbList[payload.id]=payload.xbData
    }
  },
  actions: {

  }
}

export default kuaibao