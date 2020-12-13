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
            <clock-in-out
                :clockedIn="clockedIn"
                :entry="entry"
            ></clock-in-out>

            <pause :clockedIn="clockedIn"
                   :entry="entry"
                   :paused="paused"
            ></pause>

            <upload-image
                v-if="clockedIn && entryProject"
                :entry="entry"
            ></upload-image>

            <project-select :clockedIn="clockedIn"
                           :entry="entry"
            ></project-select>
        </v-form>
        <image-list :entryId="entry.id"></image-list>
    </v-col>
</template>

<script>
import clockInOut from '@/components/timecard/clockInOut'
import imageList from '@/components/timecard/imageList'
import pause from '@/components/timecard/pause'
import projectSelect from '@/components/timecard/projectSelect'
import uploadImage from '@/components/timecard/uploadImage'

export default {
    data () {
        return {
            valid: true,
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
        'clock-in-out': clockInOut,
        'image-list': imageList,
        'pause': pause,
        'project-select': projectSelect,
        'upload-image': uploadImage
    },
    props: {
        entry: Object,
    }
}
</script>
