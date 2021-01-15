import axios from '@/axios'

const state = {
    users: []
}

const getters = {
    getUsers: state => state.users
}

const actions = {
    async fetchUsers({ commit }) {
        await axios.get('/users/')
            .then(response => {
                commit('SET_USERS', response.data)
            })
    }
}

const mutations = {
    SET_USERS: (state, users) => state.users = users
}

export default {
    state,
    getters,
    actions,
    mutations
}
