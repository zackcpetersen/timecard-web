<template>
    <div>
        <v-row justify="center" class="mb-2">
            <v-btn @click="selectImage"
                   color="secondary"
                   style="min-width: 13em;"
                   elevation="3"
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
        }
    },
    methods: {
        ...mapActions({
            addImage: 'addProjectImage'
        }),
        selectImage () {
            this.$refs.file.click()
        },
        uploadFile(e) {
            this.selectedFile = e.target.files[0]
            if (this.selectedFile) {
                const imgData = new FormData()
                imgData.append('image', this.selectedFile)
                imgData.append('name', this.selectedFile.name)
                imgData.append('project', this.entry.project)
                imgData.append('entry', this.entry.id)
                this.addImage(imgData)
            }
        }
    },
    props: {
        entry: Object
    }
}
</script>
