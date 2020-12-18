<template>
    <v-container>
            <div class="d-flex flex-no-wrap justify-space-around align-center mb-5">
                <span class="text-h3">Projects</span>
                <v-btn @click="createModalStatus(true)" color="green" fab><v-icon color="white">{{ createIcon }}</v-icon></v-btn>
            </div>
        <v-row dense justify="center">
            <v-col cols="12" lg="7" v-for="project in projects" :key="project.id">
                <v-card shaped @click="updateProject(project)">
                    <div class="d-flex flex-no-wrap justify-space-between align-center">
                        <div class="mx-lg-5">
                            <v-card-title class="headline">
                                {{ project.name }}
                            </v-card-title>
                            <v-card-subtitle>
                                {{ project.description }}
                            </v-card-subtitle>
                        </div>
                        <v-avatar class="mr-lg-5 mr-3 my-3" size="100" rounded v-if="project.project_images.length">
                            <v-img :src="featuredImage(project)" aspect-ratio="1"></v-img>
                        </v-avatar>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <create-project :showModal="projectCreateModal" @status="createModalStatus"></create-project>
        <edit-project :showModal="projectEditModal" @status="editModalStatus"></edit-project>
    </v-container>
</template>

<script>
import { mapMutations } from 'vuex'
import createProject from '@/components/projects/create'
import editProject from '@/components/projects/edit'

export default {
    data () {
        return {
            currProject: null,
            createIcon: 'mdi-plus',
            projectCreateModal: false,
            projectEditModal: false
        }
    },
    methods: {
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
        }
    },
    props: {
        projects: Array
    },
    components: {
        'create-project': createProject,
        'edit-project': editProject
    }
}
</script>
