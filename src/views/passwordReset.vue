<template>
    <password-reset :currUser="currUser" :showModal="true" :redirect="true"></password-reset>
</template>

<script>
import { mapGetters } from 'vuex'
import passwordReset from '@/components/auth/passwordReset'

export default {
    computed: {
        ...mapGetters({
            currUser: 'getCurrentUser'
        }),
    },
    components: {
        'password-reset': passwordReset
    }
}
</script>
