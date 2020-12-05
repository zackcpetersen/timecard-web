import Vue from 'vue'
import VueRouter from "vue-router"

import store from '@/store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Timecard',
        component: () => import('@/views/Timecard'),
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login/',
        name: 'Login',
        component: () => import('@/views/Login'),
        meta: {
            layout: 'simple'
        }
    },
    // {
    //     path: '/projects/',
    //     name: 'ProjectList',
    //     component: ProjectList,
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
    // {
    //     path: '/projects/:id/',
    //     name: 'ProjectView',
    //     component: ProjectView,
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
    // {
    //     path: '/entries/',
    //     name: 'Entries',
    //     component: Entries,
    //     meta: {
    //         requiresAuth: true
    //     }
    // },
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
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router
