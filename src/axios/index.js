import Axios from 'axios'
import store from '@/store/index'

import { failedSnackbar, successfulSnackbar } from '@/mixins/snackbar-messages'

const development = process.env.NODE_ENV !== 'production'

const axios = Axios.create({
    baseURL: development ? 'http://127.0.0.1:8000/api/' : 'http://staging-timecard-dev.us-west-2.elasticbeanstalk.com/api/'
})

axios.interceptors.response.use(response => {
    // if (response.config.showSuccessfulSnackbar) {}
    if (response.config.method === 'delete') {
        successfulSnackbar({ heading: 'Deleted Successfully!' })
    }
    if (response.config.url === '/reset-password/') {
        successfulSnackbar({ content: 'Password Changed Successfully!'})
    }
    if (response.config.url.includes('/update-entry/')) {
        successfulSnackbar({content: 'Entry Updated!'})
    }
    return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                store.dispatch('authLogout', {})
                break
            case 403:
                if (error.response.data.detail === 'Invalid token.') {
                    store.dispatch('authLogout', {})
                    break
                }
                failedSnackbar({ heading: error.response.statusText, content: 'Access Denied'})
                break
            case 404:
                failedSnackbar({ heading: error.message, content: error.response.config.url })
                break
            case 400:
                if (error.response.data.non_field_errors) {
                    failedSnackbar({ content: error.response.data.non_field_errors[0]})
                    return Promise.reject(error)
                }
                failedSnackbar({ heading: error.message, content: error.response.data })
                return Promise.reject(error)
            case 409:
                failedSnackbar({ content: error.response.data.detail })
                break
            case 500:
                failedSnackbar({ heading: error.message, content: error.response.statusText })
                break
            default:
                failedSnackbar({ heading: error.message })
        }
    } else {
        failedSnackbar({ heading: error.message })
    }
    return Promise.reject(error)
})

export default axios
