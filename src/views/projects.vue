<template>
    <projects :projects="projects"></projects>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import projects from '@/components/projects/index'

export default {
    methods: {
        ...mapActions({
            fetchProjects: 'fetchProjects'
        })
    },
    computed: {
        ...mapGetters({
            projects: 'getProjects'
        })
    },
    created () {
        this.fetchProjects()
    },
    components: {
        'projects': projects
    }
}
</script>
