import axios from '@/axios'

const state = {
    users: [],
    currentUser: {},
}

const getters = {
    getUsers: state => state.users,
    getCurrentUser: state => state.currentUser
}

const actions = {
    async fetchUsers({ commit }) {
        await axios.get('/update-user/')
            .then(response => {
                commit('SET_USERS', response.data)
            })
    },
    async fetchCurrentUser({ commit }) {
        await axios.get('current-user')
            .then(response => {
                commit('SET_CURRENT_USER', response.data)
            })
    }
}

const mutations = {
    SET_USERS: (state, users) => state.users = users,
    SET_CURRENT_USER: (state, user) => state.currentUser = user
}

export default {
    state,
    getters,
    actions,
    mutations
}
