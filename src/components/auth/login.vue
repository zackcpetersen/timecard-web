<template>
    <v-row justify="center">
        <v-card elevation="12" outlined shaped style="width: 80%">

            <v-card-title>Login</v-card-title>

            <v-card-text>
                <v-form v-model="valid" ref="form" @submit.prevent="submitForm">

                    <v-text-field
                        prepend-inner-icon="mdi-account"
                        v-model="email"
                        :rules="emailRules"
                        placeholder="Email Address"
                        required
                    >
                    </v-text-field>

                    <v-text-field
                        prepend-inner-icon="mdi-lock"
                        type="password"
                        v-model="password"
                        :rules="passwordRules"
                        placeholder="Password"
                        required
                    >
                    </v-text-field>
                    <v-slide-x-transition>
                        <v-btn v-if="loginEnabled" @click="submitForm" color="primary" class="mt-3" :loading="loading">Login</v-btn>
                    </v-slide-x-transition>
                </v-form>
                <v-btn v-if="showForgotPass" text small @click="forgotPass" class="mt-5">Forgot Password?</v-btn>
                <div>{{ passResetMsg }}</div>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { rules } from '@/mixins/rules'

export default {
    data () {
        return {
            valid: true,
            email: '',
            password: '',
            loading: false,
            passResetMsg: '',
            showForgotPass: true
        }
    },
    computed: {
        loginEnabled () {
            return !!this.email && !!this.password && this.valid
        }
    },
    methods: {
        ...mapActions({
            login: 'authLogin',
            resetPass: 'forgotPassword'
        }),
        forgotPass () {
            if (/.+@.+\..+/.test(this.email)) {
                const data = { email: this.email }
                this.resetPass(data).then(() => {
                    this.passResetMsg = `Check ${this.email} for a temporary password`
                    this.showForgotPass = false
                })
            } else {
                this.passResetMsg = 'Enter your email above to reset your password'
            }
        },
        submitForm () {
            this.loading = true
            if (this.$refs.form.validate()) {
                this.login({
                    username: this.email,
                    password: this.password
                }).then(() => {
                    this.password = ''
                })
            }
            this.loading = false
        }
    },
    mixins: [rules]
}
</script>
