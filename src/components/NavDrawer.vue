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
        <v-list nav shaped>
            <v-list-item v-for="item in items" :key="item.title">
                <v-list-item-icon>
                    <v-icon medium color="purple">{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            drawer: true,
            items: [
                { title: 'Track Time', icon: 'mdi-clock' },
                { title: 'Projects', icon: 'mdi-home-variant'},
                { title: 'Entries', icon: 'mdi-format-list-text'},
                { title: 'User Options', icon: 'mdi-account' },
                { title: 'Admin', icon: 'mdi-cog'}
            ],
            right: null,
            user: {
                fullName: 'Zack Petersen',
                image: 'https://randomuser.me/api/portraits/men/9.jpg',
                initials: 'ZP'
            },
        }
    }
}
</script>
