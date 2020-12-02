<template>
    <v-container fill-height>
            <v-col>
            <v-row justify="center">
                <p>Welcome {{ user }}!</p>
            </v-row>
            <v-row justify="center">
                <p>Today is {{ formattedDate }}</p>
            </v-row>

                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row justify="center" class="mb-2 mt-8">
                        <v-btn color="secondary" style="width: 13em;" v-model="clockIn" ripple @click="clockIn = !clockIn" x-large rounded text elevation="3">
                            <v-row justify="start"><v-col cols="auto"><v-icon color="primary">{{ activeClock.icon }}</v-icon></v-col></v-row>
                            <v-row><v-col cols="auto">{{ activeClock.text }}</v-col></v-row>
                        </v-btn>
                    </v-row>

                    <v-row justify="center" class="mb-2">
                        <v-btn color="secondary" style="width: 13em;" v-if="clockIn" v-model="pause" ripple @click="pause = !pause" x-large rounded text elevation="3">
                            <v-row justify="start"><v-col cols="auto"><v-icon color="primary">{{ activePause.icon }}</v-icon></v-col></v-row>
                            <v-row><v-col cols="auto">{{ activePause.text }}</v-col></v-row>
                        </v-btn>
                    </v-row>

                    <v-row justify="center" class="mb-2">
                        <v-btn color="secondary" style="width: 13em;" v-if="clockIn" ripple x-large rounded text elevation="3">
                            <v-row justify="start"><v-col cols="auto"><v-icon color="primary">{{ imagesBtn.icon }}</v-icon></v-col></v-row>
                            <v-row><v-col>{{ imagesBtn.text }}</v-col></v-row>
                        </v-btn>
                    </v-row>

                    <v-row justify="center">
                        <v-col cols="auto">
                            <v-select :items="projects" v-if="clockIn" label="Select Project" class=""></v-select>
                        </v-col>
                    </v-row>
                </v-form>
            </v-col>
    </v-container>
</template>

<script>
    export default {
        name: "timecard",
        data () {
            return {
                valid: true,
                user: 'Zack',
                clockIn: false,
                pause: false,
                projects: ['Home Remodel', 'Hotel RL', 'Park City Restaurant'],
                imagesBtn: {text: 'Add Images', icon: 'mdi-image-multiple-outline'}
            }
        },
        methods: {
            togglePause () {
                // This may not be necessary
                this.pause = !this.pause
            }
        },
        computed: {
            activeClock () {
                if (this.pause && this.clockIn === false) {
                    this.togglePause()
                }
                return this.clockIn ? {text: 'Clock-Out', icon: 'mdi-stop-circle-outline'} : {text: 'Clock-In', icon: 'mdi-clock-outline'}
            },
            activePause () {
                return this.pause ? {text: 'Resume', icon: 'mdi-play-circle-outline'} : {text: 'Pause', icon: 'mdi-pause-circle-outline'}
            },
            formattedDate() {
                const today = new Date()
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                return today.toLocaleDateString('en-US', options)
            }
        }
    }
</script>

<style scoped>

</style>