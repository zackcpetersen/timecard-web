<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app temporary>
            <NavDrawer />
        </v-navigation-drawer>
        <v-app-bar app fixed>
            <v-app-bar-nav-icon x-large @click.stop="drawer = !drawer" />
        </v-app-bar>
        <v-content>
            <Timecard />
        </v-content>
    </v-app>
</template>

<script>
import Timecard from "@/components/Timecard"
import NavDrawer from "@/components/NavDrawer"

export default {
    components: {
        Timecard,
        NavDrawer
    },

    data: () => ({
        drawer: false
    }),
};
</script>

<style>

</style>
