import axios from '@/axios'

const state = {
    users: [],
    currentUser: {},
    editableUser: {}
}

const getters = {
    getUsers: state => state.users,
    getCurrentUser: state => state.currentUser,
    getEditableUser: state => state.editableUser
}

const actions = {
    async createUser({ commit }, newUser) {
        await axios.post('/users/', newUser)
            .then(response => {
                commit('ADD_USER', response.data)
            })
    },
    async superUserUpdateUser({ commit }, updatedUser) {
        await axios.put(`/users/${updatedUser.get('id')}/`, updatedUser)
            .then(response => {
                commit('UPDATE_USER', response.data)
            })
    },
    async updateUser({ commit }, updatedUser) {
        await axios.put(`/update-user/${updatedUser.get('id')}/`, updatedUser)
            .then(response => {
                commit('UPDATE_USER', response.data)
            })
    },
    async fetchUsers({ commit }) {
        await axios.get('/update-user/')
            .then(response => {
                commit('SET_USERS', response.data)
            })
    },
    async fetchCurrentUser({ commit }) {
        await axios.get('/current-user/')
            .then(response => {
                commit('SET_CURRENT_USER', response.data)
            })
    }
}

const mutations = {
    ADD_USER: (state, user) => (state.users.unshift(user)),
    UPDATE_USER: (state, updatedUser) => {
        const index = state.users.findIndex(user => user.id === updatedUser.id)
        if (index !== -1) {
            state.users.splice(index, 1, updatedUser)
        }
        if (state.editableUser.id === updatedUser.id) {
            state.editableUser = updatedUser
        }
    },
    SET_USERS: (state, users) => state.users = users,
    SET_CURRENT_USER: (state, user) => state.currentUser = user,
    SET_EDITABLE_USER: (state, user) => state.editableUser = user,
    RESET_EDITABLE_USER: state => state.editableUser = {}
}

export default {
    state,
    getters,
    actions,
    mutations
}
