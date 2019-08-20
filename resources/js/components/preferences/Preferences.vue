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
                </v-btn>Configuración
            </v-toolbar-title>
        </v-toolbar>
        <v-list>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>
                        <div v-if="mode">Tema Oscuro (Activado)</div>
                        <div v-else>Tema Oscuro (Desactivado)</div>
                    </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    <v-switch color="primary" @change="darkControl()" v-model="mode"></v-switch>
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <p>Este tema oscurece las zonas claras de la página, lo que brinda una experiencia ideal para la noche</p>
                    <p
                        class="mt-3"
                    >Tu configuración de tema oscuro se aplicará solo en este navegador.</p>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </div>
</template>

<script>
export default {
    name: "Preferences",

    data() {
        return {
            mode: JSON.parse(window.localStorage.getItem("darkMode")) || false
        };
    },

    methods: {
        darkControl: async function() {
            await this.$store.commit("preferences/modeControl", {
                value: this.mode
            });
            this.$vuetify.theme.dark = this.mode;
        }
    }
};
</script>