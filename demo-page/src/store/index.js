import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import kuaibao from '../Pages/KuaiBao/store'
import yingji from '../Pages/Yingji/store'
import peizhi from '../Pages/Peizhi/store'
import jxgl from '../Pages/Jxgl/store'
import Qiye from '../Pages/Qiye/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    kuaibao,
    yingji,
    peizhi,
    jxgl,
    Qiye
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
