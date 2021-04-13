import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    contentLayout: window.localStorage.getItem('filemanager.contentLayout') || 'list',
    theme: window?.filemanagerConfig?.theme || 'primary-dark'
  },
  mutations,
  actions,
  getters: {
    mainTheme: state => state.theme.split('-')[0],
    navbarTheme: state => state.theme.split('-')[1]
  }
}
