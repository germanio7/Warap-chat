<template>
    <div>
        <v-list two-line>
            <template>
                <v-list v-if="$store.state.chat.chats">
                    <v-list-item-group color="primary">
                        <v-list-item
                            v-for="chat in $store.state.chat.chats"
                            :key="chat.id"
                            @click="$store.commit('home/setMode', { mode: 'chatGroup' })"
                        >
                            <v-list-item-avatar color="primary">
                                <v-img v-if="chat.user.foto != null" :src="chat.user.foto"></v-img>
                                <span v-else class="white--text">{{ chat.user.name[0] }}</span>
                            </v-list-item-avatar>
                            <v-list-item-content>
                                <v-list-item-title>{{ chat.user.name }}</v-list-item-title>
                                <v-list-item-subtitle
                                    v-if="chat.ultimo.length > 0"
                                >{{ chat.ultimo[0].mensaje }}</v-list-item-subtitle>
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

    mounted() {
        this.$store.dispatch("chat/index");
    }
};
</script>

<style>
</style>