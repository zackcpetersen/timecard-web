<template>
    <v-btn
        v-if="selected.length"
        @click="updateEntries"
        class="ml-4"
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
            this.selected.forEach(entry => newEntries.entries.push(entry.id))
            this.entryStatusUpdate(newEntries)
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
