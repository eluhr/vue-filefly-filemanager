export default {
    listContent({commit, state}, path) {
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
            })
            .catch(errorMessage => this._vm.$eventHub.$emit('SHOW_ERROR_MESSAGE_TO_USER', errorMessage))
            .finally(() => {
                commit('setIsIndexing', false)
            })
    },
    createDirectory({dispatch, state}, newPath) {
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
            .catch(errorMessage => this._vm.$eventHub.$emit('SHOW_ERROR_MESSAGE_TO_USER', errorMessage))
    },
    deleteFile({dispatch, state}, items) {
        const data = {action: 'remove', items}
        fetch(state.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .catch(errorMessage => this._vm.$eventHub.$emit('SHOW_ERROR_MESSAGE_TO_USER', errorMessage))
            .finally(() => {
                dispatch('listContent', state.currentDirectory)
            })
    },
    uploadFile({dispatch, state}, files) {
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
            .catch(errorMessage => this._vm.$eventHub.$emit('SHOW_ERROR_MESSAGE_TO_USER', errorMessage))
    },
    renameItem({state, dispatch}, {item, newName}) {
        const basePath = (state.currentDirectory === '/' ? '/' : state.currentDirectory + '/');
        const oldItemPath = basePath + item.name
        const newItemPath = basePath + newName
        const data = new FormData();

        data.append('action', 'rename')
        data.append('item', oldItemPath)
        data.append('newItemPath', newItemPath)

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
            .catch(errorMessage => this._vm.$eventHub.$emit('SHOW_ERROR_MESSAGE_TO_USER', errorMessage))
    }
}

