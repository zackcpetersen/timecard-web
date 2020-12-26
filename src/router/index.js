import Vue from 'vue'
import VueRouter from "vue-router"

import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Timecard',
        component: () => import('@/views/timecard'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login/',
        name: 'login',
        component: () => import('@/views/login'),
        meta: {
            layout: 'simple',
            requiresAuth: false
        }
    },
    {
        path: '/projects/',
        name: 'Projects',
        component: () => import('@/views/projects'),
        meta: {
            requiresAuth: true
        }
    },
    // {
    //     path: '/projects/:id/',
    //     name: 'ProjectView',
    //     component: ProjectView,
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
    {
        path: '/entries/',
        name: 'Entries',
        component: () => import('@/views/entries'),
        meta: {
            requiresAuth: true
        }
    },
    // {
    //     path: '/user/',
    //     name: 'User',
    //     component: User,
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
    // {
    //     path: '/admin/',
    //     name: 'Admin',
    //     component: Admin,
    //     meta: {
    //         requiresAuth: true
    //     }
    // }
]

const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Check Authentication
        if (store.getters.isAuthenticated) {
            next()
            return
        }
        next({ name: 'login' })
    } else {
        next()
    }
})

export default router
