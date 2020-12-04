<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app temporary>
            <NavDrawer />
        </v-navigation-drawer>
        <v-app-bar app fixed>
            <v-app-bar-nav-icon x-large @click.stop="drawer = !drawer" />
        </v-app-bar>
        <v-main>
            <v-container fill-height>
                <router-view></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import NavDrawer from "@/components/NavDrawer"

export default {
    components: {
        NavDrawer
    },

    data: () => ({
        drawer: false
    }),
};
</script>

<style>

</style>
