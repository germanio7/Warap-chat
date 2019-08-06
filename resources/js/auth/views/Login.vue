<template>
    <div>
        <br />
        <br />
        <br />
        <v-layout justify-center>
            <v-flex xs10 lg8>
                <v-layout justify-center>
                    <!-- Login card -->
                    <v-card style="width: 400px; min-height: 350px; height: auto;">
                        <v-card-title class="primary">
                            <h3 class="white--text">Iniciar Sesión</h3>
                        </v-card-title>
                        <v-card-text style="padding: 0;">
                            <v-layout wrap align-center>
                                <!-- Login Progress -->
                                <v-flex xs12 pa-3 v-show="inProcess">
                                    <v-layout justify-center style="margin-top: 80px;">
                                        <v-progress-circular
                                            :size="70"
                                            :width="7"
                                            color="primary"
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
                                    <br />
                                    <v-form ref="loginForm" @submit.prevent="loginValidate()">
                                        <LoginForm></LoginForm>
                                        <v-layout justify-center wrap>
                                            <v-btn
                                                to="/register"
                                                class="mx-2"
                                                outlined
                                                color="primary"
                                            >Registrarse</v-btn>
                                            <v-btn
                                                type="submit"
                                                class="mx-2"
                                                color="primary"
                                            >Iniciar Sesión</v-btn>
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