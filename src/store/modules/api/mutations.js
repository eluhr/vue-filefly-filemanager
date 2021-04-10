export default {
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
}