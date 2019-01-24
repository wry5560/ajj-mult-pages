import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'
import kuaibao from '../Pages/KuaiBao/store'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    kuaibao
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
