import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faFile, faTh, faList, faFolderOpen, faEllipsisV, faSync, faSpinner, faFolderPlus, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import VueI18n from 'vue-i18n'
import {messages, dateTimeFormats} from './i18n'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)

Vue.use(VueI18n)

library.add(faFolder)
library.add(faFolderOpen)
library.add(faFile)
library.add(faTh)
library.add(faList)
library.add(faEllipsisV)
library.add(faSync)
library.add(faSpinner)
library.add(faFolderPlus)
library.add(faChevronRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/**
 * Global event bus
 * @type {Vue}
 */
Vue.prototype.$eventHub = new Vue()

const i18n = new VueI18n({
  locale: window?.filemanagerConfig?.language  || process.env.VUE_APP_LANGUAGE,
  fallbackLocale: 'en',
  messages,
  dateTimeFormats
})

new Vue({
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
