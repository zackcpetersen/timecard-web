<template>
    <v-row justify="center">
        <v-col cols="12" md="10">
            <v-row justify="space-around" class="px-5">
                <v-col cols="10" sm="6" md="4" lg="3">
                    <update-date v-model="startDate" label="Start Date" icon="mdi-calendar"></update-date>
                    <v-spacer></v-spacer>
                </v-col>
                <v-col cols="10" sm="6" md="4" lg="3">
                    <update-date v-model="endDate" label="End Date" icon="mdi-calendar"></update-date>
                </v-col>

                <v-col cols="10" sm="6" md="4" lg="3">
                    <project-filter v-model="projectList"></project-filter>
                    <v-spacer></v-spacer>
                </v-col>
                <v-col cols="10" sm="6" md="4" lg="3">
                    <status-filter v-model="statusList"></status-filter>
                    <v-spacer></v-spacer>
                </v-col>
                <v-col cols="10" sm="6" md="4" lg="3">
                    <user-filter v-model="userList"></user-filter>
                    <v-spacer></v-spacer>
            </v-col>
            </v-row>
        </v-col>
        <v-col cols="12">
        <v-row justify="center">
        <v-card class="rounded-lg" max-width="95%">
            <v-card-title>
                <v-col cols="12" md="6">
                Entries
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="12" md="6">
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                </v-col>
            </v-card-title>
            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="userEntries"
                :search="search"
                item-key="id"
                group-by="user"
                sort-by="date"
                sort-desc
                show-select
                :loading="loading"
                loading-text="Loading... Please wait"
                no-results-text="No Matching Entries Found"
                dense
                class="px-2"
            >
                <template v-slot:top>
                    <entry-status
                        :selected="selected"
                        status="approved"
                        color="success"
                        btnText="Approve Entries"
                        @entriesUpdated="clearStatus"
                    ></entry-status>
                    <entry-status
                        :selected="selected"
                        status="flagged"
                        color="error"
                        btnText="Flag Entries"
                        @entriesUpdated="clearStatus"
                    ></entry-status>
                </template>
                <template v-slot:item.status="{ item }">
                    <span :class="`${status(item.status).color}--text`">{{ status(item.status).type }}</span>
                </template>
                <template v-slot:item.project="{ item }">
                    <span class="d-block text-truncate" style="max-width: 100px">{{ item.project }}</span>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editEntry(item)">mdi-pencil</v-icon>
                </template>
            </v-data-table>
        </v-card>
        <edit-entry :showModal="entryEditModal" @status="editModalStatus"></edit-entry>
    </v-row>
        </v-col>
    </v-row>
</template>

<script>
import { mapMutations } from 'vuex'
import editEntry from '@/components/entries/edit'
import entryConstants from '@/constants/entries'
import entryStatusUpdate from '@/components/entries/entryStatusUpdate'
import projectFilter from '@/components/entries/projectFilter'
import statusFilter from '@/components/entries/statusFilter'
import updateDate from '@/components/entries/updateDate'
import userFilter from '@/components/entries/userFilter'

export default {
    data () {
        return {
            search: '',
            loading: true,
            selected: [],
            entryEditModal: false,
            dialogDelete: false,
            userEntries: [],
            projectList: [],
            statusList: [],
            userList: [],
            startDate: null,
            endDate: null,
        }
    },
    methods: {
        ...mapMutations({
            setCurrentEntry: 'SET_CURRENT_ENTRY'
        }),
        editModalStatus (val) {
            this.entryEditModal = val
        },
        editEntry (tableEntry) {
            // set currentEntry in state to item
            const currEntry = this.entries.filter(entry => entry.id === tableEntry.id)[0]
            this.setCurrentEntry(currEntry)
            this.editModalStatus(true)
        },
        durationFormatted (time_paused) {
            return entryConstants.durationFormatted(time_paused)
        },
        status (status) {
            return entryConstants.status(status)
        },
        dateTime (datetime) {
            return entryConstants.displayLocaleDateTime(datetime)
        },
        fullName (entry) {
            return entry.user.first_name + ' ' + entry.user.last_name
        },
        clearStatus () {
            this.selected = []
        },
        formattedDate (numDays) {
            const today = new Date()
            today.setDate(today.getDate() - numDays)
            return today.toLocaleDateString('en-CA')
        }
    },
    computed: {
        headers () {
            return [
                { text: 'User', value: 'user', align: 'start' },
                {
                    text: 'User Id', value: 'userId', align: ' d-none', filter: user => {
                        return this.userList.length ? this.userList.includes(user) : true
                    }
                },
                {
                    text: 'Date', value: 'date', filter: date => {
                        return date >= this.startDate && this.endDate >= date
                    }
                },
                { text: 'Start Time', value: 'start_time', sortable: false },
                { text: 'End Time', value: 'end_time', sortable: false },
                { text: 'Time Paused', value: 'time_paused' },
                { text: 'Time Worked', value: 'time_worked' },
                { text: 'Project', value: 'project' },
                {
                    text: 'Project Id', value: 'project_id', align: ' d-none', filter: project => {
                        return this.projectList.length ? this.projectList.includes(project) : true
                    }
                },
                {
                    text: 'Status', value: 'status', filter: status => {
                        return this.statusList.length ? this.statusList.includes(status) : true
                    }
                },
                { text: 'Created', value: 'created_at' },
                { text: 'Updated', value: 'updated_at' },
                { text: 'Actions', value: 'actions', sortable: false, filterable: false}
            ]
        },
    },
    watch: {
        entries () {
            this.userEntries = this.entries.map(entry => {
                const formattedEntry = {}
                const entryDate = new Date(entry.start_time)
                formattedEntry['id'] = entry.id
                formattedEntry['user'] = this.fullName(entry)
                formattedEntry['userId'] = entry.user.id
                formattedEntry['date'] = entryDate.toLocaleDateString('en-CA')
                formattedEntry['start_time'] = entryDate.toLocaleTimeString()
                formattedEntry['end_time'] = entry.end_time ? new Date(entry.end_time).toLocaleTimeString() : null
                formattedEntry['time_paused'] = this.durationFormatted(entry.time_paused_secs)
                formattedEntry['time_worked'] = this.durationFormatted(entry.time_worked_secs)
                formattedEntry['project'] = entry.project_name
                formattedEntry['project_id'] = entry.project
                formattedEntry['status'] = entry.status
                formattedEntry['created_at'] = this.dateTime(entry.created_at)
                formattedEntry['updated_at'] = this.dateTime(entry.updated_at)

                return formattedEntry
            })
            this.loading = false
        }
    },
    props: {
        entries: Array
    },
    components: {
        'edit-entry': editEntry,
        'entry-status': entryStatusUpdate,
        'project-filter': projectFilter,
        'status-filter': statusFilter,
        'update-date': updateDate,
        'user-filter': userFilter
    },
    created () {
        this.startDate = this.formattedDate(14)
        this.endDate = this.formattedDate(0)
    }
}
</script>
