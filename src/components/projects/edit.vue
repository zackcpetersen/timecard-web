<template>
    <v-dialog
        v-model="showModal"
        persistent
        max-width="800px"
        transition="slide-y-reverse-transition"
    >
        <v-card>
            <v-card-title>
                <v-row justify="space-between" align="center">
                    <span v-if="!isAdmin" class="headline">Project Details</span>
                    <span v-else class="headline">Edit Project</span>
                    <v-btn v-if="isAdmin" @click="projDelete" class="white--text" color="red" :loading="loading">REMOVE</v-btn>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-form ref="form" v-model="valid">
                                <v-text-field
                                    label="Name"
                                    v-model="name"
                                    :rules="nameRules"
                                    counter="50"
                                    class="mb-3"
                                    :disabled="!isAdmin"
                                ></v-text-field>
                                <v-textarea
                                    label="Description"
                                    outlined
                                    rows="3"
                                    v-model="description"
                                    :rules="descriptionRules"
                                    counter="250"
                                    :disabled="!isAdmin"
                                ></v-textarea>
                                <v-select
                                    :items="types"
                                    item-value="id"
                                    item-text="name"
                                    label="Project Type"
                                    v-model="projectType"
                                    :disabled="!isAdmin"
                                >
                                </v-select>
                                <v-select
                                    label="Status"
                                    :items="statuses"
                                    v-model="projStatus"
                                    :disabled="!isAdmin"
                                ></v-select>
                            </v-form>
                            <upload-image v-if="isAdmin" :imgData="projImgData" class="mb-5"></upload-image>
                            <image-list :canEdit="isAdmin" :images="images" :allowFeatured="true"></image-list>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
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
                            :loading="loading"
                        >Update</v-btn>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { rules } from '@/mixins/rules'
import imageList from '@/components/images/imageList'
import projectConstants from '@/constants/projects'
import uploadImage from '@/components/images/uploadImage'

export default {
    data () {
        return {
            projName: '',
            projDesc: '',
            projStatus: '',
            projectType: '',
            valid: true,
            loading: false,
            statuses: projectConstants.statuses
        }
    },
    computed: {
        ...mapGetters({
            project: 'getCurrentProject',
            getImagesByProject: 'getImagesByProject'
        }),
        isAdmin () {
            return this.currUser.is_admin
        },
        saveEnabled () {
            return this.name !== this.projName
                || this.description !== this.projDesc
                || this.status !== this.projStatus
                || this.type !== this.projectType
        },
        images () {
            return this.getImagesByProject(this.project.id)
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
        },
        status: {
            get () {
                return this.project.status
            },
            set (val) {
                this.projStatus = val
            }
        },
        type: {
            get () {
                return this.project.type
            },
            set (val) {
                this.projectType = val
            }
        },
        projImgData () {
            return {
                'project': this.project.id,
            }
        }
    },
    watch: {
        project () {
            this.projName = this.name
            this.projDesc = this.description
            this.projStatus = this.status
            this.projectType = this.type
        }
    },
    methods: {
        ...mapActions({
            updateProject: 'updateProject',
            deleteProject: 'deleteProject'
        }),
        closeModal () {
            this.$emit('status', false)
            this.loading = false
        },
        projDelete () {
            this.loading = true
            this.deleteProject(this.project.id)
                .then(() => {
                    this.closeModal()
                }).catch(() => this.loading = false)
        },
        submit () {
            if (this.$refs.form.validate()) {
                this.loading = true
                const projData = {
                    name: this.projName,
                    description: this.projDesc,
                    status: this.projStatus.toLowerCase(),
                    type: this.projectType,
                    id: this.project.id
                }
                this.updateProject(projData)
                    .then(() => {
                        this.projName = ''
                        this.projDesc = ''
                        this.projStatus = ''
                        this.projectType = ''
                        this.id = ''
                        this.$refs.form.resetValidation()
                        this.closeModal()
                    }).catch(() => this.loading = false)
            }
        }
    },
    props: {
        showModal: Boolean,
        types: Array,
        currUser: Object
    },
    mixins: [rules, projectConstants],
    components: {
        'image-list': imageList,
        'upload-image': uploadImage,
    }
}
</script>
