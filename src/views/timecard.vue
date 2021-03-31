<template>
    <timecard :entry="entry"></timecard>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import timecard from '@/components/timecard/index'

export default {
    title: "Timecard",
    methods: {
        ...mapActions({
            fetchUserEntries: 'fetchUserEntries',
            fetchProjects: 'fetchProjects',
            fetchProjectImages: 'fetchProjectImages',
            fetchCurrentUser: 'fetchCurrentUser'
        })
    },
    computed: {
        ...mapGetters({
            currentEntry: 'getCurrentEntry',
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
        this.fetchUserEntries()
        this.fetchProjects()
        this.fetchProjectImages()
        this.fetchCurrentUser()
    },
    components: {
        'timecard': timecard
    },
}
</script>
