import axios from "@/axios"

const state = {
    currentProject: {},
    projects: [],
    projectImages: []
}

const getters = {
    getCurrentProject: state => state.currentProject,
    getProjects: state => state.projects,
    getProjectImagesByEntry: (state) => (entryId) => {
        return state.projectImages.filter(image => image.entry === entryId)
    }
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
    },
    async fetchProjectImages ({ commit }) {
        await axios.get('/project-images/')
            .then(response => {
                commit('SET_PROJECT_IMAGES', response.data)
            })
    }
}

const mutations = {
    SET_PROJECTS: (state, projects) => (state.projects = projects),
    SET_CURRENT_PROJECT: (state, project) => (state.currentProject = project),
    ADD_PROJECT_IMAGE: (state, img) => (state.projectImages.push(img)),
    SET_PROJECT_IMAGES: (state, images) => (state.projectImages = images)
}

export default {
    state,
    getters,
    actions,
    mutations
}
