import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { BootstrapVue } from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFolder, faFile, faTh, faList, faFolderOpen, faEllipsisV, faSync, faSpinner, faFolderPlus, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import VueI18n from 'vue-i18n'

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

const messages = {
  en: {
    uploadAFile: 'Upload a file',
    uploadFile: 'Upload file',
    uploadFileTo: 'Upload file to {currentDirectory}',
    createNewDirectory: 'Create a new directory',
    createDirectory: 'Create directory',
    cancel: 'Cancel',
    loading: 'Loading...',
    directoryName: 'Directory name',
    noFilesInThisDirectory: 'No files in this directory',
    selectAFile: 'Select a file',
    deleteFile: 'Delete',
    openDirectory: 'Open',
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages,
})

new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
