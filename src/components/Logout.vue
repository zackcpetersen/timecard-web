<template>
    <v-btn @click="logout" color="error"><v-icon>{{ icon }}</v-icon> Logout</v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            icon: 'mdi-location-exit'
        }
    },
    methods: {
        ...mapActions({ logout: 'authLogout' })
    }
}
</script>
