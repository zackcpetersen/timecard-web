const state = {
    currentSnackbar: []
}

const getters = {
    getSnackbarMessage: state => state.currentSnackbar
}

const mutations = {
    ADD_SNACKBAR: (state, snackbar) => (state.currentSnackbar = snackbar),
    // REMOVE_SNACKBAR: (state, snackbarId) =>
    //     (state.snackbarMessages = state.snackbarMessages.filter(snackbar => snackbar.id !== snackbarId))
}

export default {
    state,
    getters,
    mutations
}
