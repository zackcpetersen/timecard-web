<template>
    <div>
        <v-row justify="center" class="mb-2 mt-8">
            <v-btn color="secondary"
                   style="width: 13em;"
                   v-model="clockIn"
                   @click="clockInToggle"
                   ripple x-large rounded text
                   elevation="3">
                <v-row justify="start"><v-col cols="auto"><v-icon color="primary">{{ activeClock.icon }}</v-icon></v-col></v-row>
                <v-row><v-col cols="auto">{{ activeClock.text }}</v-col></v-row>
            </v-btn>
        </v-row>
        <v-row justify="center">
            <p v-if="clockedIn">Clocked In: {{ startTimeFormatted }}</p>
        </v-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            clockIn: this.clockedIn,
            clockedInData: {text: 'Clock-In', icon: 'mdi-clock-time-nine-outline'},
            clockedOutData: {text: 'Clock-Out', icon: 'mdi-stop-circle-outline'},
        }
    },
    methods: {
        ...mapActions({
            startTime: 'startTime',
            endTime: 'endTime'
        }),
        clockInToggle () {
            if (!this.clockedIn) {
                this.startTime({})
            } else {
                this.endTime()
            }
        },
    },
    computed: {
        activeClock () {
            return this.clockedIn ? this.clockedOutData : this.clockedInData
        },
        startTimeFormatted () {
            const time = new Date(this.entry.start_time)
            return time.toLocaleTimeString()
        },
    },
    props: {
        entry: Object,
        clockedIn: Boolean
    }
}
</script>
