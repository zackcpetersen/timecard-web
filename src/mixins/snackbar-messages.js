import store from '@/store'

export const failedSnackbar = (
    {
        color = 'red',
        icon = 'mdi-thumb-down',
        heading = 'Failure',
        content = '',
        show = true,
        id = Date.now() + Math.random()
    } = {}) => {
    store.commit('ADD_SNACKBAR', {
        color: color,
        icon: icon,
        heading: heading,
        content: content,
        show: show,
        id: id
    })
}

export const successfulSnackbar = (
    {
        color = 'green',
        icon = 'mdi-thumb-up',
        heading = 'Success',
        content = '',
        show = true,
        id = Date.now() + Math.random()
    } = {}) => {
    store.commit('ADD_SNACKBAR', {
        color: color,
        icon: icon,
        heading: heading,
        content: content,
        show: show,
        id: id
    })
}
