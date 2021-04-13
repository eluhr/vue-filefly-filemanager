import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default {
  namespaced: true,
  state: {
    baseUrl: window?.filemanagerConfig?.apiBaseUrl  || process.env.VUE_APP_FILEFLY_API_BASE_URL,
    currentDirectory: '/',
    content: [],
    isIndexing: true,
    contentLayout: window.localStorage.getItem('filemanager.contentLayout') || 'list'
  },
  mutations,
  actions,
  getters: {
    currentDirectory: state => state.currentDirectory,
    content: state => state.content,
    contentLayout: state => state.contentLayout,
    isIndexing: state => state.isIndexing,
    findInDirectoryStructure: state => name => state.directoryStructure.find(item => item.name === name),
  }
}
