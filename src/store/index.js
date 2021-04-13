import Vue from 'vue'
import Vuex from 'vuex'
import api from './modules/api'
import preferences from './modules/preferences'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    api,
    preferences
  },
  state: {
    renameItem: null
  },
  mutations: {
    setRenameItem: (state, renameItem) => state.renameItem = renameItem
  }
})
