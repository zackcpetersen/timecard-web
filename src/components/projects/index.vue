<template>
    <v-row justify="center" align="start" style="height: 100%;" class="mt-sm-16 pt-sm-16">
        <v-card class="py-5 mx-2 mx-sm-4 rounded-lg" outlined width="100%">
            <v-card-title class="d-flex flex-no-wrap justify-sm-space-between justify-space-around align-center mx-md-10 mx-sm-1">
                <span class="text-h3">Projects</span>
                <v-btn v-if="isAdmin" @click="createModalStatus(true)" color="green" fab><v-icon color="white">{{ createIcon }}</v-icon></v-btn>
            </v-card-title>
            <v-card-actions class="d-flex flex-wrap justify-start ml-md-10 ml-sm-5" style="max-width: 600px;">
                <v-text-field
                    v-model="search"
                    class="ma-4"
                    label="Search Projects"
                    prepend-inner-icon="mdi-magnify"
                    color="primary"
                ></v-text-field>
                <v-select
                    label="Project Status"
                    :items="statuses"
                    v-model="projStatus"
                    prepend-inner-icon="mdi-filter-outline"
                    class="ma-4"
                ></v-select>
                <v-select
                    label="Project Types"
                    :items="projectTypes"
                    v-model="projTypes"
                    prepend-inner-icon="mdi-filter-outline"
                    class="ma-4"
                    item-text="name"
                    item-value="id"
                    multiple
                ></v-select>
            </v-card-actions>
            <v-divider class="mb-5 mx-5"></v-divider>
            <v-card-text v-if="filteredProjects.length">
                <v-row dense justify="center">
                    <v-col cols="11" xl="8" v-for="project in visiblePages" :key="project.id">
                        <v-card @click="updateProject(project)" class="rounded-md">
                            <div class="d-flex flex-no-wrap justify-space-between align-center">
                                <div class="mx-md-5">
                                    <v-card-title class="headline">
                                        {{ project.name }}
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <span class="d-block">{{ project.type_name }}</span>
                                        <span :class="`d-block ${status(project.status).color}--text`"
                                        >{{ status(project.status).status }}</span>
                                        <span class="d-block">{{ project.description }}</span>
                                    </v-card-subtitle>
                                </div>
                                <v-avatar class="mr-md-5 mr-3 my-3" size="80" rounded v-if="project.project_images.length">
                                    <v-img :src="featuredImage(project)" aspect-ratio="1"></v-img>
                                </v-avatar>
                            </div>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-pagination :length="pageNums" v-model="page" :total-visible="6" class="mt-3"></v-pagination>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-text v-else class="d-flex flex-wrap justify-center text-h4 font-weight-light">
                <span>No Projects!</span>
            </v-card-text>
            <create-project v-if="isAdmin" :showModal="projectCreateModal" :types="projectTypes" @status="createModalStatus"></create-project>
            <edit-project :currUser="currUser" :showModal="projectEditModal" :types="projectTypes" @status="editModalStatus"></edit-project>
        </v-card>
    </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import createProject from '@/components/projects/create'
import editProject from '@/components/projects/edit'
import projectConstants from '@/constants/projects'

export default {
    data () {
        return {
            currProject: null,
            createIcon: 'mdi-plus',
            projectCreateModal: false,
            projectEditModal: false,
            search: '',
            page: 1,
            pageLength: 10,
            projStatus: 'active',
            statuses: projectConstants.statuses,
            projTypes: ''
        }
    },
    computed: {
        ...mapGetters({
            projectTypes: 'getProjectTypes',
            currUser: 'getCurrentUser'
        }),
        filteredByStatus () {
            return this.projects.filter(proj => proj.status === this.projStatus)
        },
        filteredByType () {
            return this.filteredByStatus.filter(proj => this.projTypes.includes(proj.type))
        },
        filteredProjects () {
            return this.filteredByType.filter(proj => {
                return proj.name.toLowerCase().includes(this.search.toLowerCase())
                    || proj.description.toLowerCase().includes(this.search.toLowerCase())
            })
        },
        pageNums () {
            return Math.ceil(this.filteredProjects.length / this.pageLength)
        },
        visiblePages () {
            return this.filteredProjects.slice((this.page - 1) * this.pageLength, this.page * this.pageLength)
        },
        isAdmin () {
            return this.currUser.is_admin
        }
    },
    methods: {
        ...mapActions({
            fetchProjectTypes: 'fetchProjectTypes'
        }),
        ...mapMutations({
            setCurrentProject: 'SET_CURRENT_PROJECT'
        }),
        createModalStatus (value) {
            this.projectCreateModal = value
        },
        editModalStatus (value) {
            this.projectEditModal = value
        },
        updateProject (project) {
            this.setCurrentProject(project)
            this.editModalStatus(true)
        },
        featuredImage(project) {
            let featured = project.project_images.filter(proj => proj.featured)[0]
            if (!featured) {
                featured = project.project_images[0]
            }
            return featured.image
        },
        status (projStatus) {
            const color = projStatus === 'active' ? 'green' : 'warning'
            return {status: projStatus[0].toUpperCase() + projStatus.slice(1), color: color}
        }
    },
    watch: {
        projectTypes () {
            if (this.projectTypes.length) {
                const typeIds = []
                this.projectTypes.forEach(type => typeIds.push(type.id))
                this.projTypes = typeIds
            }
        }
    },
    created () {
        this.fetchProjectTypes()
    },
    mixins: [projectConstants],
    props: {
        projects: Array
    },
    components: {
        'create-project': createProject,
        'edit-project': editProject
    }
}
</script>
