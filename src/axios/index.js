import Axios from 'axios'
import { failedSnackbar, successfulSnackbar } from '@/mixins/snackbar-messages'
import store from '@/store/index'

const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

axios.interceptors.response.use(response => {
    // if (response.config.showSuccessfulSnackbar) {}
    if (response.config.method === 'delete') {
        successfulSnackbar({ heading: 'Deleted Successfully' })
    }
    if (response.config.url === '/reset-password/') {
        successfulSnackbar({ heading: 'Password', content: 'Changed Successfully!'})
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
                failedSnackbar({ heading: error.response.data.detail, content: error.message })
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
