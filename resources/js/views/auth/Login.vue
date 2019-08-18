<template>
    <div>
        <v-layout justify-center>
            <v-flex xs10 lg8>
                <v-layout justify-center>
                    <!-- Login card -->
                    <v-card style="width: 400px; min-height: 350px; height: auto;">
                        <v-card-title class="primary white--text">Iniciar Sesión</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text style="padding: 0;">
                            <v-layout wrap align-center>
                                <!-- Login Progress -->
                                <v-flex xs12 pa-3 v-show="inProcess">
                                    <v-layout justify-center style="margin-top: 80px;">
                                        <v-progress-circular
                                            color="primary"
                                            :size="70"
                                            :width="7"
                                            indeterminate
                                        ></v-progress-circular>
                                    </v-layout>
                                </v-flex>

                                <!-- Login Form -->
                                <v-flex xs12 pa-3 v-show="!inProcess">
                                    <v-alert :value="errors ? true : false" color="error">
                                        <div v-if="errors">{{ errors.error_description }}</div>
                                    </v-alert>
                                    <br v-show="errors ? false : true" />
                                    <v-form ref="loginForm" @submit.prevent="loginValidate()">
                                        <LoginForm></LoginForm>
                                        <v-layout justify-center wrap>
                                            <v-btn
                                                to="/register"
                                                color="primary"
                                                class="mx-2"
                                                outlined
                                            >Registrarse</v-btn>
                                            <v-btn
                                                type="submit"
                                                color="primary"
                                                class="elevation-0 mx-2"
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
//Components
import LoginForm from "../../components/auth/LoginForm.vue";

//Vuex
import { mapState, mapActions } from "vuex";

export default {
    name: "Login",

    components: {
        LoginForm
    },

    computed: {
        ...mapState("auth", ["errors", "inProcess"])
    },

    methods: {
        ...mapActions("auth", ["login", "getUser"]),
        loginValidate: async function() {
            if (this.$refs.loginForm.validate()) {
                await this.login();
                this.$refs.loginForm.resetValidation();
                let userData = await this.getUser();
                if (userData.user.role_id != null) {
                    this.$user.set({ role: userData.rol.role });
                } else {
                    this.$user.set({ role: "visitor" });
                }
            }
        }
    }
};
</script>