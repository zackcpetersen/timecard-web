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

            <pause :clockedIn="clockedIn"
                   :entry="entry"
                   :paused="paused"
            ></pause>

            <uploadImage
                v-if="clockedIn && entryProject"
                :entry="entry"
            />

            <projectSelect :clockedIn="clockedIn"
                           :projects="projects"
                           :entry="entry"
            ></projectSelect>

        </v-form>
    </v-col>
</template>

<script>
import clockInOut from '@/components/timecard/clockInOut'
import pause from '@/components/timecard/pause'
import projectSelect from '@/components/timecard/projectSelect'
import uploadImage from '@/components/timecard/uploadImage'

export default {
    data () {
        return {
            valid: true,
            error: '',
        }
    },
    computed: {
        clockedIn () {
            return !!this.entry.start_time && !this.entry.end_time
        },
        paused () {
            return !!this.entry.start_pause && !this.entry.end_pause
        },
        entryProject () {
            return !!this.entry.project
        },
        formattedDate() {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            return new Date().toLocaleDateString('en-US', options)
        }
    },
    components: {
        clockInOut: clockInOut,
        pause: pause,
        projectSelect: projectSelect,
        uploadImage: uploadImage
    },
    props: {
        entry: Object,
        projects: Array
    }
}
</script>
