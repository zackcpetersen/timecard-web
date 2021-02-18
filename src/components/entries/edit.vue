<template>
    <v-dialog
        v-model="showModal"
        persistent
        max-width="800px"
        transition="slide-y-reverse-transition"
    >
        <v-card>
            <v-card-title class="d-flex justify-center align-center">
                <span class="headline">Edit Entry - {{ entryUser }}</span>
            </v-card-title>
            <!-- TODO Update project should be possible here -->
            <span v-if="entry.project_name" class="d-block d-flex justify-center">{{ entry.project_name }}</span>
            <span v-else class="d-block d-flex justify-center error--text">No Project Assigned</span>
            <span :class="`${status.color}--text d-block d-flex justify-center font-italic mb-2`">{{ status.type }}</span>
            <div v-if="isSuperuser">
                <span v-for="location in entry.locations" :key="location.id" class="d-flex justify-center align-center">
                    <v-btn text :href="gmapsLocation(location)" target="_blank" class="mx-2 text-overline">{{ formattedTime(location.created_at) }} - {{ location.loc_latitude }}, {{ location.loc_longitude }}</v-btn>
                </span>
            </div>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-row justify="center">
                        <v-col cols="10">
                            <v-textarea
                                v-if="isAdmin"
                                v-model="notes"
                                placeholder="Entry Notes"
                                outlined
                            ></v-textarea>
                            <update-date
                                v-model="startDate"
                                :rules="required"
                                label="Entry Date"
                                icon="mdi-calendar"
                                :disabled="!isAdmin"
                            ></update-date>
                            <update-time
                                v-model="startTime"
                                :rules="required"
                                label="Start Time"
                                icon="mdi-clock-time-nine-outline"
                                :disabled="!isAdmin"
                            ></update-time>
                            <update-time
                                v-model="endTime"
                                :rules="required"
                                label="End Time"
                                icon="mdi-clock-time-five-outline"
                                :disabled="!isAdmin"
                            ></update-time>
                            <v-text-field
                                v-model="pauseTime"
                                label="Time Paused"
                                prepend-icon="mdi-pause-circle-outline"
                                placeholder="01:00:00"
                                :rules="durationRules"
                                :disabled="!isAdmin"
                            ></v-text-field>
                            <span class="d-block d-flex justify-center">Created: {{ displayLocaleDateTime(entry.created_at) }}</span>
                            <span class="d-block d-flex justify-center">Updated: {{ displayLocaleDateTime(entry.updated_at) }}</span>
                        </v-col>
                    </v-row>
                </v-form>
                <div class="d-flex justify-center">
                    <v-btn @click="closeModal" color="primary" text>Close</v-btn>
                    <v-btn @click="submitForm" v-if="saveEnabled" color="primary" text :loading="loading">Save</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { rules } from '@/mixins/rules'
import entryConstants from '@/constants/entries'
import updateDate from '@/components/entries/updateDate'
import updateTime from '@/components/entries/updateTime'

export default {
    data () {
        return {
            valid: true,
            notes: '',
            startDate: '',
            startTime: '',
            endTime: '',
            pauseTime: '',
            loading: false,
        }
    },
    methods: {
        ...mapActions({
            updateEntry: 'updateEntry'
        }),
        gmapsLocation (location) {
            return 'https://www.google.com/maps/search/?api=1&query='
                + location.loc_latitude
                + ','
                + location.loc_longitude
        },
        formattedTime (time) {
            if (time) {
                time = new Date(time)
                return time.getHours() + ':' + time.getMinutes()
            }
        },
        displayLocaleDateTime (time) {
            return entryConstants.displayLocaleDateTime(time)
        },
        formattedDuration (duration) {
            if (duration) {
                return new Date(duration * 1000).toISOString().substr(11, 8)
            }
        },
        closeModal () {
            this.$emit('status', false)
            this.loading = false
        },
        formatAPITime (date, time) {
            const hour = time.split(':')[0]
            const minute = time.split(':')[1]

            const entryDate = new Date(date + 'T00:00:00')
            entryDate.setHours(hour)
            entryDate.setMinutes(minute)

            return entryDate
        },
        submitForm () {
            if (this.$refs.form.validate()) {
                this.loading = true
                const startTime = this.formatAPITime(this.startDate, this.startTime)
                const endTime = this.formatAPITime(this.startDate, this.endTime)

                const submitData = {
                    id: this.entry.id,
                    comments: this.notes,
                    start_time: startTime,
                    end_time: endTime,
                    time_paused: this.pauseTime
                }
                this.updateEntry(submitData)
                    .then(() => {this.closeModal()})
                    .catch(() => this.loading = false)
            }
        }
    },
    computed: {
        ...mapGetters({
            entry: 'getCurrentEntry'
        }),
        status () {
            return entryConstants.status(this.entry.status)
        },
        entryNotes () {
            return this.entry.comments
        },
        entryStartTime () {
            return this.formattedTime(this.entry.start_time)
        },
        entryEndTime () {
            return this.formattedTime(this.entry.end_time)
        },
        entryTimePaused () {
            if (this.entry.time_paused_secs) {
                return this.formattedDuration(this.entry.time_paused_secs)
            }
            return '00:00:00'
        },
        entryStartDay () {
            const entryStartDay = new Date(this.entry.start_time)
            return entryStartDay.toLocaleDateString('en-CA')
        },
        saveEnabled () {
            return this.entryNotes !== this.notes
                || this.entryStartTime !== this.startTime
                || this.entryEndTime !== this.endTime
                || this.entryTimePaused !== this.pauseTime
                || this.entryStartDay !== this.startDate
        },
        entryUser () {
            if (this.entry.user) {
                return this.entry.user.first_name + ' ' + this.entry.user.last_name[0] + '.'
            }
            return null
        },
    },
    watch: {
        entry () {
            this.notes = this.entryNotes
            this.startDate = this.entryStartDay
            this.startTime = this.entryStartTime
            this.endTime = this.entryEndTime
            this.pauseTime = this.entryTimePaused
        }
    },
    mixins: [rules],
    props: {
        showModal: Boolean,
        isAdmin: Boolean,
        isSuperuser: Boolean
    },
    components: {
        'update-time': updateTime,
        'update-date': updateDate
    }
}
</script>
