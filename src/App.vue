<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app temporary v-if="layout">
            <nav-drawer />
        </v-navigation-drawer>
        <v-app-bar app fixed v-if="layout">
            <v-row>
                <v-row>
                <v-app-bar-nav-icon class="ml-5" x-large @click.stop="drawer = !drawer" />
                </v-row>
                <v-row align-content="center" justify="end">
                </v-row>
            </v-row>
        </v-app-bar>
        <v-main>
            <v-container fill-height>
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
            fetchCurrentUser: 'fetchCurrentUser'
        }),
    },
    computed: {
        ...mapGetters({
            currentSnackbar: 'getSnackbarMessage',
            authenticated: 'isAuthenticated'
        }),
        layout () {
            return (this.$route.meta.layout !== 'simple')
        }
    },
    created () {
        if (this.authenticated) {
            this.fetchCurrentUser()
        }
    },
    components: {
        'nav-drawer': navDrawer,
        'snackbar': snackbar
    }
}
</script>
