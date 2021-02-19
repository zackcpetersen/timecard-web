<template>
    <v-col>
        <v-row justify="center">
            <p>Welcome {{ currUser.first_name }}!</p>
        </v-row>
        <v-row justify="center">
            <p>Today is {{ formattedDate }}</p>
        </v-row>
        <v-form ref="form" v-model="valid" lazy-validation>
            <clock-in-out
                :clockedIn="clockedIn"
                :entry="entry"
            ></clock-in-out>
            <v-expand-transition group>
                <pause v-if="clockedIn"
                       :clockedIn="clockedIn"
                       :entry="entry"
                       :paused="paused"
                ></pause>
            </v-expand-transition>
            <v-expand-transition group>
                <upload-image
                    v-if="clockedIn && entryProject"
                    :imgData="entryImgData"
                ></upload-image>
            </v-expand-transition>
            <v-expand-transition group>
                <project-select
                    v-if="clockedIn"
                    :entry="entry"
                ></project-select>
            </v-expand-transition>
        </v-form>
        <v-expand-transition group>
            <image-list :canEdit="true" :images="images" :allowFeatured="false"></image-list>
        </v-expand-transition>
    </v-col>
</template>

<script>
import { mapGetters } from 'vuex'
import clockInOut from '@/components/timecard/clockInOut'
import imageList from '@/components/images/imageList'
import pause from '@/components/timecard/pause'
import projectSelect from '@/components/timecard/projectSelect'
import uploadImage from '@/components/images/uploadImage'

export default {
    data () {
        return {
            valid: true,
        }
    },
    computed: {
        ...mapGetters({
            getImagesByEntry: 'getImagesByEntry',
            currUser: 'getCurrentUser'
        }),
        isAdmin() {
            return this.currUser.is_admin
        },
        images () {
            return this.getImagesByEntry(this.entry.id)
        },
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
        },
        entryImgData () {
            return {
                'project': this.entry.project,
                'type': 'entry',
                'entryId': this.entry.id
            }
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
