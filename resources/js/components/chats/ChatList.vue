<template>
    <div>
        <v-list two-line>
            <template>
                <v-list>
                    <v-list-item-group color="primary" v-model="chat">
                        <v-list-item v-for="chat in chats" :key="chat.id" @click="setChat(chat.id)">
                            <v-list-item-avatar>
                                <v-img :src="chat.avatar"></v-img>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{chat.nombre}}</v-list-item-title>
                                <v-list-item-subtitle>{{chat.mensaje}}</v-list-item-subtitle>
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

    data() {
        return {
            chat: null,
            chats: [
                {
                    id: 1,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
                    nombre: "AAA Mamá",
                    mensaje: "yendo"
                },
                {
                    id: 2,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
                    nombre: "Plomero cambio la canilla",
                    mensaje: "uep"
                },
                {
                    id: 3,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
                    nombre: "Maxi Nuevo",
                    mensaje: ";)"
                },
                {
                    id: 4,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
                    nombre: "Ale Marzo",
                    mensaje: "okey"
                },
                {
                    id: 5,
                    avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
                    nombre: "Chachin",
                    mensaje: "siguiente pregunta"
                }
            ]
        };
    },

    methods: {
        ...mapMutations("chat", ["setChatID"]),

        setChat(id) {
            this.setChatID(id);
        }
    }
};
</script>

<style >
</style>