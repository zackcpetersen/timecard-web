<template>
    <accounts :users="filteredUsers" :isSuperuser="isSuperuser"></accounts>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import accounts from '@/components/accounts/index'

export default {
    title: "Accounts",
    computed: {
        ...mapGetters({
            allUsers: 'getUsers',
            currUser: 'getCurrentUser'
        }),
        isSuperuser () {
            return this.currUser.is_superuser
        },
        filteredUsers () {
            if (this.isSuperuser) {
                return this.allUsers
            }
            return this.allUsers.filter(user => this.currUser.id === user.id)
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
