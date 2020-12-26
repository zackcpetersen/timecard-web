<template>
    <v-dialog
        v-model="showModal"
        persistent
        max-width="800px"
        transition="slide-y-reverse-transition"
    >
        <v-card>
            <v-card-title class="d-flex justify-center align-center">
                <span class="headline">Edit Entry</span>
            </v-card-title>
            <v-card-text class="">
                <v-form ref="form" v-model="valid">
                    <v-row justify="center">
                        <v-col cols="10">
                            <update-date v-model="startDate" :rules="required" label="Entry Date" icon="mdi-calendar"></update-date>
                            <update-time v-model="startTime" :rules="required" label="Start Time" icon="mdi-clock-time-nine-outline"></update-time>
                            <update-time v-model="endTime" :rules="required" label="End Time" icon="mdi-clock-time-five-outline"></update-time>
                            <v-text-field
                                v-model="pauseTime"
                                label="Time Paused"
                                prepend-icon="mdi-pause-circle-outline"
                                placeholder="01:00:00"
                                :rules="durationRules"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
                <div class="d-flex justify-center">
                    <v-btn @click="closeModal" color="primary" text>Close</v-btn>
                    <v-btn @click="submitForm" v-if="saveEnabled" color="primary" text>Save</v-btn>
                </div>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { rules } from '@/mixins/rules'
import updateDate from '@/components/entries/updateDate'
import updateTime from '@/components/entries/updateTime'

export default {
    data () {
        return {
            valid: true,
            startDate: this.entryStartDay,
            startTime: this.entryStartTime,
            endTime: this.entryEndTime,
            pauseTime: this.entryTimePaused
        }
    },
    methods: {
        ...mapActions({
            updateEntry: 'updateEntry'
        }),
        formattedTime (time) {
            if (time) {
                time = new Date(time)
                return time.getHours() + ':' + time.getMinutes()
            }
        },
        formattedDuration (duration) {
            if (duration) {
                return new Date(duration * 1000).toISOString().substr(11, 8)
            }
        },
        closeModal () {
            this.$emit('status', false)
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
                const startTime = this.formatAPITime(this.startDate, this.startTime)
                const endTime = this.formatAPITime(this.startDate, this.endTime)

                const submitData = {
                    id: this.entry.id,
                    start_time: startTime,
                    end_time: endTime,
                    time_paused: this.pauseTime
                }
                this.updateEntry(submitData)
                    .then(this.closeModal())
            }
        }
    },
    computed: {
        ...mapGetters({
            entry: 'getCurrentEntry'
        }),
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
            return this.entryStartTime !== this.startTime
                || this.entryEndTime !== this.endTime
                || this.entryTimePaused !== this.pauseTime
                || this.entryStartDay !== this.startDate
        }
    },
    watch: {
        entry () {
            this.startDate = this.entryStartDay
            this.startTime = this.entryStartTime
            this.endTime = this.entryEndTime
            this.pauseTime = this.entryTimePaused
        }
    },
    mixins: [rules],
    props: {
        showModal: Boolean
    },
    components: {
        'update-time': updateTime,
        'update-date': updateDate
    }
}
</script>
