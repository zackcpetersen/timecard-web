<template>
    <v-snackbar
        v-model="show"
        :color="snackbar.color"
        :timeout="timeout"
        shaped
        elevation="3"
        transition="slide-y-reverse-transition"
    >
        <v-row align="center" justify="space-between" dense>
            <v-col cols="1">
                <v-row justify="center" dense>
                    <v-icon>{{ snackbar.icon }}</v-icon>
                </v-row>
            </v-col>
            <v-col cols="8">
                <v-row dense class="d-flex justify-space-around align-center">
                    <span class="white--text text-subtitle-1 font-weight-bold">{{ snackbar.heading }}</span>
                    <span class="white--text text-center">{{ snackbar.content }}</span>
                </v-row>
            </v-col>
            <v-col cols="1">
                <v-row justify="center" dense>
            <v-btn
                text
                @click="show = false"
            ><v-icon>{{ closeIcon }}</v-icon></v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-snackbar>
</template>

<script>
export default {
    data () {
        return {
            timeout: 7000,
            closeIcon: 'mdi-close',
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

<style scoped>
.v-snack.v-snack--top {
    bottom: auto;
}

.v-snack.v-snack--bottom {
    top: auto;
}
</style>
