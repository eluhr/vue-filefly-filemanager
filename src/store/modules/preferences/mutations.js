export default {
    setContentLayout: (state, contentLayout) => {
        state.contentLayout = contentLayout
        window.localStorage.setItem('filemanager.contentLayout', contentLayout)
    }
}