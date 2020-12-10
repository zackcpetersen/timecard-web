<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app temporary v-if="layout">
            <navDrawer />
        </v-navigation-drawer>
        <v-app-bar app fixed v-if="layout">
            <v-row>
                <v-row>
                <v-app-bar-nav-icon class="ml-5" x-large @click.stop="drawer = !drawer" />
                </v-row>
                <v-row align-content="center" justify="end">
                    <logout class="mr-5"></logout>
                </v-row>
            </v-row>
        </v-app-bar>
        <v-main>
            <v-container fill-height>
                <router-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import navDrawer from "@/components/navDrawer"
import logout from '@/components/auth/logout'

export default {
    computed: {
        layout () {
            return (this.$route.meta.layout !== 'simple')
        }
    },
    components: {
        logout: logout,
        navDrawer: navDrawer
    },
    data: () => ({
        drawer: false
    }),
}
</script>
