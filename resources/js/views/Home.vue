<template>
    <div>
        <v-layout wrap>
            <!-- Chat list -->
            <v-flex xs12 sm4 style="height: 100vh;">
                <v-card height="inherit">
                    <v-toolbar flat>
                        <v-avatar
                            @click="$store.commit('home/setMode', { mode: 'account' })"
                            color="primary"
                            size="40"
                            style="cursor: pointer;"
                        >
                            <img
                                v-if="$store.getters['auth/account'].user.foto != null"
                                :src="$store.getters['auth/account'].user.foto"
                            />
                            <span
                                v-else
                                class="white--text"
                            >{{ $store.getters["auth/account"].profile }}</span>
                        </v-avatar>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="$store.commit('home/setMode', { mode: 'chatCreate' })">
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
                                    @click="$store.commit('home/setMode', { mode: 'preferences' })"
                                >
                                    <v-list-item-title>Configuración</v-list-item-title>
                                </v-list-item>
                                <v-list-item
                                    v-for="route in routes"
                                    :key="route.title"
                                    link
                                    :to="route.url"
                                    v-show="route.access.find(function(element) { return element === $store.state.auth.rol; }) || route.access.length <= 0"
                                >
                                    <v-list-item-title>{{ route.name }}</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="exit()">
                                    <v-list-item-title>Cerrar Sesión</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar>
                    <v-divider></v-divider>
                    <ChatList></ChatList>
                </v-card>
            </v-flex>

            <!-- Chat create -->
            <v-slide-x-transition>
                <v-flex xs12 sm4 v-show="$store.state.home.mode == 'chatCreate'" class="sidenav">
                    <v-card flat height="inherit">
                        <ChatCreate></ChatCreate>
                    </v-card>
                </v-flex>
            </v-slide-x-transition>

            <!-- Account Settings -->
            <v-slide-x-transition>
                <v-flex xs12 sm4 v-show="$store.state.home.mode == 'account'" class="sidenav">
                    <v-card flat height="inherit">
                        <EditAccount></EditAccount>
                    </v-card>
                </v-flex>
            </v-slide-x-transition>

            <!-- Preferences -->
            <v-slide-x-transition>
                <v-flex xs12 sm4 v-show="$store.state.home.mode == 'preferences'" class="sidenav">
                    <v-card flat height="inherit">
                        <Preferences></Preferences>
                    </v-card>
                </v-flex>
            </v-slide-x-transition>

            <!-- Chat Message -->
            <v-slide-x-transition>
                <v-flex
                    xs12
                    sm4
                    v-show="$store.state.home.mode == 'chatGroup'"
                    class="sidenav hidden-sm-and-up"
                >
                    <v-card flat height="inherit">
                        <GroupMessage></GroupMessage>
                    </v-card>
                </v-flex>
            </v-slide-x-transition>
            <v-flex xs12 sm8 style="border-left: 0.5px solid #eeeeee;" class="hidden-xs-only">
                <GroupMessage></GroupMessage>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// Components
import EditAccount from "../components/auth/EditAccount.vue";
import Preferences from "../components/preferences/Preferences.vue";
import ChatList from "../components/chats/ChatList.vue";
import ChatCreate from "../components/chats/ChatCreate.vue";
import GroupMessage from "../components/groups/GroupMessage.vue";

export default {
    name: "Main",

    data() {
        return {
            routes: [
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
        EditAccount,
        ChatList,
        ChatCreate,
        GroupMessage,
        Preferences
    },

    methods: {
        exit: async function() {
            await this.$store.dispatch("auth/logout");
            this.$user.set({ role: "unregistered" });
        }
    }
};
</script>

<style>
.sidenav {
    position: fixed;
    width: 100%;
    z-index: 9;
    height: 100vh;
}
</style>