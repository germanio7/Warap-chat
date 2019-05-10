<template>
    <div>
        <div v-if="errors" class="error--text">
            <div v-for="error in error_messages" :key="error.id">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState } from 'vuex'

    export default {

        name: 'error',

        data() {
            return {
                det: {
                    'name': 'maxi'
                }
            }
            
        },

        props: ['tag'],

        computed: {
            ...mapState([
                'errors'
            ]),

            error_messages: function () {
                return this.errors['errors'][this.tag]
            }
        },

    }

</script>
