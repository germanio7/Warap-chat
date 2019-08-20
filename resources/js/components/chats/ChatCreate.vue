<template>
    <div>
        <v-toolbar color="primary" dark prominent flat>
            <v-toolbar-title>
                <v-btn
                    @click="$store.commit('home/setMode', { mode: 'chat' })"
                    icon
                    style="margin: 0px 15px 4px 0px;"
                >
                    <v-icon>fas fa-arrow-left</v-icon>
                </v-btn>Nuevo chat
            </v-toolbar-title>
        </v-toolbar>
        <v-layout wrap>
            <v-flex xs12 px-3 pt-3 style="background-color: #eeeeee;">
                <v-text-field v-model="name" label="Buscar usuarios" solo single-line rounded></v-text-field>
            </v-flex>
            <v-flex xs12 style="margin-top: -18px;">
                <v-list>
                    <template>
                        <v-list>
                            <v-list-item
                                v-for="user in usersFind"
                                :key="user.id"
                                @click="create(user)"
                            >
                                <v-list-item-avatar color="primary">
                                    <img v-show="user.foto != null" :src="user.foto" />
                                    <span
                                        v-show="user.foto == null"
                                        class="white--text"
                                    >{{ user.name[0] }}</span>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{user.name}}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </template>
                </v-list>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    name: "ChatCreate",

    data() {
        return {
            name: ""
        };
    },

    computed: {
        usersFind() {
            if (this.$store.state.users.users != null) {
                let usersArray = [];
                for (let i = 0; i < this.$store.state.users.users.length; i++) {
                    let userName = this.$store.state.users.users[i].name
                        .toLowerCase()
                        .substring(0, this.name.length);
                    if (userName == this.name.toLowerCase()) {
                        usersArray.push(this.$store.state.users.users[i]);
                    }
                }

                return usersArray;
            } else {
                return [];
            }
        }
    },

    mounted() {
        if (this.$store.state.users.users == null) {
            this.$store.dispatch("users/index");
        }
    },

    methods: {
        create: async function(user) {
            let arrayChats = [];
            arrayChats.push(user);
            await this.$store.dispatch("chat/save", {
                users: arrayChats
            });
            this.$store.commit("home/setMode", { mode: "chat" });
        }
    }
};
</script>
