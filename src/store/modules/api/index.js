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
    isIndexing: true
  },
  mutations,
  actions
}
