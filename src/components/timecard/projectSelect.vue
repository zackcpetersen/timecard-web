<template>
    <div>
        <v-row justify="center">
            <v-col cols="auto">
                <v-select
                    v-model="activeProject"
                    :items="projects"
                    item-text="name"
                    item-value="id"
                    label="Project"
                    :loading="loading"
                ></v-select>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import projConstants from '@/constants/projects'

export default {
    data () {
        return {
            project: '',
            loading: false,
        }
    },
    computed: {
        activeProject: {
            get () {
                if (this.entry.project) {
                    return this.projects.filter(proj => proj.id === this.entry.project)[0]
                }
                return null
            },
            set (project) {
                this.project = project
            },
        },
        projects () {
            const activeProj = projConstants.statuses[0].value
            return this.getProjects.filter(proj => proj.status === activeProj)
        },
        ...mapGetters({
            getProjects: 'getProjects'
        })
    },
    methods: {
        ...mapActions({
            updateEntry: 'updateTimecardEntry'
        })
    },
    watch: {
        project () {
            this.loading = true
            const projectData = {
                'project': this.project,
                'id': this.entry.id
            }
            this.updateEntry(projectData)
                .then(() => this.loading = false)
                .catch(() => this.loading = false)
        },
    },
    props: {
        entry: Object,
    }
}
</script>
