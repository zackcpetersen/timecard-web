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
                commit('SET_CURRENT_ENTRY', response.data)
            })
    },
    async startPause ({ commit }, user) {
        await axios.post('/start-pause/', user)
            .then(response => {
                commit('UPDATE_CURRENT_ENTRY', response.data)
            })
    },
    async endPause ({ commit }, user) {
        await axios.post('/end-pause/', user)
            .then(response => {
                commit('UPDATE_CURRENT_ENTRY', response.data)
            })
    },
    async endTime ({ commit }, user) {
        await axios.post('/end-time/', user)
            .then(() => {
                commit('REMOVE_CURRENT_ENTRY')
            })
    },
    async updateEntry ({ commit }, updatedEntry) {
        await axios.put(`/entries/${updatedEntry.id}/`, updatedEntry)
            .then(response => {
                commit('UPDATE_CURRENT_ENTRY', response.data)
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
    ADD_ENTRY: (state, entry) => state.entries.push(entry),
    SET_ENTRIES: (state, entries) => {
        state.entries = entries
        // Set currentEntry to last entry in project list
        state.currentEntry = entries.reduce((a, b) => a.id > b.id ? a : b)
    },
    SET_CURRENT_ENTRY: (state, entry) => (state.currentEntry = entry),
    UPDATE_CURRENT_ENTRY: (state, updatedEntry) => {
        state.currentEntry = updatedEntry
    },
    REMOVE_CURRENT_ENTRY : state => state.currentEntry = {}
}

export default {
    state,
    getters,
    actions,
    mutations
}
