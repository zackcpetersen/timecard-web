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
                        <v-btn v-if="loginEnabled" @click="submitForm" color="primary" class="mt-3">Login</v-btn>
                    </v-slide-x-transition>
                </v-form>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { rules } from '@/mixins/rules'

export default {
    data () {
        return {
            valid: true,
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters({
            formStatus: 'getAuthStatus'
        }),
        loginEnabled () {
            return !!this.email && !!this.password && this.valid
        }
    },
    methods: {
        ...mapActions({ login: 'authLogin' }),
        submitForm () {
            if (this.$refs.form.validate()) {
                this.login({
                    username: this.email,
                    password: this.password
                })
            }
        }
    },
    mixins: [rules]
}
</script>
