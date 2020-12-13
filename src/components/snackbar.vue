<template>
    <v-snackbar
        v-model="show"
        :color="color"
        :timeout="timeout"
        :multi-line="true"
        shaped
        app
        elevation="3"
    >
        <v-icon class="mr-6">{{ snackbar.icon }}</v-icon>
        <span class="white--text text-subtitle-1">{{ snackbar.heading }}</span>
        <br>
        <span class="black--text">{{ snackbar.message }}</span>
        <template v-slot:action="{ attrs }">
            <v-btn
                text
                @click="show = false"
                v-bind="attrs"
            ><v-icon color="black">{{ icon }}</v-icon></v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    data () {
        return {
            timeout: 7000,
            color: 'red',
            icon: 'mdi-close',
        }
    },
    computed: {
        show: {
            get () {
                return this.snackbar.show
            },
            set (val) {
                this.snackbar.show = val
            }

        }
    },
    props: {
        snackbar: Object
    }
}
</script>
