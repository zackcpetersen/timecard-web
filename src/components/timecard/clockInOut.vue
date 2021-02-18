<template>
    <div>
        <v-row justify="center" class="mb-2 mt-8">
            <v-btn
                color="secondary"
                style="width: 13em;"
                v-model="clockIn"
                @click="clockInToggle"
                ripple x-large rounded text
                elevation="3"
                :loading="loading"
            >
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
            loading: false,
            tmpEntry: null
        }
    },
    methods: {
        ...mapActions({
            startTime: 'startTime',
            endTime: 'endTime',
            addEntryLocation: 'addEntryLocation'
        }),
        clockInToggle () {
            if (!this.clockedIn) {
                this.loading = true
                this.startTime({})
                    .then(() => {
                        this.loading = false
                        this.geoLocate()
                    })
                    .catch(() => this.loading = false)
            } else {
                this.loading = true
                this.endTime()
                    .then(() => {
                        this.loading = false
                        this.geoLocate()
                    })
                    .catch(() => this.loading = false)
            }
        },
        geoSuccess (position) {
            const geoData = {
                entry: this.tmpEntry.id,
                loc_latitude: position.coords.latitude.toFixed(6),
                loc_longitude: position.coords.longitude.toFixed(6)
            }
            this.addEntryLocation(geoData)
        },
        geoError (error) {
            console.log(error)
            const geoErrors = {
                entry: this.tmpEntry.id,
                loc_errors: error.message
            }
            this.addEntryLocation(geoErrors)
        },
        geoLocate () {
            const options = {
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 30000
            }
            navigator.geolocation.getCurrentPosition(this.geoSuccess, this.geoError, options)
        }
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
    watch: {
        entry () {
            if (this.entry.id) {
                this.tmpEntry = { ...this.entry }
            }
        }
    },
    props: {
        entry: Object,
        clockedIn: Boolean
    }
}
</script>
