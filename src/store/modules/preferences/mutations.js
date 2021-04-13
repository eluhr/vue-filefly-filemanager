export default {
    setContentLayout: (state, contentLayout) => {
        state.contentLayout = contentLayout
        window.localStorage.setItem('filemanager.contentLayout', contentLayout)
    },
    // setTheme: (state, theme) => {
    //     state.theme = theme
    //     window.localStorage.setItem('filemanager.theme', theme)
    // }
}