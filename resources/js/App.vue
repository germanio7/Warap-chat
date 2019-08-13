<template>
    <v-app>
        <v-content>
            <v-toolbar flat>
                <v-app-bar-nav-icon
                    v-show="token !== null"
                    @click="sidenavControl()"
                    style="margin-left: 0px;"
                ></v-app-bar-nav-icon>
                <v-toolbar-title>Laravel Passport Vue</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn to="/login" text v-show="token == null">Iniciar Sesión</v-btn>
                    <v-btn to="/register" text v-show="token == null">Registrarse</v-btn>
                    <v-btn @click="darkModeControl()" text>
                        <v-icon>fas fa-adjust</v-icon>
                    </v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-divider></v-divider>

            <v-navigation-drawer
                v-show="token !== null"
                v-model="sidenav"
                :mini-variant="screenWidth > 600 ? mini : false"
                :hide-overlay="screenWidth > 600"
                :stateless="screenWidth > 600"
                :fixed="screenWidth > 600"
                :absolute="screenWidth <= 600"
                :temporary="screenWidth <= 600"
                class="sidenav"
            >
                <v-list dense>
                    <v-list-item v-for="route in routes" :key="route.title" link :to="route.url">
                        <v-list-item-icon>
                            <v-icon style="font-size: 1.3rem;">{{ route.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>{{ route.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item @click="exit()">
                        <v-list-item-icon>
                            <v-icon style="font-size: 1.3rem;">fas fa-sign-out-alt</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>Cerrar Sesión</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

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

    data() {
        return {
            routes: [
                { name: "Usuarios", icon: "fas fa-user", url: "/users" },
                { name: "Roles", icon: "fas fa-tag", url: "/roles" }
            ],
            mini: true,
            mobileDrawer: false
        };
    },

    computed: {
        ...mapState("auth", ["token"]),

        screenWidth() {
            return window.innerWidth;
        },

        sidenav: {
            set() {},
            get() {
                if (window.innerWidth <= 600) {
                    return this.mobileDrawer;
                } else {
                    return true;
                }
            }
        }
    },

    mounted() {
        this.darkModeInit();
    },

    methods: {
        ...mapActions("auth", ["logout"]),

        sidenavControl() {
            if (this.screenWidth <= 600) {
                this.mini = false;
                this.mobileDrawer = !this.mobileDrawer;
            } else {
                this.mini = !this.mini;
            }
        },

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

.sidenav {
    position: fixed;
    margin-top: 57px;
    z-index: 999999;
}

@media (min-width: 960px) {
    .sidenav {
        margin-top: 65px;
    }
}
</style>
