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
                    <span class="headline ml-5">Edit Image Details</span>
                    <v-btn @click="imgDelete" class="mr-6 white--text" color="red">REMOVE</v-btn>
                </v-row>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Name" v-model="name"></v-text-field>
                            <v-textarea label="Description" outlined rows="3" v-model="description"></v-textarea>
                            <v-checkbox v-if="allowFeatured" v-model="featured" :label="featuredLabel"></v-checkbox>
                            <v-card class="pa-2" elevation="3">
                                <v-img :src="image.image" aspect-ratio="1" contain max-height="400"></v-img>
                            </v-card>
                        </v-col>
                    </v-row>
                    <v-row justify="center">
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="closeModal"
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
import { mapActions, mapGetters } from 'vuex'

export default {
    data () {
        return {
            imgName: '',
            imgDesc: '',
            imgFeatured: '',
            activeImg: false,
            featuredLabel: 'Featured Image (Shown on project list - only one per project)'
            // TODO add rules!
        }
    },
    methods: {
        ...mapActions({
            updateImage: 'updateImage',
            deleteImage: 'deleteImage'
        }),
        updateImg () {
            let imgData = {id: this.image.id}
            if (this.imgName) {
                imgData['name'] = this.imgName
            }
            if (this.imgDesc) {
                imgData['description'] = this.imgDesc
            }
            if (this.imgFeatured) {
                imgData['featured'] = this.imgFeatured
            }
            this.updateImage(imgData)
                .then(this.closeModal())
        },
        imgDelete () {
            this.deleteImage(this.image.id)
        },
        closeModal () {
            this.$emit('status', false)
        }
    },
    computed: {
        ...mapGetters({
            image: 'getCurrentImage'
        }),
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
        featured: {
            get () {
                return this.image.featured
            },
            set (val) {
                this.imgFeatured = val
            }
        },
        saveEnabled () {
            return this.name !== this.imgName
                || this.description !== this.imgDesc
                || this.featured !== this.imgFeatured
        }
    },
    watch: {
        image () {
            this.imgName = this.name
            this.imgDesc = this.description
            this.imgFeatured = this.featured
        },
        active () {
            this.activeImg = this.active
        }
    },
    props: {
        active: Boolean,
        allowFeatured: Boolean
    }
}
</script>
