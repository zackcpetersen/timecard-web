import Vue from 'vue'
import Vuex from 'vuex'

import auth from './authentication'
// import Login from "@/views/Login";

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth,
        // Login
    }
})

export default store
