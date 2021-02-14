<template>
    <timecard :entry="entry"></timecard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import timecard from '@/components/timecard/index'

export default {
    methods: {
        ...mapActions({
            fetchEntries: 'fetchEntries',
            fetchProjects: 'fetchProjects',
            fetchProjectImages: 'fetchProjectImages',
            fetchCurrentUser: 'fetchCurrentUser'
        })
    },
    computed: {
        ...mapGetters({
            currentEntry: 'getCurrentEntry',
            getEntries: 'getEntries',
            projects: 'getProjects',
            currUser: 'getCurrentUser'
        }),
        entry () {
            const today = new Date().toDateString()
            const startDay = new Date(this.currentEntry.start_time).toDateString()

            if (this.currentEntry.end_time || (today !== startDay)) {
                this.$store.commit('SET_CURRENT_ENTRY', {})
                return this.currentEntry
            }
            return this.currentEntry
        }
    },
    created () {
        this.fetchEntries()
        this.fetchProjects()
        this.fetchProjectImages()
        this.fetchCurrentUser()
    },
    components: {
        'timecard': timecard
    },
}
</script>
