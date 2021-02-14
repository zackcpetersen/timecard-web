<template>
    <div>
        <v-row justify="center" class="mb-2">
            <v-btn
                color="secondary"
                style="width: 13em;"
                v-if="clockedIn"
                v-model="pause"
                @click="pauseToggle"
                ripple x-large rounded text
                elevation="3"
                :loading="loading"
            >
                <v-row justify="start"><v-col cols="auto"><v-icon color="primary">{{ activePause.icon }}</v-icon></v-col></v-row>
                <v-row><v-col cols="auto">{{ activePause.text }}</v-col></v-row>
            </v-btn>
        </v-row>
        <v-row justify="center">
            <p v-if="paused && clockedIn" class="mb-0">Paused: {{ pauseTimeFormatted }}</p>
        </v-row>
        <v-row justify="center">
            <p v-if="timePaused && clockedIn">Total Pause Time: {{ durationFormatted }}</p>
        </v-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import entryConstants from '@/constants/entries'

export default {
    data () {
        return {
            pausedData: {text: 'Resume', icon: 'mdi-play-circle-outline'},
            unPausedData: {text: 'Pause', icon: 'mdi-pause-circle-outline'},
            pause: this.paused,
            loading: false
        }
    },
    methods: {
        ...mapActions({
            startPause: 'startPause',
            endPause: 'endPause',
        }),
        pauseToggle () {
            if (!this.paused) {
                this.loading = true
                this.startPause({})
                    .then(() => this.loading = false)
                    .catch(() => this.loading = false)
            } else {
                this.loading = true
                this.endPause({})
                    .then(() => this.loading = false)
                    .catch(() => this.loading = false)
            }
        }
    },
    computed: {
        timePaused () {
            return !!this.entry.time_paused_secs
        },
        pauseTimeFormatted () {
            return entryConstants.localeTime(this.entry.start_pause)
        },
        durationFormatted () {
            return entryConstants.durationFormatted(this.entry.time_paused_secs)
        },
        activePause () {
            return this.paused ? this.pausedData : this.unPausedData
        },
    },
    props: {
        entry: Object,
        clockedIn: Boolean,
        paused: Boolean
    }
}
</script>
