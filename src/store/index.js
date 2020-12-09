import Vue from 'vue'
import Vuex from 'vuex'

import auth from './authentication'
import entries from '@/store/entries'
import projects from '@/store/projects'
// import Login from "@/views/Login";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        entries,
        projects
        // Login
    }
})

// export default store
