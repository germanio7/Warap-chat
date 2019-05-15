<template>
    <div>
        <br>
        <v-layout justify-center>
            <v-flex xs10 lg8>
                <v-layout justify-center>
                    <!-- Login/register card -->
                    <v-card width="750">
                        <v-card-text style="padding: 0;">
                        <v-layout wrap align-center>

                            <!-- Login Form -->
                            <v-flex xs12 sm6 pa-3>
                                <v-layout justify-center wrap>
                                    <v-flex xs12><h2 class="primary--text text-xs-center">Welcome Again</h2></v-flex>
                                    <v-flex xs12><h1 class="primary--text text-xs-center">{{ user.name }}</h1></v-flex>
                                </v-layout>
                            </v-flex>

                            <!-- img dialog -->
                            <v-flex xs12 sm6 class="hidden-xs-only">
                            <v-img height="400px" src="./images/vue_background.jpg"></v-img>
                            </v-flex>
                        </v-layout>
                        </v-card-text>
                    </v-card>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>

    import axios from 'axios'

    export default {
        
        name: 'User',

        data() {
            return {
                user: {}
            }
        },

        created() {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accsess_token');
            axios.get('/api/user').then((response) => {
                this.user = response.data;
            }).catch((error)=>{
                console.log(error);
            });
        }

    }

</script>
