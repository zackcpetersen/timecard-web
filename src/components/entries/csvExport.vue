<template>
    <v-btn
        @click="exportSelected"
        color="primary"
        :loading="loading"
        :disabled="!entryIds.length"
        class="ml-2 my-1"
    >Export Selected</v-btn>
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
        exportSelected () {
            const data = {
                entries: this.entryIds,
                start_date: this.startDate,
                end_date: this.endDate
            }
            this.entryCsvExport(data)
                .then(() => this.loading = false)
                .catch(() => this.loading = false)
        }
    },
    props: {
        entryIds: Array,
        startDate: String,
        endDate: String,
    }
}
</script>
