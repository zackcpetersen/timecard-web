import Vue from 'vue'
import VueRouter from "vue-router"

import Login from "@/views/Login"
import Timecard from "@/views/Timecard"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Timecard',
        component: Timecard
    },
    {
        path: '/login/',
        name: 'Login',
        component: Login
    },
    // {
    //     path: '/projects/',
    //     name: 'ProjectList',
    //     component: ProjectList
    // },
    // {
    //     path: '/projects/:id/',
    //     name: 'ProjectView',
    //     component: ProjectView
    // },
    // {
    //     path: '/entries/',
    //     name: 'Entries',
    //     component: Entries
    // },
    // {
    //     path: '/user/',
    //     name: 'User',
    //     component: User
    // },
    // {
    //     path: '/admin/',
    //     name: 'Admin',
    //     component: Admin
    // }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router
