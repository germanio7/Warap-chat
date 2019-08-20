<template>
    <div>
        <v-toolbar color="primary" dark prominent flat>
            <v-toolbar-title>
                <v-btn @click="setMode('chat')" icon style="margin: 0px 15px 4px 0px;">
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
                                @click="createChat(user)"
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
// Vuex
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    name: "ChatCreate",

    data() {
        return {
            name: ""
        };
    },

    computed: {
        ...mapState("users", ["users"]),

        usersFind() {
            if (this.users != null) {
                let usersArray = [];
                for (let i = 0; i < this.users.length; i++) {
                    let userName = this.users[i].name
                        .toLowerCase()
                        .substring(0, this.name.length);
                    if (userName == this.name.toLowerCase()) {
                        usersArray.push(this.users[i]);
                    }
                }

                return usersArray;
            } else {
                return [];
            }
        }
    },

    mounted() {
        if (this.users == null) {
            this.indexUsers();
        }
    },

    methods: {
        ...mapActions("users", ["indexUsers"]),
        ...mapActions("chat", ["saveChat"]),
        ...mapMutations("home", ["setMode"]),

        createChat(user) {
            let dataArray = [];
            usersArray.push(user);
            this.saveChat({ users: dataArray });
        }
    }
};
</script>
