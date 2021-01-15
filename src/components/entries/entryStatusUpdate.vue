<template>
    <v-btn
        v-if="selected.length"
        @click="updateEntries"
        class="ml-4 mb-2"
        :color="color"
    >{{ btnText }}</v-btn>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions({
            entryStatusUpdate: 'entryStatusUpdate'
        }),
        updateEntries () {
            // could pass loading = true to parent
            const newEntries = { entries: [], status: this.status }
            this.selected.forEach(entry => {
                if (entry.end_time) {
                    newEntries.entries.push(entry.id)
                }
            })
            if (newEntries.entries.length) {
                this.entryStatusUpdate(newEntries)
                    .then(this.$emit('entriesUpdated'))
            }
        }
    },
    props: {
        selected: Array,
        color: String,
        status: String,
        btnText: String
    }
}
</script>
