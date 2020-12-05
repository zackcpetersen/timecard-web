<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app temporary v-if="layout">
            <NavDrawer />
        </v-navigation-drawer>
        <v-app-bar app fixed v-if="layout">
            <v-row>
                <v-row>
                <v-app-bar-nav-icon class="ml-5" x-large @click.stop="drawer = !drawer" />
                </v-row>
                <v-row align-content="center" justify="end">
                    <Logout class="mr-5"></Logout>
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
import NavDrawer from "@/components/NavDrawer"
import Logout from '@/components/Logout'

export default {
    computed: {
        layout () {
            return (this.$route.meta.layout !== 'simple')
        }
    },
    components: {
        Logout,
        NavDrawer
    },
    data: () => ({
        drawer: false
    }),
}
</script>
