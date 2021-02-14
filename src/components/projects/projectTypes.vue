<template>
    <v-dialog
        v-model="showModal"
        persistent
        transition="slide-y-reverse-transition"
        max-width="300px"
    >
        <v-card>
            <v-card-title>
                <span class="headline d-flex justify-start">Project Type</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field v-model="newType" counter="50" :rules="nameRules" label="Name"></v-text-field>
                    <div class="d-flex justify-space-between">
                    <v-btn @click="submit" color="primary">Create</v-btn>
                    <v-btn text @click="closeModal" class="pa-0">Close</v-btn>
                    </div>
                </v-form>
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
            valid: true,
            newType: '',
            loading: false,
        }
    },
    methods: {
        ...mapActions({
            createType: 'createProjectType',
        }),
        closeModal () {
            this.$emit('status', false)
            this.loading = false
        },
        submit () {
            if (this.$refs.form.validate()) {
                this.loading = true
                const data = {
                    name: this.newType,
                    id: this.projType ? this.projType.id : null
                }
                this.createType(data)
                    .then(() => {
                        this.newType = ''
                        this.$refs.form.resetValidation()
                        this.closeModal()
                    }).catch(() => this.loading = false)
            }
        }
    },
    mixins: [rules],
    props: {
        projType: {
            type: Object,
            required: false
        },
        showModal: Boolean
    }
}
</script>
