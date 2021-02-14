<template>
    <v-autocomplete
        v-model="userList"
        :items="users"
        item-text="fullName"
        item-value="id"
        multiple
        label="User"
    >
        <template v-slot:prepend>
            <v-icon>mdi-account-outline</v-icon>
        </template>
    </v-autocomplete>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data () {
        return {
            userList: [],
            users: []
        }
    },
    methods: {
        ...mapActions({
            fetchUsers: 'fetchUsers'
        })
    },
    computed: {
        ...mapGetters({
            getUsers: 'getUsers'
        })
    },
    watch: {
        userList () {
            this.$emit('input', this.userList)
        },
        getUsers () {
            this.users = this.getUsers.map(user => {
                const formattedUser = {}
                formattedUser['fullName'] = user.first_name + ' ' + user.last_name
                formattedUser['id'] = user.id
                return formattedUser
            })
        }
    },
    created () {
        this.fetchUsers()
    }
}
</script>
