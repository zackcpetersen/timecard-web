<template>
    <v-dialog
        v-model="showModal"
        persistent
        max-width="800px"
        transition="slide-y-reverse-transition"
    >
        <v-card>
            <v-card-title>
                <v-row justify-lg="space-between" justify-sm="center">
                    <span class="headline">Edit Project Details</span>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Name" v-model="name"></v-text-field>
                            <v-textarea label="Description" outlined rows="3" v-model="description"></v-textarea>
                            <image-list :images="images"></image-list>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-btn @click="projDelete" class="white--text" color="red">REMOVE</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="closeModal"
                        >Close</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="submit"
                            v-if="saveEnabled"
                        >Update</v-btn>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import imageList from '@/components/imageList'

export default {
    data () {
        return {
            projName: '',
            projDesc: ''
            // TODO add rules as mixin!
        }
    },
    computed: {
        ...mapGetters({
            project: 'getCurrentProject',
        }),
        saveEnabled () {
            return this.name !== this.projName || this.description !== this.projDesc
        },
        images () {
            return this.project.project_images
        },
        name: {
            get () {
                return this.project.name
            },
            set (val) {
                this.projName = val
            }
        },
        description: {
            get () {
                return this.project.description
            },
            set (val) {
                this.projDesc = val
            }
        }
    },
    watch: {
        project () {
            this.projName = this.name
            this.projDesc = this.description

        }
    },
    methods: {
        ...mapActions({
            updateProject: 'updateProject',
            deleteProject: 'deleteProject'
        }),
        closeModal () {
            this.$emit('status', false)
        },
        projDelete () {
            this.deleteProject(this.project.id)
                .then(this.closeModal())
        },
        submit () {
            const projData = {
                'name': this.projName,
                'description': this.projDesc,
                'id': this.project.id
            }
            this.updateProject(projData)
                .then(this.closeModal())
        }
    },
    props: {
        showModal: Boolean
    },
    components: {
        'image-list': imageList
    }
}
</script>

<style scoped>

</style>