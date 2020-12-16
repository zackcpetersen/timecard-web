<template>
    <v-dialog
        v-model="activeImg"
        persistent
        max-width="600px"
        transition="slide-y-reverse-transition"
    >
        <v-card>
            <v-card-title>
                <v-row justify="space-between">
                    <span class="headline ml-5">Edit Details</span>
                    <v-btn @click="imgDelete" class="mr-6 white--text" color="red">REMOVE</v-btn>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Name" v-model="name"></v-text-field>
                            <v-textarea label="Description" outlined rows="3" v-model="description"></v-textarea>
                            <v-card class="pa-2" elevation="3">
                                <v-img :src="image.image" aspect-ratio="1" contain max-height="400"></v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="activeImg = false"
                        >Close</v-btn>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="updateImg"
                            v-if="saveEnabled"
                        >Save</v-btn>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            imgName: '',
            imgDesc: '',
            activeImg: false
        }
    },
    methods: {
        ...mapActions({
            updateImage: 'updateImage',
            deleteImage: 'deleteImage'
        }),
        updateImg () {
            this.activeImg = false

            let imgData = {id: this.image.id}
            if (this.imgName) {
                imgData['name'] = this.imgName
            }
            if (this.imgDesc) {
                imgData['description'] = this.imgDesc
            }
            this.updateImage(imgData)
        },
        imgDelete () {
            this.deleteImage(this.image.id)
        }
    },
    computed: {
        name: {
            get () {
                return this.image.name
            },
            set (newName) {
                this.imgName = newName
            }
        },
        description: {
            get () {
                return this.image.description
            },
            set (newDesc) {
                this.imgDesc = newDesc
            }
        },
        saveEnabled () {
            return !!this.imgName || !!this.imgDesc
        }
    },
    watch: {
        active () {
            this.activeImg = this.active
        }
    },
    props: {
        image: Object,
        active: Boolean
    }
}
</script>
