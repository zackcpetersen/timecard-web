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
            this.entryCsvExport({entries: this.entryIds})
                .then(() => this.loading = false)
                .catch(() => this.loading = false)
        }
    },
    props: {
        entryIds: Array,
    }
}
</script>
