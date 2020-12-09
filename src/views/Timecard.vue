<template>
    <timecard :entry="entry" :projects="projects"></timecard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Timecard from '@/components/Timecard'

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
            if (lastEntry.end_time) {
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
        timecard: Timecard
    },
}
</script>
