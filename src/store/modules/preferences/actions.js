export default {
    toggleContentLayout: ({commit, state}) => {
        commit('setContentLayout', state.contentLayout === 'list' ? 'grid' : 'list')
    }
}

