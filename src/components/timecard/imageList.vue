<template>
    <div v-if="images.length">
        <v-row justify="center">
            <div class="caption font-italic">Click an image to edit name or description</div>
            <v-sheet
                class="mx-auto"
                elevation="3"
                max-width="100%"
                shaped
            >
                <v-slide-group
                    v-model="model"
                    class="pa-4"
                >
                    <v-slide-item
                        v-for="img in images"
                        :key="img.id"
                        v-slot="{ active, toggle }"
                    >
                        <v-card
                            class="ma-2 pa-1"
                            @click="toggle"
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
                            <imageEditModal :image="img" :active="active"></imageEditModal>
                        </v-card>
                    </v-slide-item>
                </v-slide-group>
            </v-sheet>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imageEditModal from '@/components/timecard/imageEditModal'

export default {
    data () {
        return {
            model: null,
            dialog: false
        }
    },
    computed: {
        ...mapGetters({
            getProjectImagesByEntry: 'getProjectImagesByEntry'
        }),
        images () {
            return this.getProjectImagesByEntry(this.entryId)
        }
    },
    props: {
        entryId: Number
    },
    components: {
        imageEditModal: imageEditModal
    }
}
</script>
