import axios from '@/axios'

const state = {
    currentEntry: {},
    entries: [],
    userEntries: [],
    currentEntryImages: [],
    currentLocation: {},
    csvDownloaded: false
}

const getters = {
    getCurrentEntry: state => state.currentEntry,
    getEntries: state => state.entries,
    getUserEntries: state => state.userEntries,
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
                commit('UPDATE_ENTRIES', [response.data])
            })
    },
    async updateTimecardEntry ({ commit }, updatedEntry) {
        await axios.put(`/update-entry/${updatedEntry.id}/`, updatedEntry)
            .then(response => {
                commit('UPDATE_CURRENT_ENTRY', response.data)
            })
    },
    async addEntryLocation ({ commit }, locData) {
        await axios.post('/entry-location/', locData)
            .then(response => {
                commit('ADD_ENTRY_LOCATION', response.data)
            })
    },
    async entryStatusUpdate ({ commit }, entries) {
        await axios.post('/entry-status/', entries)
            .then(response => {
                commit('UPDATE_ENTRIES', response.data)
            })
    },
    async entryCsvExport ({ commit }, filters) {
        await axios({
            url: '/entry-download/',
            data: filters,
            method: 'POST',
            responseType: 'blob'
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            const dateTime = new Date().toLocaleString()
            const filename = 'export_' + dateTime + '.csv'
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            commit('CSV_DOWNLOADED', true)
        })
    },
    async fetchEntries ({ commit }, filters) {
        await axios.post('/filter-entries/', filters)
            .then(response => {
                commit('SET_ENTRIES', response.data)
            })
    },
    async fetchUserEntries ({ commit }) {
        await axios.get('/user-entries/')
            .then(response => {
                commit('SET_USER_ENTRIES', response.data)
            })
    },
}

const mutations = {
    ADD_ENTRY: (state, entry) => state.entries.push(entry),
    SET_ENTRIES: (state, entries) => {
        state.entries = entries
    },
    SET_USER_ENTRIES: (state, entries) => {
        state.userEntries = entries
        if (state.userEntries.length) {
            // Set currentEntry to most recent entry (sorting on backend)
            state.currentEntry = state.userEntries[0]
        }
    },
    SET_CURRENT_ENTRY: (state, entry) => (state.currentEntry = entry),
    UPDATE_CURRENT_ENTRY: (state, updatedEntry) => {state.currentEntry = updatedEntry},
    UPDATE_ENTRIES: (state, updatedEntries) => {
        state.entries = state.entries.map(existing => updatedEntries.find(updated => updated.id === existing.id) || existing)
    },
    ADD_ENTRY_LOCATION: (state, locData) => state.currentLocation = locData,
    REMOVE_CURRENT_ENTRY: state => state.currentEntry = {},
    CSV_DOWNLOADED: (state, status) => state.csvDownloaded = status
}

export default {
    state,
    getters,
    actions,
    mutations
}
