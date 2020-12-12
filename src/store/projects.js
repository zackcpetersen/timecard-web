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
    }
}

const mutations = {
    SET_PROJECTS: (state, projects) => (state.projects = projects),
    SET_CURRENT_PROJECT: (state, project) => (state.currentProject = project)
}

export default {
    state,
    getters,
    actions,
    mutations
}
