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
                    <span v-if="creating" class="headline ml-5">Add User</span>
                    <span v-else class="headline ml-5">Update User</span>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-img
                                v-if="editableUser.image"
                                :src="editableUser.image"
                                class="rounded-circle"
                                max-height="100px;"
                            ></v-img>
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
                                <div v-if="isSuperuser">
                                    <v-checkbox :disabled="adminDisabled" v-model="admin" label="Admin" class="d-inline-block"></v-checkbox>
                                    <v-checkbox v-model="superuser" label="Owner" class="d-inline-block ml-5"></v-checkbox>
                                </div>
                                <v-btn v-if="!creating">{{ imgButtonText }}</v-btn>
                            </v-form>
                            <div class="d-flex justify-center mt-5">
                                <v-btn text color="blue darken-1" @click="closeModal" class="mx-2">Close</v-btn>
                                <v-btn v-if="canSubmit" :loading="loading" text color="blue darken-1" @click="submit" class="mx-2">Save</v-btn>
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
            adminDisabled: false,
            superuser: false,
            loading: false,
        }
    },
    computed: {
        imgButtonText () {
            return this.editableUser.image ? 'Update Image' : 'Add Image'
        },
        canSubmit () {
            if (this.isSuperuser) {
                return this.firstName && this.lastName && this.email && this.valid
            }
            return this.firstName && this.lastName // TODO && this.image
        }
    },
    methods: {
        ...mapActions({
            createUser: 'createUser',
            updateUser: 'updateUser'
        }),
        submit () {
            if (this.$refs.form.validate()) {
                this.loading = true

                // TODO add as form data for image
                const userData = {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    email: this.email,
                    is_admin: this.admin,
                    is_superuser: this.superuser,
                    // TODO need to actually figure out password handling
                    password: 'admin'
                }
                if (this.editableUser.id) {
                    userData['id'] = this.editableUser.id
                }
                if (this.image) {
                    userData['image'] = this.image
                }
                if (this.creating) {
                    this.createUser(userData)
                        .then(() => {
                            this.closeModal()
                            this.clearForm()
                        })
                } else {
                    this.updateUser(userData)
                        .then(() => {
                            this.closeModal()
                            this.clearForm()
                        })
                }
                this.loading = false
            }
        },
        clearForm () {
            this.firstName = ''
            this.lastName = ''
            this.email = ''
            this.admin = false
            this.superuser = false
            this.$refs.form.resetValidation()
        },
        closeModal () {
            this.$emit('status', false)
        },
    },
    watch: {
        superuser () {
            this.admin = this.superuser
            this.adminDisabled = this.superuser
        },
        editableUser () {
            if (this.editableUser) {
                this.firstName = this.editableUser.first_name
                this.lastName = this.editableUser.last_name
                this.email = this.editableUser.email
                this.admin = this.editableUser.is_admin
                this.superuser = this.editableUser.is_superuser
            }
        }
    },
    mixins: [rules],
    props: {
        showModal: Boolean,
        isSuperuser: Boolean,
        editableUser: {
            type: Object,
            required: false
        },
        creating: Boolean
    }
}
</script>
