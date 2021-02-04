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
                    <span class="headline ml-5">Add User</span>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-form ref="form" v-model="valid">
                                <v-text-field
                                    label="First name"
                                    v-model="firstName"
                                    counter="50"
                                    :rules="nameRules"
                                    class="mb-3"
                                ></v-text-field>
                                <v-text-field
                                    label="Last name"
                                    v-model="lastName"
                                    counter="50"
                                    :rules="nameRules"
                                    class="mb-3"
                                ></v-text-field>
                                <v-text-field
                                    label="Email"
                                    v-model="email"
                                    counter="50"
                                    :rules="emailRules"
                                    class="mb-3"
                                ></v-text-field>
                                <v-checkbox v-model="admin" label="Admin" class="d-inline-block"></v-checkbox>
                                <v-checkbox v-model="superuser" label="Owner" class="d-inline-block ml-5"></v-checkbox>
                            </v-form>
                            <div class="d-flex justify-center mt-5">
                            <v-btn v-if="canSubmit" :loading="loading" text color="blue darken-1" @click="submit" class="mx-2">Save</v-btn>
                            <v-btn text color="blue darken-1" @click="closeModal" class="mx-2">Close</v-btn>
                            </div>
                        </v-col>
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
            valid: true,
            firstName: '',
            lastName: '',
            email: '',
            admin: false,
            superuser: false,
            loading: false,
        }
    },
    computed: {
        canSubmit () {
            return this.firstName && this.lastName && this.email && this.valid
        }
    },
    methods: {
        ...mapActions({
            createUser: 'createUser'
        }),
        submit () {
            if (this.$refs.form.validate()) {
                this.loading = true
                const userData = {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    email: this.email,
                    is_admin: this.admin,
                    is_superuser: this.superuser,
                    // TODO need to actually figure out password handling
                    password: 'admin'
                }
                this.createUser(userData)
                    .then(() => {
                        this.closeModal()
                        this.firstName = ''
                        this.lastName = ''
                        this.email = ''
                        this.admin = false
                        this.superuser = false
                        this.$refs.form.resetValidation()
                    })
                this.loading = false
            }
        },
        closeModal () {
            this.$emit('status', false)
        },
    },
    mixins: [rules],
    props: {
        showModal: Boolean
    }
}
</script>
