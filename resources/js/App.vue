<template>
    <v-app>
        <v-content>
            <v-toolbar class="elevation-0">
                <v-toolbar-title>Laravel Passport Vue</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn to="/login" text v-show="token == null">Iniciar Sesión</v-btn>
                    <v-btn to="/register" text v-show="token == null">Registrarse</v-btn>
                    <v-btn to="/roles" text v-show="token !== null">Roles</v-btn>
                    <v-btn to="/users" text v-show="token !== null">Usuarios</v-btn>
                    <v-btn @click="exit()" text v-show="token !== null">Cerrar Sesión</v-btn>
                    <v-btn @click="darkModeControl()" text>
                        <v-icon>fas fa-adjust</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-divider dark></v-divider>
            <v-content>
                <router-view />
            </v-content>
        </v-content>
    </v-app>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "App",

    computed: {
        ...mapState("auth", ["token"])
    },

    mounted() {
        this.darkModeInit();
    },

    methods: {
        ...mapActions("auth", ["logout"]),
        exit: async function() {
            await this.logout();
            this.$router.push("/");
        },

        darkModeInit() {
            var darkMode = localStorage.getItem("darkMode");

            if (darkMode == null) {
                localStorage.setItem("darkMode", false);
                darkMode = false;
            } else {
                if (darkMode == "false") {
                    darkMode = false;
                } else {
                    darkMode = true;
                }
            }
            this.$vuetify.theme.dark = darkMode;
        },

        darkModeControl() {
            var darkMode = localStorage.getItem("darkMode");

            if (darkMode == "false") {
                localStorage.setItem("darkMode", true);
            } else {
                localStorage.setItem("darkMode", false);
            }

            this.darkModeInit();
        }
    }
};
</script>

<style>
.app {
    font-family: "Roboto", sans-serif;
}
</style>
