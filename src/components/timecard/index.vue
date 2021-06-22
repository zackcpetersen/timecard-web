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
                :loading="loading"
            ></clock-in-out>
            <v-expand-transition>
                <pause v-if="clockedIn"
                       :clockedIn="clockedIn"
                       :entry="entry"
                       :paused="paused"
                ></pause>
            </v-expand-transition>
            <v-expand-transition>
                <upload-image
                    v-if="clockedIn && entryProject"
                    :imgData="entryImgData"
                ></upload-image>
            </v-expand-transition>
            <v-expand-transition>
                <project-select
                    v-if="clockedIn"
                    :entry="entry"
                ></project-select>
            </v-expand-transition>
            <v-expand-transition>
                <v-row justify="center">
                    <v-col lg="5" md="6" sm="6">
                        <v-textarea
                            v-if="clockedIn"
                            v-model="entryComment"
                            label="Add comments here"
                            outlined
                            clearable
                            rows="4"
                            counter="255"
                            :loading="updateCommentLoading"
                            dense
                        ></v-textarea>
                    </v-col>
                </v-row>
            </v-expand-transition>
            <v-slide-x-transition>
                <div class="d-flex justify-center">
                    <v-btn
                        v-if="entryCommentChanged"
                        color="primary"
                        @click="updateComment"
                        class="mb-8"
                    >Update Comment</v-btn>
                </div>
            </v-slide-x-transition>
        </v-form>
        <v-expand-transition>
            <image-list :canEdit="true" :images="images" :allowFeatured="false"></image-list>
        </v-expand-transition>
    </v-col>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { successfulSnackbar } from '@/mixins/snackbar-messages'
import clockInOut from '@/components/timecard/clockInOut'
import imageList from '@/components/images/imageList'
import pause from '@/components/timecard/pause'
import projectSelect from '@/components/timecard/projectSelect'
import uploadImage from '@/components/images/uploadImage'

export default {
    data () {
        return {
            valid: true,
            entryComment: null,
            updateCommentLoading: false,
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
        },
        entryCommentChanged: {
            get() {
                if (this.entry.comments) {
                    return this.entryComment !== this.entry.comments
                }
                return !!this.entryComment
            },
            set(value) {
                return value
            }
        },
    },
    methods: {
        ...mapActions({
            updateEntry: 'updateEntry'
        }),
        updateComment () {
            this.updateCommentLoading = true
            const updatedEntry = {...this.entry}
            updatedEntry.comments = this.entryComment
            this.updateEntry(updatedEntry)
                .then(() => {
                    this.$store.commit('SET_CURRENT_ENTRY', updatedEntry)
                    this.updateCommentLoading = false
                    successfulSnackbar({content: 'Comment Updated Successfully'})
                }).catch(() => this.updateCommentLoading = false)
        }
    },
    watch: {
        entry () {
            this.entryComment = this.entry.comments ? this.entry.comments : null
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
        loading: Boolean
    }
}
</script>
