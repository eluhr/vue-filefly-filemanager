export default {
    setCurrentDirectory: (state, currentDirectory) => state.currentDirectory = currentDirectory,
    setContent: (state, content) => state.content = content,
    setContentLayout: (state, contentLayout) => {
        state.contentLayout = contentLayout
        window.localStorage.setItem('filemanager.contentLayout', contentLayout)
    },
    setIsIndexing: (state, isIndexing) => state.isIndexing = isIndexing
}