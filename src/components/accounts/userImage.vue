<template>
    <div>
        <v-btn
            @click="selectImage"
            elevation="3"
            ripple text
            :loading="loading"
        >{{ imgButtonText }}</v-btn>
        <input
            ref="file"
            type="file"
            accept="image/*"
            @change="uploadFile"
            hidden
        >
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data () {
        return {
            selectedFile: '',
            loading: false
        }
    },
    methods: {
        ...mapActions({
            updateUser: 'updateUser'
        }),
        selectImage () {
            this.$refs.file.click()
        },
        uploadFile(e) {
            this.loading = true
            this.selectedFile = e.target.files[0]
            if (this.selectedFile) {
                const submitData = new FormData()
                submitData.append('id', this.user.id)
                submitData.append('first_name', this.user.first_name)
                submitData.append('last_name', this.user.last_name)
                submitData.append('email', this.user.email)
                submitData.append('image', this.selectedFile)
                this.updateUser(submitData)
                    .then(() => {this.selectedFile = ''})
            }
            this.loading = false
        }
    },
    props: {
        user: Object,
        imgButtonText: String
    }
}
</script>
