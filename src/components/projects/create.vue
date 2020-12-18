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
                            </v-form>
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
import { rules } from '@/mixins/rules'

export default {
    data () {
        return {
            name: '',
            description: '',
            valid: true
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
            if (this.$refs.form.validate()) {
                const projData = {
                    'name': this.name,
                    'description': this.description
                }
                this.createProject(projData)
                    .then(this.closeModal())
            }
        }
    },
    mixins: [rules],
    props: {
        showModal: Boolean
    }
}
</script>
