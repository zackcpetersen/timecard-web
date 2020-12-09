import axios from '@/axios'

const state = {
    currentEntry: {},
    entries : []
}

const getters = {
    getCurrentEntry: state => state.currentEntry,
    getEntries: state => state.entries
}

const actions = {
    async startTime ({ commit }, user) {
        await axios.post('/start-time/', user)
            .then(response => {
                commit('ADD_ENTRY', response.data)
            })
    },
    async startPause ({ commit }, user) {
        await axios.post('/start-pause/', user)
            .then(response => {
                commit('SET_CURRENT_ENTRY', response.data)
            })
    },
    async endPause ({ commit }, user) {
        await axios.post('/end-pause/', user)
            .then(response => {
                commit('SET_CURRENT_ENTRY', response.data)
            })
    },
    async endTime ({ commit }, user) {
        await axios.post('/end-time/', user)
            .then(response => {
                commit('SET_CURRENT_ENTRY', response.data)
            })
    },
    async updateEntry ({ commit }, updatedEntry) {
        await axios.put(`/entries/${updatedEntry.id}/`, updatedEntry)
            .then(response => {
                commit('UPDATE_ENTRY', response.data)
                console.log(updatedEntry)
            })
    },
    async fetchEntries ({ commit }, filters) {
        await axios.post('/filter-entries/', filters)
            .then(response => {
                commit('SET_ENTRIES', response.data)
            })
    },
}

const mutations = {
    ADD_ENTRY: (state, entry) => state.entries.unshift(entry),
    SET_ENTRIES: (state, entries) => {
        state.entries = entries
        const lastEntry = entries[entries.length - 1]
        state.currentEntry = lastEntry
    },
    SET_CURRENT_ENTRY: (state, entry) => (state.currentEntry = entry),
    UPDATE_ENTRY: (state, updatedEntry) => {
        const index = state.entries.findIndex(entry => entry.id === updatedEntry.id)
        if (index !== -1) {
            state.entries.splice(index, 1, updatedEntry)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
