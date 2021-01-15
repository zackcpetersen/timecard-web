import Vue from 'vue'
import Vuex from 'vuex'

import auth from './authentication'
import entries from '@/store/entries'
import projects from '@/store/projects'
import projectImages from '@/store/projectImages'
import snackbar from '@/store/snackbar'
import users from '@/store/users'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        entries,
        projects,
        projectImages,
        snackbar,
        users
    }
})
