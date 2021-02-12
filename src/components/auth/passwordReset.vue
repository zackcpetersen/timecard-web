<template>
    <v-dialog v-model="showModal" max-width="600px" persistent>
        <v-card>
            <v-card-title>
                <span class="headline">Change Password - {{ currUser.email }}</span>
            </v-card-title>
            <v-card-text>
                <v-form v-model="valid" ref="form">
                    <!-- TODO add rules for password security -->
                    <v-text-field prepend-icon="mdi-lock" v-model="password" label="New Password" type="password"></v-text-field>
                    <v-text-field prepend-icon="mdi-lock" v-model="confirmPassword" label="Confirm Password" type="password"></v-text-field>
                    <v-btn @click="closeModal">Close</v-btn>
                    <v-btn v-if="passMatch" @click="submitForm" color="primary" class="ml-2">Change Password</v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            valid: true,
            password: '',
            confirmPassword: ''
        }
    },
    computed: {
        passMatch () {
            return (this.password === this.confirmPassword && !!this.password)
        }
    },
    methods: {
        ...mapActions({
            resetPassword: 'resetPassword'
        }),
        closeModal () {
            this.$emit('status', false)
        },
        submitForm () {
            if (this.$refs.form.validate()) {
                const passData = {
                    new_password: this.password,
                    confirm_password: this.confirmPassword
                }
                this.resetPassword(passData)
                    .then(() => {
                        this.password = ''
                        this.confirmPassword = ''
                        if (this.redirect) {
                            this.$router.push({ name: 'Timecard' })
                        } else {
                            this.closeModal()
                        }
                    })
            }
        }
    },
    props: {
        currUser: Object,
        showModal: Boolean,
        redirect: Boolean
    }
}
</script>
