<template>
    <div>
        <v-card flat>
            <v-toolbar flat>
                <v-toolbar-title>
                    <v-list-item class="hidden-sm-and-up">
                        <v-list-item-icon
                            @click="$store.commit('home/setMode', { mode: 'chat' })"
                            style="margin-left: -10px; cursor: pointer"
                        >
                            <v-icon>fas fa-arrow-left</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-toolbar-title>
            </v-toolbar>
            <v-divider></v-divider>
        </v-card>

        <v-layout justify-center wrap>
            <v-flex xs12>
                <v-layout justify-center>
                    <v-btn @click="send()" color="primary">Nuevo Mensaje</v-btn>
                </v-layout>
            </v-flex>
            <v-flex xs12>
                <v-list class="transparent">
                    <v-list-item v-for="mes in messages" :key="mes.id">
                        <v-list-item-content>{{mes.id}} {{ mes.mensaje }}</v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "GroupMessage",

    data() {
        return {
            messages: []
        };
    },

    created() {
        this.get();
        Echo.join("chat").listen("MessageSent", event => {
            this.messages.push(event.message);
        });
    },

    methods: {
        send() {
            axios.post("/api/send");
        },

        get() {
            axios.get("/api/getMessage").then(response => {
                this.messages = response.data;
            });
        }
    }
};
</script>