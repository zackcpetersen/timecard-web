<template>
    <v-container>
        <v-list-item>
            <v-list-item-avatar color="primary">
                <v-img v-if="user && user.image" :src="user.image"></v-img>
                <span v-else class="white--text">{{ userInitials }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>
                    {{ user.full_name }}
                </v-list-item-title>

                <v-list-item-subtitle>
                    Timecard
                </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-3"></v-divider>
        <v-list flat nav>
            <v-list-item v-for="page in pages" :key="page.title" :to="{ name: page.route }" exact>
                <v-list-item-icon>
                    <v-icon medium color="primary">{{ page.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ page.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-divider class="mb-3"></v-divider>

            <v-list-item-content>
                <logout></logout>
            </v-list-item-content>
        </v-list>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import logout from '@/components/auth/logout'

export default {
    data () {
        return {
            drawer: true,
            pages: [
                { title: 'Track Time', icon: 'mdi-clock', route: 'Timecard'},
                { title: 'Projects', icon: 'mdi-home-variant', route: 'Projects'},
                { title: 'Entries', icon: 'mdi-format-list-text', route: 'Entries'},
                { title: 'Account', icon: 'mdi-account', route: 'Account'},
            ],
        }
    },
    computed: {
        ...mapGetters({
            currUser: 'getCurrentUser',
            allUsers: 'getUsers'
        }),
        user () {
            return this.allUsers.filter(user => user.id === this.currUser.id)[0] || this.currUser
        },
        userInitials () {
            if (this.user.id) {
                return this.user.initials.toUpperCase()
            }
            return ''
        },
    },
    components: {
        'logout': logout
    }
}
</script>
