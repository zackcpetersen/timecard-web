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
                        required>
                    </v-text-field>

                    <v-text-field
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :rules="passwordRules"
                        placeholder="Password"
                        required>
                    </v-text-field>

                    <v-btn @click="submitForm">Login</v-btn>

                </v-form>
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
            ]
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
                    this.error = error
                })
            }
        }
    }
}
</script>
