<template>
    <v-menu
        ref="menu"
        v-model="showCal"
        :close-on-content-click="false"
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
        <v-date-picker
            v-if="showCal"
            v-model="inputVal"
            @click:date="$refs.menu.save(inputVal)"
            :allowed-dates="allowedDates"
        ></v-date-picker>
    </v-menu>
</template>

<script>
export default {
    data () {
        return {
            showCal: false,
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
        }
    },
    props: {
        value: String,
        label: String,
        icon: String,
        rules: null,
        allowedDates: null
    }
}
</script>
