<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app temporary v-if="layout">
            <nav-drawer />
        </v-navigation-drawer>
        <v-app-bar app fixed v-if="layout">
            <v-app-bar-nav-icon class="ml-5" x-large @click.stop="drawer = !drawer" />
        </v-app-bar>
        <v-main>
            <v-container>
                <router-view />
                <snackbar :snackbar="currentSnackbar"></snackbar>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import navDrawer from '@/components/navDrawer'
import snackbar from '@/components/snackbar'

export default {
    data () {
        return {
            drawer: false
        }
    },
    methods: {
        ...mapActions({
            fetchCurrentUser: 'fetchCurrentUser',
            fetchUsers: 'fetchUsers'
        }),
        getUserData () {
            if (this.authenticated) {
                this.fetchCurrentUser()
                this.fetchUsers()
            }
        }
    },
    computed: {
        ...mapGetters({
            currentSnackbar: 'getSnackbarMessage',
            authenticated: 'isAuthenticated',
            currUser: 'getCurrentUser'
        }),
        layout () {
            return (this.$route.meta.layout !== 'simple')
        }
    },
    created () {
        this.getUserData()
    },
    watch: {
        authenticated () {
            this.getUserData()
        },
        currUser () {
            if (!this.currUser.pass_valid) {
                this.$router.push({ name: 'PasswordReset' })
            }
        }
    },
    components: {
        'nav-drawer': navDrawer,
        'snackbar': snackbar
    }
}
</script>
