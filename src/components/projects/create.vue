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
                            <v-text-field label="Name" v-model="name"></v-text-field>
                            <v-textarea label="Description" outlined rows="3" v-model="description"></v-textarea>
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
                        >Create</v-btn>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            name: '',
            description: ''
            // TODO add rules as mixin!
        }
    },
    methods: {
        ...mapActions({
            createProject: 'createProject'
        }),
        closeModal () {
            this.$emit('status', false)
        },
        submit () {
            const projData = {
                'name': this.name,
                'description': this.description
            }
            this.createProject(projData)
                .then(this.closeModal())
        }
    },
    props: {
        showModal: Boolean
    }
}
</script>
