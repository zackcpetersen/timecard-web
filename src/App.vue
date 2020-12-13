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
                <snackbar :snackbar="this.currentSnackbar"></snackbar>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import navDrawer from '@/components/navDrawer'
import snackbar from '@/components/snackbar'

export default {
    computed: {
        ...mapGetters({
            currentSnackbar: 'getSnackbarMessage'
        }),
        layout () {
            return (this.$route.meta.layout !== 'simple')
        }
    },
    components: {
        'nav-drawer': navDrawer,
        'snackbar': snackbar
    },
    data: () => ({
        drawer: false
    }),
}
</script>
