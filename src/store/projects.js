import axios from "@/axios"

const state = {
    currentProject: {},
    projects: [],
}

const getters = {
    getCurrentProject: state => state.currentProject,
    getProjects: state => state.projects,
}

const actions = {
    async fetchProjects ({ commit }) {
        await axios.get('/projects/')
            .then(response => {
                commit('SET_PROJECTS', response.data)
            })
    },
    async createProject ({ commit }, newProj) {
        await axios.post('/projects/', newProj)
            .then(response => {
                commit('ADD_PROJECT', response.data)
            })
    },
    async updateProject ({ commit }, updatedProject) {
        await axios.put(`/projects/${updatedProject.id}/`, updatedProject)
            .then(response => {
                commit('UPDATE_PROJECT', response.data)
            })
    }
}

const mutations = {
    SET_PROJECTS: (state, projects) => (state.projects = projects),
    SET_CURRENT_PROJECT: (state, project) => (state.currentProject = project),
    ADD_PROJECT: (state, project) => (state.projects.unshift(project)),
    UPDATE_PROJECT: (state, updatedProject) => {
        const index = state.projects.findIndex(proj => proj.id === updatedProject.id)
        if (index !== -1) {
            state.projects.splice(index, 1, updatedProject)
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
