<template>
    <entries :entries="entries"></entries>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import entries from '@/components/entries/index'

export default {
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
        this.fetchEntries()
    },
    components: {
        'entries': entries
    }
}
</script>
