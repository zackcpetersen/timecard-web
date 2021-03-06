<template>
    <v-row justify="space-around" align="start" style="height: 100%" class="px-3 mt-md-5 pt-md-5 mt-xl-16 pt-xl-16">
        <v-card outlined>
            <v-card-title class="ml-5 headline d-flex justify-space-between">
                <span>Entries</span>
            </v-card-title>
            <v-card-actions class="d-flex justify-center font-weight-regular">
                <v-col cols="12" md="10">
                    <span class="d-flex justify-center title font-italic font-weight-regular">Choose Filters</span>
                    <v-divider class="my-5"></v-divider>
                    <v-row justify="space-around" class="px-5">
                        <v-col cols="10" sm="6" md="4" lg="3">
                            <update-date
                                v-model="startDate"
                                label="Start Date"
                                icon="mdi-calendar"
                                :allowedDates="allowedStartDates"
                            ></update-date>
                            <v-spacer></v-spacer>
                        </v-col>
                        <v-col cols="10" sm="6" md="4" lg="3">
                            <update-date
                                v-model="endDate"
                                label="End Date"
                                icon="mdi-calendar"
                                :allowedDates="allowedEndDates"
                            ></update-date>
                        </v-col>

                        <v-col cols="10" sm="6" md="4" lg="3">
                            <project-filter v-model="projectList"></project-filter>
                            <v-spacer></v-spacer>
                        </v-col>
                        <v-col cols="10" sm="6" md="4" lg="3">
                            <status-filter v-model="statusList"></status-filter>
                            <v-spacer></v-spacer>
                        </v-col>
                        <v-col v-if="isAdmin" cols="10" sm="6" md="4" lg="3">
                            <user-filter v-model="userList"></user-filter>
                            <v-spacer></v-spacer>
                    </v-col>
                    </v-row>
                </v-col>
            </v-card-actions>
            <v-card-text>
                <v-col cols="12">
                    <v-row justify="center">
                        <v-card class="rounded-lg pt-2" max-width="95%">
                            <v-data-table
                                v-model="selected"
                                :headers="headers"
                                :items="userEntries"
                                item-key="id"
                                sort-by="date"
                                sort-desc
                                group-by="date"
                                group-desc
                                show-select
                                :loading="loading"
                                loading-text="Loading... Please wait"
                                no-results-text="No Matching Entries Found"
                                dense
                                class="px-2"
                            >
                                <template v-slot:top>
                                    <csv-export v-if="isAdmin" :entryIds="currentEntryIds" :startDate="startDate" :endDate="endDate"></csv-export>
                                    <entry-status
                                        :selected="selected"
                                        status="approved"
                                        color="success"
                                        btnText="Approve Entries"
                                        @entriesUpdated="clearStatus"
                                        :isAdmin="isAdmin"
                                    ></entry-status>
                                    <entry-status
                                        :selected="selected"
                                        status="flagged"
                                        color="error"
                                        btnText="Flag Entries"
                                        @entriesUpdated="clearStatus"
                                        :isAdmin="isAdmin"
                                    ></entry-status>
                                </template>
                                <template v-slot:item.status="{ item }">
                                    <span :class="`${status(item.status).color}--text`">{{ status(item.status).type }}</span>
                                </template>
                                <template v-slot:item.project="{ item }">
                                    <span class="d-flex flex-wrap">{{ item.project }}</span>
                                </template>
                                <template v-slot:item.actions="{ item }">
                                    <v-icon color="primary" class="mr-2" @click="editEntry(item)">mdi-pencil</v-icon>
                                </template>
                            </v-data-table>
                        </v-card>
                        <edit-entry
                            :isSuperuser="isSuperUser"
                            :isAdmin="isAdmin"
                            :showModal="entryEditModal"
                            @status="editModalStatus"
                        ></edit-entry>
                    </v-row>
                </v-col>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import editEntry from '@/components/entries/edit'
import entryConstants from '@/constants/entries'
import entryCsvExport from '@/components/entries/csvExport'
import entryStatusUpdate from '@/components/entries/entryStatusUpdate'
import projectFilter from '@/components/entries/projectFilter'
import statusFilter from '@/components/entries/statusFilter'
import updateDate from '@/components/entries/updateDate'
import userFilter from '@/components/entries/userFilter'

export default {
    data () {
        return {
            selected: [],
            entryEditModal: false,
            dialogDelete: false,
            userEntries: [],
            currentEntryIds: [],
            projectList: [],
            apiProjList: [],
            nullProjects: true,
            allProjects: true,
            statusList: [],
            userList: [],
            startDate: null,
            endDate: null,
        }
    },
    methods: {
        ...mapActions({
            fetchEntries: 'fetchEntries'
        }),
        ...mapMutations({
            setCurrentEntry: 'SET_CURRENT_ENTRY'
        }),
        allowedStartDates (val) {
            return val <= this.endDate
        },
        allowedEndDates (val) {
            return val >= this.startDate
        },
        editModalStatus (val) {
            this.entryEditModal = val
        },
        editEntry (tableEntry) {
            // Set currentEntry in state to item
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
        },
        backendDate (date) {
            const formatted = date.replace(/-/g, '/').replace(/T.+/, '')
            return new Date(formatted).toLocaleDateString('en-CA')
        },
        fetchNewEntries () {
            const data = {
                start_date: this.startDate,
                end_date: this.endDate
            }
            this.loading = true
            this.fetchEntries(data)
                .then(() => this.loading = false)
                .catch(() => this.loading = false)
        }
    },
    computed: {
        ...mapGetters({
            currUser: 'getCurrentUser'
        }),
        isAdmin () {
            return this.currUser.is_admin
        },
        isSuperUser () {
            return this.currUser.is_superuser
        },
        headers () {
            return [
                { text: 'User', value: 'user', align: 'start' },
                {
                    text: 'User Id', value: 'userId', align: ' d-none', width: 0, filter: user => {
                        return this.userList.length ? this.userList.includes(user) : true
                    }
                },
                {
                    text: 'Date', value: 'date', width: 105, filter: date => {
                        return date >= this.startDate && this.endDate >= date
                    }
                },
                { text: 'Start Time', value: 'start_time', width: 105, sortable: false },
                { text: 'End Time', value: 'end_time', width: 105, sortable: false },
                { text: 'Time Paused', value: 'time_paused' },
                { text: 'Time Worked', value: 'time_worked' },
                { text: 'Project', value: 'project', width: 105 },
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
        startDate () {
            let earliestEntry = null
            if (this.entries.length) {
                earliestEntry = new Date(this.entries[this.entries.length - 1].start_time).toLocaleDateString('en-CA')
            }
            if (this.backendDate(this.startDate) < earliestEntry || !earliestEntry) {
                this.fetchNewEntries()
            }
        },
        endDate () {
            let latestEntry = null
            if (this.entries.length) {
                latestEntry = new Date(this.entries[0].start_time).toLocaleDateString('en-CA')
            }
            if (this.backendDate(this.endDate) > latestEntry || !latestEntry) {
                this.fetchNewEntries()
            }
        },
        projectList () {
            this.apiProjList = [...this.projectList]
            const index = this.apiProjList.indexOf(null)
            if (index > -1 || !this.apiProjList.length) {
                this.apiProjList.splice(index, 1)
                this.nullProjects = true
            } else {
                this.nullProjects = false
            }
            this.allProjects = !this.apiProjList.length && index === -1;
        },
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
        },
        selected () {
            this.currentEntryIds = this.selected.map(entry => {
                return entry.id
            })
        }
    },
    props: {
        entries: Array,
        loading: Boolean
    },
    components: {
        'csv-export': entryCsvExport,
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
