<template>
    <v-app>
        <v-content>
            <v-app-bar flat app>
                <v-app-bar-nav-icon
                    v-show="token !== null"
                    @click="sidenavControl()"
                    style="margin-left: 0px;"
                ></v-app-bar-nav-icon>
                <v-toolbar-title>{{ appName }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn to="/login" text v-show="token == null">Iniciar Sesión</v-btn>
                    <v-btn to="/register" text v-show="token == null">Registrarse</v-btn>
                    <v-menu v-show="token != null" v-model="profileMenu" offset-y min-width="250px">
                        <template v-slot:activator="{ on }">
                            <v-avatar
                                v-show="token != null"
                                color="primary"
                                size="40"
                                style="cursor: pointer; margin-top: 12px;"
                                v-on="on"
                            >
                                <img v-show="account.user.foto != null" :src="account.user.foto" />
                                <span
                                    v-show="account.user.foto == null"
                                    class="white--text"
                                >{{ account.profile }}</span>
                            </v-avatar>
                        </template>
                        <v-card>
                            <v-list>
                                <v-list-item to="/account">
                                    <v-list-item-title>Mi Cuenta</v-list-item-title>
                                    <v-list-item-icon>
                                        <v-icon>fas fa-user</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                                <v-list-item to="/preferences">
                                    <v-list-item-title>Preferencias</v-list-item-title>
                                    <v-list-item-icon>
                                        <v-icon>fas fa-cog</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                                <v-list-item @click="exit()">
                                    <v-list-item-content>
                                        <v-list-item-title>Cerrar Sesión</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-icon>
                                        <v-icon>fas fa-sign-out-alt</v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                </v-toolbar-items>
            </v-app-bar>
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
                </v-list>
            </v-navigation-drawer>

            <router-view />
        </v-content>
    </v-app>
</template>

<script>
// Vuex
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

// axios
import axios from "axios";

export default {
    name: "App",

    data() {
        return {
            profileMenu: false,
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
        ...mapGetters("auth", ["account"]),
        ...mapState("preferences", ["appName"]),

        dark: {
            set() {},
            get() {
                var darkMode = localStorage.getItem("darkMode");

                if (darkMode == "false") {
                    return false;
                } else {
                    return true;
                }
            }
        },

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
        if (this.token != null) {
            this.getUser();
        }
    },

    methods: {
        ...mapActions("auth", ["logout", "getUser"]),

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
            this.$user.set({ role: "unregistered" });
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
