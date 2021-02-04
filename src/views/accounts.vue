<template>
    <accounts :allUsers="allUsers" :currUser="currUser"></accounts>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import accounts from '@/components/accounts/index'

export default {
    computed: {
        ...mapGetters({
            allUsers: 'getUsers',
            currUser: 'getCurrentUser'
        }),
        isSuperuser () {
            return this.currUser.is_superuser
        }
    },
    methods: {
        ...mapActions({
            fetchUsers: 'fetchUsers',
            fetchCurrentUser: 'fetchCurrentUser'
        })
    },
    created () {
        this.fetchUsers()
        this.fetchCurrentUser()
    },
    components: {
        'accounts': accounts
    }
}
</script>
