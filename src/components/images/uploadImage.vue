<template>
    <div>
        <v-row justify="center" class="mb-2">
            <v-btn @click="selectImage"
                   color="secondary"
                   style="min-width: 13em;"
                   elevation="3"
                   :loading="loading"
                   ripple x-large rounded text>
                <v-row justify="start"><v-col cols="auto"><v-icon color="primary">{{ imagesBtn.icon }}</v-icon></v-col></v-row>
                <v-row><v-col>{{ imagesBtn.text }}</v-col></v-row>
            </v-btn>
            <input
                ref="file"
                type="file"
                accept="image/*"
                @change="uploadFile"
                hidden
            >
        </v-row>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            selectedFile: '',
            imagesBtn: {text: 'Add Images', icon: 'mdi-image-multiple-outline'},
            loading: false
        }
    },
    methods: {
        ...mapActions({
            addImage: 'addImage'
        }),
        selectImage () {
            this.$refs.file.click()
        },
        uploadFile(e) {
            this.selectedFile = e.target.files[0]
            if (this.selectedFile) {
                this.loading = true
                const submitData = new FormData()
                submitData.append('image', this.selectedFile)
                submitData.append('name', this.selectedFile.name)
                submitData.append('project', this.imgData.project)
                if (this.imgData.type === 'entry') {
                    submitData.append('entry', this.imgData.entryId)
                }
                this.addImage(submitData)
                    .then(() => this.loading = false)
                    .catch(() => this.loading = false)
            }
        }
    },
    props: {
        imgData: Object,
    }
}
</script>
