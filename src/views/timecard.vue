<template>
    <timecard :entry="entry" :projects="projects"></timecard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import timecard from '@/components/timecard/index'

export default {
    methods: {
        ...mapActions({
            fetchEntries: 'fetchEntries',
            fetchProjects: 'fetchProjects'
        })
    },
    computed: {
        ...mapGetters({
            getCurrentEntry: 'getCurrentEntry',
            getEntries: 'getEntries',
            projects: 'getProjects'
        }),
        entry () {
            const lastEntry = this.getCurrentEntry
            const today = new Date().toDateString()
            const startDay = new Date(lastEntry.start_time).toDateString()

            if (lastEntry.end_time && (today !== startDay)) {
                return {}
            }
            return lastEntry
        }
    },
    created () {
        this.fetchEntries()
        this.fetchProjects()
    },
    components: {
        timecard: timecard
    },
}
</script>
