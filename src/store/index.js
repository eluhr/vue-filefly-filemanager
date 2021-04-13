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
    activeItem: null
  },
  mutations: {
    setActiveItem: (state, activeItem) => state.activeItem = activeItem
  }
})
