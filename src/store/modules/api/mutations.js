export default {
    setCurrentDirectory: (state, currentDirectory) => {
        state.currentDirectory = currentDirectory
        window.localStorage.setItem('filemanager.path', currentDirectory)
    },
    setContent: (state, content) => state.content = content,
    setIsIndexing: (state, isIndexing) => state.isIndexing = isIndexing
}