<template>
    <v-snackbar
        v-model="show"
        :color="color"
        :timeout="timeout"
        :multi-line="true"
        shaped
        app
        elevation="12"
    >
        <span class="error--text">{{ error }}</span>
        <template v-slot:action="{ attrs }">
            <v-btn
                color="red"
                text
                @click="show = false"
                v-bind="attrs"
            >Close</v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    data () {
        return {
            timeout: 4000,
            color: 'white'
        }
    },
    computed: {
        show () {
            return !!this.error;
        }
    },
    props: {
        error: String,
    }
}
</script>
