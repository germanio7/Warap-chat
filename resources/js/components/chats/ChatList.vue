<template>
    <div>
        <v-list two-line>
            <template>
                <v-btn @click="log()">log</v-btn>
                <v-list>
                    <v-list-item-group color="primary">
                        <v-list-item
                            v-for="chat in chatsList"
                            :key="chat.id"
                            @click="$store.commit('home/setMode', { mode: 'chatGroup' })"
                        >
                            <v-list-item-avatar color="primary">
                                <v-img v-if="chat.user.foto != null" :src="chat.user.foto"></v-img>
                                <span v-else class="white--text">{{ chat.user.name[0] }}</span>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ chat.user.name }}</v-list-item-title>
                                <v-list-item-subtitle>ultimo mensaje</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </template>
        </v-list>
    </div>
</template>

<script>
// Vuex
import { mapMutations } from "vuex";

export default {
    name: "ChatList",

    computed: {
        chatsList() {
            const chats = this.$store.state.chat.chats;
            if (chats != null) {
                let arrayData = [];
                for (let i = 0; i < chats.chats.length; i++) {
                    let findUser;
                    let find = null;
                    if (chats.chats[i].grupo.chats.length <= 2) {
                        find = chats.chats[i].grupo.chats.find(chat => {
                            return (
                                chat.user_id != this.$store.state.auth.user.id
                            );
                        });
                    }

                    if (find) {
                        findUser = find.user;
                    } else {
                        findUser = {
                            foto: null,
                            name: "Grupo"
                        };
                    }

                    let data = {
                        id: chats.chats[i].id,
                        grupo_id: chats.chats[i].grupo_id,
                        user: findUser
                    };

                    arrayData.push(data);
                }

                return arrayData;
            } else {
                return [];
            }
        }
    },

    mounted() {
        this.$store.dispatch("chat/index");
    },

    methods: {
        log() {
            console.log(this.chatsList);
        }
    }
};
</script>

<style>
</style>