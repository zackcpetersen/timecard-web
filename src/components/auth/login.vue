<template>
    <v-row justify="center">
        <v-card elevation="12" outlined shaped style="width: 80%">

            <v-card-title><p>Login</p></v-card-title>

            <v-card-text>
                <v-form v-model="valid" ref="form" @submit.prevent="submitForm">

                    <v-text-field
                        prepend-inner-icon="mdi-account"
                        v-model="email"
                        :rules="emailRules"
                        placeholder="Email Address"
                        required
                        @input="btnColor = 'primary'">
                    </v-text-field>

                    <v-text-field
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :rules="passwordRules"
                        placeholder="Password"
                        required
                        @input="btnColor = 'primary'">
                    </v-text-field>

                    <v-btn @click="submitForm" :color="btnColor" class="mt-3">Login</v-btn>
                </v-form>

                <v-snackbar
                    v-model="snackbar.show"
                    :color="snackbar.color"
                    :timeout="snackbar.timeout"
                    :multi-line="true"
                    absolute
                    shaped
                    style="margin-top: 7em;"
                >
                    <span class="error--text">{{ snackbar.error }}</span>
                    <template v-slot:action="{ attrs }">
                        <v-btn
                            color="red"
                            text
                            @click="snackbar = false"
                            v-bind="attrs"
                        >Close</v-btn>
                    </template>
                </v-snackbar>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data () {
        return {
            valid: true,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length <= 99 || 'Password must be less than 99 characters',
                v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
            ],
            btnColor: 'primary',
            snackbar: {
                show: false,
                error: '',
                timeout: 4000,
                color: 'white',
            }
        }
    },
    computed: {
        ...mapGetters({
            formStatus: 'getAuthStatus'
        })
    },
    methods: {
        ...mapActions({ login: 'authLogin' }),
        submitForm () {
            if (this.$refs.form.validate()) {
                this.login({
                    username: this.email,
                    password: this.password
                }).catch(error => {
                    if (error.response) {
                        if (error.response.status === 400) {
                            this.snackbar.error = 'Invalid Email or Password'
                            this.snackbar.show = true
                            this.btnColor = 'error'
                        }
                    } else {
                        this.snackbar.error = error
                        this.snackbar.show = true
                    }
                })
            }
        },
        resetValidation() {
            this.$refs.form.resetValidation()
        }
    }
}
</script>
