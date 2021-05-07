<template>
    <v-dialog
        v-model="showModal"
        persistent
        max-width="600px"
        transition="slide-y-reverse-transition"
    >
        <v-card>
            <v-card-title>
                <v-row justify="space-between">
                    <span class="headline ml-5">Add Project</span>
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
                                    counter="50"
                                    :rules="nameRules"
                                    class="mb-3"
                                ></v-text-field>
                                <v-textarea
                                    label="Description"
                                    outlined
                                    rows="3"
                                    v-model="description"
                                    counter="250"
                                    :rules="descriptionRules"
                                ></v-textarea>
                                <v-select
                                    :items="types"
                                    item-value="id"
                                    item-text="name"
                                    label="Project Type"
                                    v-model="projectType"
                                >
                                </v-select>
                            </v-form>
                            <v-btn
                                color="primary"
                                @click="projTypeModalStatus(true)"
                            >
                                <v-icon class="mr-1">mdi-plus</v-icon>New Project Type
                            </v-btn>
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
                            :loading="loading"
                            :disabled="!name || !projectType"
                        >Create</v-btn>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
        <project_types :showModal="projectTypeModal" @status="projTypeModalStatus"></project_types>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { rules } from '@/mixins/rules'
import projectTypes from '@/components/projects/projectTypes'

export default {
    data () {
        return {
            name: '',
            description: '',
            projectType: '',
            valid: true,
            projectTypeModal: false,
            loading: false
        }
    },
    methods: {
        ...mapActions({
            createProject: 'createProject'
        }),
        projTypeModalStatus (value) {
            this.projectTypeModal = value
        },
        closeModal () {
            this.$emit('status', false)
            this.loading = false
        },
        submit () {
            if (this.$refs.form.validate()) {
                this.loading = true
                const projData = {
                    name: this.name,
                    description: this.description,
                    type: this.projectType
                }
                this.createProject(projData)
                    .then(() => {
                        this.name = ''
                        this.description = ''
                        this.projectType = ''
                        this.$refs.form.resetValidation()
                        this.closeModal()
                    }).catch(() => this.loading = false)
            }
        }
    },
    mixins: [rules],
    props: {
        showModal: Boolean,
        types: Array
    },
    components: {
        'project_types': projectTypes
    }
}
</script>
