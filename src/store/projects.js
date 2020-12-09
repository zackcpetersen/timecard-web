import axios from "@/axios"

const state = {
    currentProject: {},
    projects: [],
    projectImages: []
}

const getters = {
    getCurrentProject: state => state.currentProject,
    getProjects: state => state.projects
}

const actions = {
    async fetchProjects ({ commit }) {
        await axios.get('/projects/')
            .then(response => {
                commit('SET_PROJECTS', response.data)
            })
    },
    async addProjectImage ({ commit }, imageData) {
        await axios.post('/project-images/', imageData)
            .then(response => {
                commit('ADD_PROJECT_IMAGE', response.data)
            })
    }
}

const mutations = {
    SET_PROJECTS: (state, projects) => (state.projects = projects),
    SET_CURRENT_PROJECT: (state, project) => (state.currentProject = project),
    ADD_PROJECT_IMAGE: (state, img) => (state.projectImages.push(img))
}

export default {
    state,
    getters,
    actions,
    mutations
}
