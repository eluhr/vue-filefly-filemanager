import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // baseUrl: '/filefly/api'
    baseUrl: 'http://localhost:58001/filefly/api',
    currentDirectory: '/',
    directoryStructure: [{name: '/', children: []}],
    content: [],
    isIndexing: true,
    contentLayout: window.localStorage.getItem('filemanager.contentLayout') || 'list'
  },
  mutations: {
    setCurrentDirectory: (state, currentDirectory) => state.currentDirectory = currentDirectory,
    setContent: (state, content) => state.content = content,
    setContentLayout: (state, contentLayout) => {
      state.contentLayout = contentLayout
      window.localStorage.setItem('filemanager.contentLayout', contentLayout)
    },
    setIsIndexing: (state, isIndexing) => state.isIndexing = isIndexing,
    setDirectoryStructure: (state, directoryStructure) => state.directoryStructure = directoryStructure,
    updateDirectoryStructure: (state, path) => {
      let itemIndex = state.directoryStructure.findIndex(item => item.name === path)
      let item;
      if (itemIndex === -1) {
        item = {
          name: path
        }
      } else {
        item = state.directoryStructure[itemIndex]
      }

      item.children = state.content.filter(item => item.type === 'dir')

      if (itemIndex === -1) {
        state.directoryStructure.push(item)
      } else {
        state.directoryStructure[itemIndex] = item
      }
    }
  },
  actions: {
    listContent: ({commit, state}, path)  => {
      const data = {action: 'list', path}
      commit('setIsIndexing', true)
      fetch(state.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then(response => response.json())
          .then(json => {
            commit('setContent', json.result)
            commit('setCurrentDirectory', path)
            commit('updateDirectoryStructure', path)
            console.log('switching to directory', path)
          })
          .finally(() => {
            commit('setIsIndexing', false)
          })
    },
    createDirectory: ({dispatch, state}, newPath)  => {
      const data = {action: 'createFolder', newPath}
      fetch(state.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then(response => response.json())
          .then(json => {
            if (json.result.success) {
              dispatch('listContent', newPath)
            }
          })
    },
    deleteFile: ({dispatch, state}, items)  => {
      const data = {action: 'remove', items}
      fetch(state.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then(response => response.json())
          .finally(() => {
            dispatch('listContent', state.currentDirectory)
          })
    },
    uploadFile: ({dispatch, state}, files)  => {
      const data = new FormData();
      data.append('destination', state.currentDirectory)
      for (let i = 0; i < files.length; i++) {
        data.append(`file-${i}`, files[i]);
      }
      fetch(state.baseUrl, {
        method: 'POST',
        body: data,
      })
          .then(response => response.json())
          .then(json => {
            if (json.result.success) {
              dispatch('listContent', state.currentDirectory)
            }
          })
    },
    toggleContentLayout: ({commit, state}) => {
      commit('setContentLayout', state.contentLayout === 'list' ? 'grid' : 'list')
    }
  },
  getters: {
    currentDirectory: state => state.currentDirectory,
    content: state => state.content,
    contentLayout: state => state.contentLayout,
    isIndexing: state => state.isIndexing,
    directoryStructure: state => state.directoryStructure,
    findInDirectoryStructure: state => name => state.directoryStructure.find(item => item.name === name),
    rootDirectoryStructure: state => state.directoryStructure.filter(item => item.name === '/') || []
  }
})
