<template>
    <div v-if="images.length">
        <v-row justify="center">
            <div class="caption font-italic">Click an image to edit name or description</div>
        </v-row>
        <v-row justify="center">
            <v-sheet
                class="mx-auto"
                elevation="3"
                max-width="100%"
                shaped
            >
                <v-slide-group
                    v-model="model"
                    class="pa-4"
                    show-arrows="desktop"
                >

                    <v-slide-item
                        v-for="img in images"
                        :key="img.id"
                    >
                        <v-expand-x-transition>
                        <v-card
                            class="ma-2 pa-1"
                            @click="modalStatus(true, img)"
                        >
                            <v-row>
                                <v-col cols="12">

                                    <v-img :src="img.image"
                                           aspect-ratio="1"
                                           width="200"
                                           contain
                                    ></v-img>

                                </v-col>
                            </v-row>
                        </v-card>
                        </v-expand-x-transition>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </v-row>
        <image-edit-modal :active="showModal" :allowFeatured="allowFeatured" @status="modalStatus"></image-edit-modal>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import imageEditModal from '@/components/images/imageEditModal'

export default {
    data () {
        return {
            model: null,
            dialog: false,
            showModal: false,
        }
    },
    methods: {
        ...mapMutations({
            setCurrentImage: 'SET_CURRENT_IMAGE'
        }),
        modalStatus (status, image=null) {
            if (image) {
                this.setCurrentImage(image)
            }
            this.showModal = status
        }
    },
    props: {
        images: Array,
        allowFeatured: Boolean
    },
    components: {
        'image-edit-modal': imageEditModal
    }
}
</script>
