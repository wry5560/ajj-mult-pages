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
import QiyeDetial from '../Pages/wryComps/QiyeDetail/store'
import JianchaZhifa from '../Pages/Jc/store'
import System from '../Pages/System/store'
import GuiDang from '../Pages/Guidang/store'
import Ajyw from '../Pages/Ajyw/store'
import Meeting from '../Pages/Meeting/store'
import Query from '../Pages/Query/store'

import Login from '../Pages/Login/store'


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
    Qiye,
    QiyeDetial,
    JianchaZhifa,
    System,
    GuiDang,
    Login,
    Ajyw,
    Meeting,
    Query,

  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
