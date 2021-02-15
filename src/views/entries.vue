<template>
    <entries :entries="entries" :loading="loading"></entries>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import entries from '@/components/entries/index'

export default {
    data () {
        return {
            loading: false
        }
    },
    methods: {
        ...mapActions({
            fetchEntries: 'fetchEntries'
        })
    },
    computed: {
        ...mapGetters({
            entries: 'getEntries'
        })
    },
    created () {
        this.loading = true
        this.fetchEntries()
            .then(() => this.loading = false)
            .catch(() => this.loading = false)
    },
    components: {
        'entries': entries
    }
}
</script>
