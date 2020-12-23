<template>
    <v-container>
        <v-list-item>
            <v-list-item-avatar color="purple">
                <img v-if="user.image" :src='user.image'>
                <div v-else>
                    {{ user.initials }}
                </div>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>
                    {{ user.fullName }}
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
                    <v-icon medium color="purple">{{ page.icon }}</v-icon>
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
import logout from '@/components/auth/logout'

export default {
    data () {
        return {
            drawer: true,
            pages: [
                { title: 'Track Time', icon: 'mdi-clock', route: 'Timecard'},
                { title: 'Projects', icon: 'mdi-home-variant', route: 'Projects'},
                { title: 'Entries', icon: 'mdi-format-list-text', route: 'Entries'},
                { title: 'User Options', icon: 'mdi-account', route: ''},
                { title: 'Admin', icon: 'mdi-cog', route: ''}
            ],
            right: null,
            user: {
                fullName: 'Zack Petersen',
                image: 'https://randomuser.me/api/portraits/men/9.jpg',
                initials: 'ZP'
            },
        }
    },
    components: {
        'logout': logout
    }
}
</script>
