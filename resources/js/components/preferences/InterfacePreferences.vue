<template>
    <div>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        <div v-if="mode">Tema Oscuro (Activado)</div>
                        <div v-else>Tema Oscuro (Desactivado)</div>
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-switch @change="setMode()" v-model="mode"></v-switch>
                </v-list-item-action>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
//Vuex
import { mapState, mapMutations } from "vuex";

export default {
    name: "InterfacePreferences",

    data() {
        return {
            mode: JSON.parse(window.localStorage.getItem("darkMode")) || false
        };
    },

    computed: {
        ...mapState("preferences", ["darkMode"])
    },

    methods: {
        ...mapMutations("preferences", ["modeControl"]),

        setMode: async function() {
            await this.modeControl(this.mode);
            this.$vuetify.theme.dark = this.mode;
        }
    }
};
</script>