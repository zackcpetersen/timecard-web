<template>
    <v-btn @click="exportTable" color="primary">Export Table</v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions({
            entryCsvExport: 'entryCsvExport'
        }),
        exportTable () {
            this.entryCsvExport(this.filters)
        }
    },
    props: {
        filters: Object,
    }
}
</script>
