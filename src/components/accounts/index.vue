<template>
    <v-row justify="center" align="start" style="height: 100%;" class="mt-sm-16 pt-sm-16">
        <v-card class="py-5 mx-2 mx-sm-4 rounded-lg" outlined width="100%">
            <v-card-title class="d-flex flex-no-wrap justify-sm-space-between justify-space-around align-center mx-md-10 mx-sm-1">
                <span v-if="isSuperuser" class="text-h3">Users</span>
                <span v-else class="text-h3">User</span>
                <v-btn v-if="isSuperuser" @click="createModalStatus(true)" color="green" fab><v-icon color="white">mdi-plus</v-icon></v-btn>
            </v-card-title>
            <v-card-actions class="d-flex flex-wrap justify-start ml-md-10 ml-sm-5" style="max-width: 600px;">
                <v-text-field
                    v-if="isSuperuser"
                    v-model="search"
                    class="ma-4"
                    label="Search Users"
                    prepend-inner-icon="mdi-magnify"
                    color="primary"
                ></v-text-field>
            </v-card-actions>
            <v-divider class="mb-5 mx-5"></v-divider>
            <v-card-text>
                <v-row dense justify="center">
                    <v-col cols="11" xl="8" v-for="user in searchUsers" :key="user.id">
                        <v-card @click="setEditableAndUpdate(user)" class="rounded-md">
                            <div class="d-flex flex-no-wrap justify-space-between align-center">
                                <div class="mx-md-5">
                                    <v-card-title class="headline">
                                        {{ user.full_name }}
                                    </v-card-title>
                                    <v-card-subtitle>
                                        <span class="d-block">{{ permissionLevel(user) }}</span>
                                    </v-card-subtitle>
                                </div>
                                <v-avatar class="mr-md-5 mr-3 my-3 rounded-circle" size="80" rounded color="primary">
                                    <v-img v-if="user.image" :src="user.image" aspect-ratio="1"></v-img>
                                    <span v-else class="headline white--text"> {{ userInitials(user) }}</span>
                                </v-avatar>
                            </div>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card-text>
            <account
                v-if="isSuperuser"
                :showModal="userCreateModal"
                :isSuperuser="isSuperuser"
                :editableUser="{}"
                :currUser="currUser"
                :creating="true"
                @status="createModalStatus"
            ></account>
            <account
                :showModal="userEditModal"
                :isSuperuser="isSuperuser"
                :editableUser="editableUser"
                :currUser="currUser"
                :creating="false"
                @status="editModalStatus"
            ></account>
        </v-card>
    </v-row>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import userAccount from '@/components/accounts/userAccount'

export default {
    data () {
        return {
            search: '',
            userCreateModal: false,
            userEditModal: false
        }
    },
    methods: {
        ...mapMutations({
            setEditableUser: 'SET_EDITABLE_USER',
            resetEditableUser: 'RESET_EDITABLE_USER'
        }),
        userInitials (user) {
            if (user.initials) {
                return user.initials.toUpperCase()
            }
        },
        setEditableAndUpdate (user) {
            this.setEditableUser(user)
            this.editModalStatus(true)
        },
        createModalStatus (value) {
            this.resetEditableUser()
            this.userCreateModal = value
        },
        editModalStatus (value) {
            this.userEditModal = value
        },
        permissionLevel (user) {
            if (user.is_superuser) {
                return 'Superuser'
            }
            if (user.is_admin) {
                return 'Admin'
            }
            return 'Employee'
        }
    },
    computed: {
        ...mapGetters({
            editableUser: 'getEditableUser',
            currUser: 'getCurrentUser'
        }),
        searchUsers () {
            return this.users.filter(user => {
                return user.full_name.toLowerCase().includes(this.search.toLowerCase())
            })
        },
    },
    props: {
        users: Array,
        isSuperuser: Boolean
    },
    components: {
        'account': userAccount
    }
}
</script>
