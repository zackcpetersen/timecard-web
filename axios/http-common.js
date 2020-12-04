import Axios from 'axios'

export const axios = Axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
        Authorization: 'Token 85e453d1521e5d8c918344268142a22adaef65e2'
    }
})
