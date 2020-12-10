import Vue from 'vue'

import App from './App.vue'
import store from "@/store"

import router from "@/router"
import vuetify from '@/plugins/vuetify'
import axios from "@/axios"

Vue.config.productionTip = false

// Authentication
const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common.Authorization = token
}

// Root Instance
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
