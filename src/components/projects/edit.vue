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
                    <span class="headline ml-5">Edit Project</span>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Name" v-model="projName"></v-text-field>
                            <v-textarea label="Description" outlined rows="3" v-model="projDesc"></v-textarea>
                            <!-- TODO add image button-->
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
                            v-if="!!name && !!description"
                        >Update</v-btn>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data () {
        return {
            name: '',
            description: ''
            // TODO add rules as mixin!
        }
    },
    computed: {
        ...mapGetters({
            project: 'getCurrentProject'
        }),
        projName: {
            get () {
                return this.project.name
            },
            set (val) {
                this.name = val
            }
        },
        projDesc: {
            get () {
                return this.project.description
            },
            set (val) {
                this.description = val
            }

        }
    },
    methods: {
        ...mapActions({
            updateProject: 'updateProject'
        }),
        closeModal () {
            this.$emit('status', false)
        },
        submit () {
            const projData = {
                'name': this.name,
                'description': this.description,
                'id': this.project.id
            }
            this.updateProject(projData)
                .then(this.closeModal())
        }
    },
    props: {
        showModal: Boolean
    }
}
</script>

<style scoped>

</style>