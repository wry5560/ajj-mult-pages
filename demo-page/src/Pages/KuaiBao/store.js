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
      state.xbList[payload.id]=[]
      state.xbList[payload.id]=payload.xbData
    },
    ADD_LC_INFO:(state,payload)=>{
      state.lcInfo=payload
    }
  },
  actions: {

  }
}

export default kuaibao