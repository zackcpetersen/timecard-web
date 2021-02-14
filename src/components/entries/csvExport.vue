<template>
    <v-btn @click="exportTable" color="primary" :loading="loading">Export Table</v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            loading: false
        }
    },
    methods: {
        ...mapActions({
            entryCsvExport: 'entryCsvExport'
        }),
        exportTable () {
            this.entryCsvExport(this.filters)
                .then(() => this.loading = false)
                .catch(() => this.loading = false)
        }
    },
    props: {
        filters: Object,
    }
}
</script>
