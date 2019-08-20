<template>
    <div>
        <v-card flat v-if="chatID">
            <v-toolbar flat>
                <v-toolbar-title>
                    <v-list-item class="hidden-sm-and-up">
                        <v-list-item-icon
                            @click="setMode('chat')"
                            style="margin-left: -10px; cursor: pointer"
                        >
                            <v-icon>fas fa-arrow-left</v-icon>
                        </v-list-item-icon>
                        <v-list-item-avatar style="margin-left: -25px; margin-right: 15px;">
                            <v-img :src="chats[chatID - 1].avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{chats[chatID - 1].nombre}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item class="hidden-xs-only">
                        <v-list-item-avatar>
                            <v-img :src="chats[chatID - 1].avatar"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{chats[chatID - 1].nombre}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
        </v-card>
    </div>
</template>

<script>
// Vuex
import { mapState, mapMutations } from "vuex";

export default {
    name: "GroupMessage",

    data() {
        return {
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

    computed: {
        ...mapState("chat", ["chatID"])
    },

    methods: {
        ...mapMutations("home", ["setMode"])
    }
};
</script>