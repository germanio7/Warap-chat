<template>
    <div>
        <v-layout>
            <v-flex xs4>
                <v-toolbar flat>
                    <v-avatar
                        @click="account_settings = true"
                        color="primary"
                        size="40"
                        style="cursor: pointer;"
                    >
                        <img v-show="account.user.foto != null" :src="account.user.foto" />
                        <span
                            v-show="account.user.foto == null"
                            class="white--text"
                        >{{ account.profile }}</span>
                    </v-avatar>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon size="medium">fas fa-comments</v-icon>
                    </v-btn>
                    <v-menu offset-y>
                        <template v-slot:activator="{ on }">
                            <v-btn icon v-on="on">
                                <v-icon size="medium">fas fa-ellipsis-v</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                v-for="route in routes"
                                :key="route.title"
                                link
                                :to="route.url"
                                v-show="route.access.find(function(element) { return element === rol; }) || route.access.length <= 0"
                            >
                                <v-list-item-title>{{ route.name }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="exit()">
                                <v-list-item-title>Cerrar Sesión</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-toolbar>
            </v-flex>
            <v-slide-x-transition>
                <v-flex xs4 v-show="account_settings" class="account_settings">
                    <v-card flat height="inherit">
                        <v-toolbar color="primary" dark prominent flat>
                            <v-toolbar-title>
                                <v-btn
                                    @click="account_settings = false"
                                    icon
                                    style="margin: 0px 15px 4px 0px;"
                                >
                                    <v-icon>fas fa-arrow-left</v-icon>
                                </v-btn>Perfil
                            </v-toolbar-title>
                        </v-toolbar>
                        <EditAccount></EditAccount>
                    </v-card>
                </v-flex>
            </v-slide-x-transition>
        </v-layout>
    </div>
</template>

<script>
// Components
import EditAccount from "../auth/components/auth_components/EditAccount.vue";

// Vuex
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name: "Main",

    data() {
        return {
            account_settings: false,
            routes: [
                {
                    name: "Preferencias",
                    url: "/preferences",
                    access: []
                },
                {
                    name: "Usuarios",
                    url: "/users",
                    access: ["superAdmin", "administrador"]
                },
                {
                    name: "Roles",
                    url: "/roles",
                    access: ["superAdmin"]
                }
            ]
        };
    },

    components: {
        EditAccount
    },

    computed: {
        ...mapState("auth", ["token", "rol"]),
        ...mapState("preferences", ["appName"]),
        ...mapGetters("auth", ["account"])
    },

    methods: {
        ...mapActions("auth", ["logout"]),

        exit: async function() {
            await this.logout();
            this.$user.set({ role: "unregistered" });
        }
    }
};
</script>

<style>
.account_settings {
    position: fixed;
    width: 100%;
    z-index: 9;
    height: 100vh;
}
</style>