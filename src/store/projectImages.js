import axios from "@/axios"

const state = {
    images: []
}

const getters = {
    getProjectImagesByEntry: (state) => (entryId) => {
        return state.images.filter(image => image.entry === entryId)
    }
}

const actions = {
    async fetchProjectImages ({ commit }) {
        await axios.get('/project-images/')
            .then(response => {
                commit('SET_IMAGES', response.data)
            })
    },
    async addImage ({ commit }, imageData) {
        await axios.post('/project-images/', imageData)
            .then(response => {
                commit('ADD_IMAGE', response.data)
            })
    },
    async updateImage ({ commit }, updatedImage) {
        await axios.patch(`/project-images/${updatedImage.id}/`, updatedImage)
            .then(response => {
                commit('UPDATE_IMAGE', response.data)
            })
    },
    async deleteImage ({ commit }, imageId) {
        await axios.delete(`/project-images/${imageId}/`)
            .then(() => {
                commit('REMOVE_IMAGE', imageId)
            })
    }
}

const mutations = {
    ADD_IMAGE: (state, img) => (state.images.unshift(img)),
    SET_IMAGES: (state, images) => (state.images = images),
    UPDATE_IMAGE: (state, updatedImage) => {
        const oldImageIndex = state.images.findIndex(img => img.id === updatedImage.id)
        state.images[oldImageIndex] = updatedImage
    },
    REMOVE_IMAGE: (state, imageId) => (state.images = state.images.filter(image => image.id !== imageId))
}

export default {
    state,
    getters,
    actions,
    mutations
}
