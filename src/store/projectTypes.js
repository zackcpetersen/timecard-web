import axios from '@/axios'

const state = {
    projectTypes: [],
}

const getters = {
    getProjectTypes: state => state.projectTypes
}

const actions = {
    async fetchProjectTypes ({ commit }) {
        await axios.get('/project-types/')
            .then(response => {
                commit('SET_PROJECT_TYPES', response.data)
            })
    },
    async createProjectType ({ commit }, newType) {
        await axios.post('/project-types/', newType)
            .then(response => {
                commit('ADD_PROJECT_TYPE', response.data)
            })
    },
    // TODO - coming back to update and delete
    // async updateProjectType ({ commit }, updatedType) {
    //     await axios.put(`/project-types/${updatedType.id}/`, updatedType)
    //         .then(response => {
    //             commit('UPDATE_PROJECT_TYPE', response.data)
    //         })
    // },
    // async deleteProjectType ({ commit }, deletedType) {
    //     await axios.delete(`/project_types/${deletedType.id}/`)
    //         .then(() => {
    //             commit('REMOVE_PROJECT_TYPE', deletedType.id)
    //         })
    // }
}

const mutations = {
    SET_PROJECT_TYPES: (state, projectTypes) => (state.projectTypes = projectTypes),
    ADD_PROJECT_TYPE: (state, type) => (state.projectTypes.push(type)),
    // UPDATE_PROJECT_TYPE: (state, updatedType) => {
    //     const index = state.projectTypes.findIndex(type => type.id === updatedType.id)
    //     if (index > -1) {
    //         state.projectTypes.splice(index, 1, updatedType)
    //     }
    // },
    // REMOVE_PROJECT_TYPE: (state, typeId) => (state.projectTypes = this.state.projectTypes.filter(type => type.id !== typeId))
}

export default {
    state,
    getters,
    actions,
    mutations
}
