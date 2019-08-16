<template>
    <div>
        <v-layout justify-center>
            <v-flex xs10 lg8>
                <v-layout justify-center>
                    <!-- Register card -->
                    <v-card style="width: 400px; min-height: 350px; height: auto;">
                        <v-card-title class="primary white--text">Registrarse</v-card-title>
                        <v-card-text style="padding: 0;">
                            <v-layout wrap align-center>
                                <!-- Register Progress -->
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

                                <!-- Register Form -->
                                <v-flex xs12 pa-3 v-show="!inProcess">
                                    <v-form
                                        ref="register_form"
                                        @submit.prevent="registerValidate()"
                                    >
                                        <RegisterForm class="mt-5"></RegisterForm>
                                        <v-layout justify-center wrap class="mb-5">
                                            <v-btn
                                                to="/login"
                                                class="mx-2"
                                                outlined
                                                color="primary"
                                            >Iniciar Sesión</v-btn>
                                            <v-btn
                                                type="submit"
                                                class="elevation-0 mx-2"
                                                color="primary"
                                            >Registrarse</v-btn>
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
// Components
import RegisterForm from "../components/auth_components/RegisterForm.vue";

// Vuex
import { mapState, mapActions } from "vuex";

export default {
    name: "Register",

    components: {
        RegisterForm
    },

    computed: {
        ...mapState("auth", ["inProcess"])
    },

    methods: {
        ...mapActions("auth", ["register", "login", "getUser"]),

        registerValidate: async function() {
            if (this.$refs.register_form.validate()) {
                await this.register();
                await this.login();
                this.$refs.register_form.resetValidation();
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
