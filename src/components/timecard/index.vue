<template>
    <v-col>
        <v-row justify="center">
            <p v-if="entry.user">Welcome {{ entry.user.first_name }}!</p>
            <p v-else>Welcome!</p>
        </v-row>
        <v-row justify="center">
            <p>Today is {{ formattedDate }}</p>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation>
            <clockInOut
                :clockedIn="clockedIn"
                :entry="entry"
            ></clockInOut>

            <v-row justify="center" class="mb-2">
                <v-btn color="secondary"
                       style="width: 13em;"
                       v-if="clockedIn"
                       v-model="paused"
                       @click="pauseToggle"
                       ripple x-large rounded text
                       elevation="3">
                    <v-row justify="start"><v-col cols="auto"><v-icon color="primary">{{ activePause.icon }}</v-icon></v-col></v-row>
                    <v-row><v-col cols="auto">{{ activePause.text }}</v-col></v-row>
                </v-btn>
            </v-row>
            <v-row justify="center">
                <p v-if="paused && clockedIn">Paused: {{ pauseTimeFormatted }}</p>
                <p v-if="timePaused && clockedIn">Pause Duration: {{ timePausedFormatted }}</p>
            </v-row>

            <v-row justify="center" class="mb-2">
                <uploadImage
                    v-if="clockedIn && entryProject"
                    :entry="entry"
                />
            </v-row>

            <v-row justify="center">
                <v-col cols="auto">
                    <v-select v-if="clockedIn"
                              v-model="activeProject"
                              :items="projects"
                              item-text="name"
                              item-value="id"
                              label="Select Project"
                    ></v-select>
                </v-col>
            </v-row>
        </v-form>
        <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
            :multi-line="true"
            shaped
        >
            <span class="error--text">{{ error }}</span>
            <template v-slot:action="{ attrs }">
                <v-btn
                    color="red"
                    text
                    @click="snackbar = false"
                    v-bind="attrs"
                >Close</v-btn>
            </template>
        </v-snackbar>
    </v-col>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import clockInOut from '@/components/timecard/clockInOut'
import uploadImage from '@/components/timecard/uploadImage'

export default {
    data () {
        return {
            valid: true,
            pausedData: {text: 'Resume', icon: 'mdi-play-circle-outline'},
            unPausedData: {text: 'Pause', icon: 'mdi-pause-circle-outline'},
            pause: this.paused,
            project: '',
            error: '',
            snackbar: {
                show: false,
                error: this.error,
                timeout: 4000,
                color: 'white',
            }
        }
    },
    methods: {
        ...mapActions({
            startPause: 'startPause',
            endPause: 'endPause',
            updateEntry: 'updateEntry'
        }),
        pauseToggle () {
            if (!this.paused) {
                this.startPause({}).then(() => {})
                    .catch(error => {
                        this.error = error
                })
            } else {
                this.endPause({}).then(() => {})
                    .catch(error => {
                        this.error = error
                })
            }
        }
    },
    computed: {
        ...mapGetters({
            currentProject: 'getCurrentProject'
        }),
        clockedIn () {
            return !!this.entry.start_time && !this.entry.end_time
        },
        paused () {
            return !!this.entry.start_pause && !this.entry.end_pause
        },
        timePaused () {
            if (this.entry.time_paused) {
                return this.entry.time_paused
            }
            return null
        },
        entryProject () {
            return !!this.entry.project
        },
        pauseTimeFormatted () {
            const time = new Date(this.entry.start_pause)
            return time.toLocaleTimeString()
        },
        timePausedFormatted () {
            return new Date(this.entry.time_paused * 1000).toISOString().substr(11, 8)
        },
        activePause () {
            return this.paused ? this.pausedData : this.unPausedData
        },
        activeProject: {
            get () {
                return this.projects.filter(proj => proj.id === this.entry.project)[0]
            },
            set (project) {
                this.project = project
            }
        },
        formattedDate() {
            const today = new Date()
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return today.toLocaleDateString('en-US', options)
        }
    },
    watch: {
        project () {
            const projectData = {
                'project': this.project,
                'id': this.entry.id
            }
            this.updateEntry(projectData)
        },
        error () {
            if (this.error) {
                this.snackbar.show = true
            }
        }
    },
    components: {
        clockInOut: clockInOut,
        uploadImage: uploadImage
    },
    props: {
        entry: Object,
        projects: Array
    }
}
</script>
