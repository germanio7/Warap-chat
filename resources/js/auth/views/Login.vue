<template>
    <div>
        <br>
        <br>
        <v-layout justify-center>
            <v-flex xs10 lg8>
                <v-layout justify-center>
                    <!-- Login card -->
                    <v-card style="width: 400px; min-height: 350px; height: auto;">
                        <v-card-title class="secondary">
                            <h1 class="white--text">Login</h1>
                        </v-card-title>
                        <v-card-text style="padding: 0;">
                            <v-layout wrap align-center>
                                <!-- Login Progress -->
                                <v-flex xs12 pa-3 v-show="inProcess">
                                    <v-layout justify-center style="margin-top: 80px;">
                                        <v-progress-circular
                                            :size="70"
                                            :width="7"
                                            color="secondary"
                                            indeterminate
                                        ></v-progress-circular>
                                    </v-layout>
                                </v-flex>

                                <!-- Login Form -->
                                <v-flex xs12 pa-3 v-show="!inProcess">
                                    <v-alert
                                        style="width: 92%;"
                                        :value="errors ? true : false"
                                        color="error"
                                    >
                                        <div v-if="errors">{{ errors.error_description }}</div>
                                    </v-alert>
                                    <br>
                                    <v-form ref="loginForm" @submit.prevent="loginValidate()">
                                        <LoginForm></LoginForm>
                                        <v-layout justify-center wrap>
                                            <v-btn to="/register" outline color="secondary">Sign Up</v-btn>
                                            <v-btn type class="elevation-0" color="secondary">Log In</v-btn>
                                        </v-layout>
                                    </v-form>
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
import { mapState, mapActions } from "vuex";
import LoginForm from "../components/auth_components/LoginForm.vue";

export default {
    name: "Login",

    components: {
        LoginForm
    },

    computed: {
        ...mapState("auth", ["inProcess", "errors"])
    },

    methods: {
        ...mapActions("auth", ["login"]),
        loginValidate: async function() {
            if (this.$refs.loginForm.validate()) {
                await this.login();
                this.$router.push("/account");
            }
        }
    }
};
</script>