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
                    <span class="headline">Edit Project</span>
                    <v-btn @click="projDelete" class="white--text" color="red">REMOVE</v-btn>
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
                                ></v-text-field>
                                <v-textarea
                                    label="Description"
                                    outlined
                                    rows="3"
                                    v-model="description"
                                    :rules="descriptionRules"
                                    counter="250"
                                ></v-textarea>
                            </v-form>
                            <upload-image :imgData="projImgData" class="mb-5"></upload-image>
                            <image-list :images="images" :allowFeatured="true"></image-list>
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
import uploadImage from '@/components/images/uploadImage'

export default {
    data () {
        return {
            projName: '',
            projDesc: '',
            valid: true
        }
    },
    computed: {
        ...mapGetters({
            project: 'getCurrentProject',
            getImagesByProject: 'getImagesByProject'
        }),
        saveEnabled () {
            return this.name !== this.projName || this.description !== this.projDesc
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
            if (this.$refs.form.validate()) {
                const projData = {
                    'name': this.projName,
                    'description': this.projDesc,
                    'id': this.project.id
                }
                this.updateProject(projData)
                    .then(this.closeModal())
            }
        }
    },
    props: {
        showModal: Boolean
    },
    mixins: [rules],
    components: {
        'image-list': imageList,
        'upload-image': uploadImage
    }
}
</script>
