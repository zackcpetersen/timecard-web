import Vue from 'vue'
import VueRouter from "vue-router"

import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/login/',
        name: 'Login',
        component: () => import('@/views/login'),
        meta: {
            layout: 'simple',
            requiresAuth: false
        }
    },
    {
        path: '/reset-password/',
        name: 'PasswordReset',
        component: () => import('@/views/passwordReset'),
        meta: {
            layout: 'simple',
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'Timecard',
        component: () => import('@/views/timecard'),
        meta: {
            requiresAuth: true
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
    {
        path: '/entries/',
        name: 'Entries',
        component: () => import('@/views/entries'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/account/',
        name: 'Account',
        component: () => import('@/views/accounts'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '*',
        name: 'PageNotFound',
        component: () => import('@/views/pageNotFound')
    }
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
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router
