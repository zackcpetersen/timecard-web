<template>
    <v-menu
        ref="menu"
        v-model="showClock"
        :close-on-content-click="false"
        :return-value.sync="inputVal"
        transition="scale-transition"
        max-width="290"
        :nudge-right="30"
        offset-y
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-model="inputVal"
                :label="label"
                :prepend-icon="icon"
                readonly
                v-bind="attrs"
                v-on="on"
                :rules="rules"
            ></v-text-field>
        </template>
        <v-time-picker
            v-if="showClock"
            v-model="inputVal"
            ampm-in-title
            color="green"
            @click:minute="$refs.menu.save(inputVal)"
        ></v-time-picker>
    </v-menu>
</template>

<script>
export default {
    data () {
        return {
            showClock: false
        }
    },
    computed: {
        inputVal: {
            get () {
                return this.value
            },
            set (val) {
                this.$emit('input', val)
            }
        },
    },
    props: {
        value: String,
        label: String,
        icon: String,
        rules: Array
    }
}
</script>
