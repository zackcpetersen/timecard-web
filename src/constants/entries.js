const entryConstants = {
    status(status) {
        // TODO could run unclosed entry check here and update db
        const statusData = {}

        if (status === 'approved') {
            statusData['type'] = 'Approved'
            statusData['color'] = 'green'
        } else if (status === 'needs_approval') {
            statusData['type'] = 'Needs Approval'
            statusData['color'] = 'warning'
        } else if (status === 'flagged') {
            statusData['type'] = 'Flagged'
            statusData['color'] = 'error'
        } else if (status === 'active') {
            statusData['type'] = 'Active'
            statusData['color'] = 'primary'
        } else {
            statusData['type'] = status
            statusData['color'] = 'black'
        }
        return statusData
    },
    localeTime (time) {
        return new Date(time).toLocaleTimeString()
    },
    displayLocaleDateTime (time) {
        const timestamp = new Date(time)
        const localeDate = timestamp.toLocaleDateString()
        const localeTime = timestamp.toLocaleTimeString()
        return localeDate + ' ' + localeTime
    },
    durationFormatted (time_paused) {
        return new Date(time_paused * 1000).toISOString().substr(11, 8)
    },
}

export default entryConstants
