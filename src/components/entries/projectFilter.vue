<template>
    <v-autocomplete
        v-model="projectList"
        :items="projects"
        item-text="name"
        item-value="id"
        multiple
        label="Project"
    >
        <template v-slot:prepend>
            <v-icon>mdi-home-variant-outline</v-icon>
        </template>
    </v-autocomplete>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data () {
        return {
            projectList: [],
        }
    },
    computed: {
        ...mapGetters({
            getProjects: 'getProjects'
        }),
        projects () {
            const projects = this.getProjects
            projects.unshift({name: 'No Project', id: null})
            return projects
        }
    },
    methods: {
        ...mapActions({
            fetchProjects: 'fetchProjects'
        })
    },
    watch: {
        projectList () {
            this.$emit('input', this.projectList)
        }
    },
    props: {
        value: Array,
    },
    created() {
        this.fetchProjects()
    }
}
</script>
