const state = {
    currentSnackbar: {}
}

const getters = {
    getSnackbarMessage: state => state.currentSnackbar
}

const mutations = {
    ADD_SNACKBAR: (state, snackbar) => (state.currentSnackbar = snackbar),
}

export default {
    state,
    getters,
    mutations
}
