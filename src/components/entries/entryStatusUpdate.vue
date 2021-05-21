<template>
    <v-btn
        v-if="isAdmin"
        :disabled="!selected.length"
        @click="updateEntries"
        class="ml-2 my-1"
        :color="color"
        :loading="loading"
    >{{ btnText }}</v-btn>
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
            entryStatusUpdate: 'entryStatusUpdate'
        }),
        emitEntries () {
            this.loading = false
            this.$emit('entriesUpdated')
        },
        updateEntries () {
            const newEntries = { entries: [], status: this.status }
            this.selected.forEach(entry => {
                if (entry.end_time) {
                    newEntries.entries.push(entry.id)
                }
            })
            if (newEntries.entries.length) {
                this.loading = true
                this.entryStatusUpdate(newEntries)
                    .then(() => this.emitEntries())
                    .catch(() => this.loading = false)
            }
        }
    },
    props: {
        selected: Array,
        color: String,
        status: String,
        btnText: String,
        isAdmin: Boolean,
    }
}
</script>
