export const rules = {
    data () {
        return {
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required',
                v => v.length <= 99 || 'Password must be less than 99 characters',
                v => (v || '').indexOf(' ') < 0 || 'No spaces are allowed'
            ],
            nameRules: [
                v => !!v || 'Name is required',
                v => /^[A-Za-z0-9\s.]+$/.test(v) || 'Only alphanumeric characters, spaces, and periods allowed',
                v => (v && v.length <= 50) || 'Name must be less than 50 characters',
            ],
            descriptionRules: [
                v => /^[A-Za-z0-9\s.]+$/.test(v) || 'Only alphanumeric characters, spaces, and periods allowed',
                v => (v && v.length <= 250) || 'Name must be less than 250 characters',
            ],
            durationRules: [
                v => !!v || 'Duration is required',
                v => /^\d+:\d{2}:\d{2}$/.test(v) || 'Duration must be in HH:MM:SS format'
            ],
            required: [
                v => !!v || 'Field is required'
            ]
        }
    }
}