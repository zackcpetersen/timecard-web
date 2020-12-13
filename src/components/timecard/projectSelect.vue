<template>
    <div>
        <v-row justify="center">
            <v-col cols="auto">
                <v-select v-if="clockedIn"
                          v-model="activeProject"
                          :items="projects"
                          item-text="name"
                          item-value="id"
                          label="Select Project"
                ></v-select>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data () {
        return {
            project: ''
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
        ...mapGetters({
            projects: 'getProjects'
        })
    },
    methods: {
        ...mapActions({
            updateEntry: 'updateEntry'
        })
    },
    watch: {
        project () {
            const projectData = {
                'project': this.project,
                'id': this.entry.id
            }
            this.updateEntry(projectData)
        },
    },
    props: {
        entry: Object,
        clockedIn: Boolean,
    }
}
</script>
