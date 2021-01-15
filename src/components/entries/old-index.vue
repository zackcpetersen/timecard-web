<template>
    <v-row justify="center" class="mx-md-4 mx-1">
        <v-card class="py-6 rounded-lg" outlined>
            <v-card-title class="d-flex flex-wrap justify-sm-space-between justify-space-around align-center mx-md-10 mx-sm-1">
                <span class="text-h3">Entries</span>
            </v-card-title>
    <!--        <v-card-actions>-->

    <!--        </v-card-actions>-->
            <v-divider class="my-5 mx-1"></v-divider>
            <v-card-text>
                <v-row dense justify="center">
                    <v-col cols="12" md="6" v-for="entry in entries" :key="entry.id">
                        <v-card class="rounded-md" min-height="100px" @click="updateEntry(entry)">
                            <div class="d-flex flex-no-wrap justify-space-between align-center">
                                <div style="max-width: 50%">
                                    <v-card-title class="headline d-block">
                                        <span>{{ entryUser(entry) }}</span>
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <span class="d-block">{{ entryProject(entry) }}</span>
                                        <span class="d-block">{{ formattedDate(entry) }}</span>
                                        <span :class="`d-block ${ status(entry.status).color }--text font-italic`">{{ status(entry.status).type }}</span>
                                    </v-card-subtitle>
                                </div>
                                <div style="max-width: 50%">
                                    <v-card-text>
                                        <span class="d-block d-flex justify-md-end justify-sm-start pb-1">
                                            Clocked-In: {{ formattedTime(entry.start_time) }}
                                        </span>
                                        <span class="d-block d-flex justify-md-end justify-sm-start pb-1" v-if="entry.end_time">
                                            Clocked-Out: {{ formattedTime(entry.end_time) }}
                                        </span>
                                        <span class="d-block d-flex justify-md-end justify-sm-start pb-1" v-if="entry.time_paused_secs">
                                            Time Paused: {{ formattedDuration(entry.time_paused_secs) }}
                                        </span>
                                        <span class="d-block d-flex justify-md-end justify-sm-start" v-if="entry.time_worked">
                                            Time Worked: {{ formattedDuration(entry.time_worked) }}
                                        </span>
                                    </v-card-text>
                                </div>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <edit-entry :showModal="entryEditModal" @status="editModalStatus"></edit-entry>
    </v-row>
</template>

<script>
import { mapMutations } from 'vuex'
import editEntry from '@/components/entries/edit'
import entryConstants from '@/constants/entries'

export default {
    data () {
        return {
            entryEditModal: false
        }
    },
    methods: {
        ...mapMutations({
            setCurrentEntry: 'SET_CURRENT_ENTRY',
            addSnack: 'ADD_SNACKBAR'
        }),
        editModalStatus (value) {
            this.entryEditModal = value
        },
        entryUser (entry) {
            return entry.user.first_name + ' ' + entry.user.last_name[0] + '.'
        },
        formattedDate (entry) {
            const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
            return new Date(entry.start_time).toLocaleDateString('en-US', options)
        },
        entryProject (entry) {
            if (entry.project_name) {
                return entry.project_name
            }
            return 'No Project'
        },
        formattedTime (time) {
            if (time) {
                return new Date(time).toLocaleTimeString()
            }
        },
        formattedDuration (duration) {
            return new Date(duration * 1000).toISOString().substr(11, 8)
        },
        updateEntry (entry) {
            if (entry.end_time) {
                this.setCurrentEntry(entry)
                this.editModalStatus(true)
            } else {
                this.addSnack({
                    color: 'red',
                    icon: 'mdi-alert-circle-outline',
                    heading: 'Cannot edit active entry',
                    show: true
                })
            }
        },
        status (status) {
            return entryConstants.status(status)
        }
    },
    props: {
        entries: Array
    },
    components: {
        'edit-entry': editEntry
    }
}
</script>
