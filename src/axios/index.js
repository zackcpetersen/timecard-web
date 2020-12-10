import Axios from 'axios'
import { failedSnackbar } from '@/mixins/snackbar-messages'

const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api/'
})

axios.interceptors.response.use(response => {
    // if (response.config.showSuccessfulSnackbar) {}
    return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                if (error.response.config && !error.response.config.__isRetryRequest) {
                    // TODO need to test this one
                    this.logout()
                }
                break
            case 404:
                failedSnackbar({ heading: error.message, content: error.response.config.url })
                break
            case 400:
                failedSnackbar({ heading: error.message })
                return Promise.reject(error)
            case 409:
                console.log(error.message)
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
