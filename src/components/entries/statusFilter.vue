<template>
    <v-autocomplete
        v-model="statusList"
        :items="statuses"
        item-text="name"
        item-value="id"
        multiple
        label="Status"
    >
        <template v-slot:prepend>
            <v-icon color="primary">mdi-check-box-outline</v-icon>
        </template>
    </v-autocomplete>
</template>

<script>
export default {
    data () {
        return {
            statusList: [],
            statuses: [
                { name: 'Active', id: 'active' },
                { name: 'Approved', id: 'approved' },
                { name: 'Needs Approval', id: 'needs_approval' },
                { name: 'Flagged', id: 'flagged' },
            ],
        }
    },
    watch: {
        statusList () {
            this.$emit('input', this.statusList)
        }
    },
    props: {
        value: null
    }
}
</script>
