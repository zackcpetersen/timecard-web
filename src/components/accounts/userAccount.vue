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
                    <span v-else class="headline ml-5">Update User - {{ editableUser.full_name }}</span>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-row justify="center" v-if="editableUser.image">
                                <v-avatar size="150">
                                    <v-img
                                    :src="editableUser.image"
                                ></v-img>
                                </v-avatar>
                            </v-row>
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
                                <v-btn v-if="objectOwner" @click="resetPasswordModal(true)" class="d-block mb-2">Change Password</v-btn>
                                <upload-image v-if="!creating" :imgButtonText="imgButtonText" :user="editableUser" class="d-block"></upload-image>
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
        <password-reset :currUser="currUser" :showModal="passwordModalStatus" @status="resetPasswordModal" :redirect="false"></password-reset>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { rules } from '@/mixins/rules'

import passwordReset from '@/components/auth/passwordReset'
import userImage from '@/components/accounts/userImage'

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
            image: null,
            passwordModalStatus: false,
        }
    },
    computed: {
        imgButtonText () {
            return this.editableUser.image ? 'Update Image' : 'Add Image'
        },
        objectOwner () {
            return this.currUser.id === this.editableUser.id
        },
        canSubmit () {
            if (this.creating) {
                return this.firstName && this.lastName && this.email && this.valid
            }
            return (this.firstName !== this.editableUser.first_name)
                || (this.lastName !== this.editableUser.last_name)
                || (this.email !== this.editableUser.email)
                || (this.admin !== this.editableUser.is_admin)
                || (this.superuser !== this.editableUser.is_superuser)
                && this.valid
        }
    },
    methods: {
        ...mapActions({
            createUser: 'createUser',
            updateUser: 'updateUser',
            superUserUpdate: 'superUserUpdateUser'
        }),
        resetPasswordModal (val) {
            this.passwordModalStatus = val
        },
        submit () {
            if (this.$refs.form.validate()) {
                this.loading = true
                const userData = new FormData()
                userData.append('id', this.editableUser.id ? this.editableUser.id : null)
                userData.append('first_name', this.firstName)
                userData.append('last_name', this.lastName)
                userData.append('email', this.email)
                userData.append('is_admin', this.admin)
                userData.append('is_superuser', this.superuser)
                if (this.creating) {
                    this.createUser(userData)
                        .then(() => {this.clearForm()})
                        .catch(() => this.loading = false)
                } else if (this.isSuperuser) {
                    this.superUserUpdate(userData)
                        .then(() => {this.clearForm()})
                        .catch(() => this.loading = false)
                } else {
                    this.updateUser(userData)
                        .then(() => {this.clearForm()})
                        .catch(() => this.loading = false)
                }
            }
        },
        clearForm () {
            this.closeModal()
            this.firstName = ''
            this.lastName = ''
            this.email = ''
            this.admin = false
            this.superuser = false
            this.image = null
            this.$refs.form.resetValidation()
            this.loading = false
        },
        closeModal () {
            this.$emit('status', false)
        },
    },
    updated () {
        if (!this.firstName && this.editableUser.id) {
            this.firstName = this.editableUser.first_name
            this.lastName = this.editableUser.last_name
            this.email = this.editableUser.email
            this.admin = this.editableUser.is_admin
            this.superuser = this.editableUser.is_superuser
        }
    },
    watch: {
        superuser () {
            this.admin = this.superuser
            this.adminDisabled = this.superuser
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
        currUser: Object,
        creating: Boolean
    },
    components: {
        'upload-image': userImage,
        'password-reset': passwordReset
    }
}
</script>
