<template>
    <div>
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="fas fa-caret-down">Tema Oscuro</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-list-item-title>
                                    <div v-if="mode">Tema Oscuro (Activado)</div>
                                    <div v-else>Tema Oscuro (Desactivado)</div>
                                </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-switch @change="setMode()" v-model="mode" color="primary"></v-switch>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <p>Este tema oscurece las zonas claras de la página, lo que brinda una experiencia ideal para la noche.</p>
                                <p
                                    class="mt-2"
                                >Tu configuración de tema oscuro se aplicará solo en este navegador.</p>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="fas fa-caret-down">Colores</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list>
                        <v-divider></v-divider>
                        <div v-if="darkMode">
                            <div v-for="color in darkColorsList" :key="color.label">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ color.label }}</v-list-item-title>
                                    </v-list-item-content>
                                    <v-menu
                                        v-model="color.menu"
                                        offset-y
                                        :close-on-content-click="false"
                                        max-width="281px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-list-item-avatar
                                                :color="color.value"
                                                size="40"
                                                v-on="on"
                                                style="cursor: pointer"
                                            >
                                                <span></span>
                                            </v-list-item-avatar>
                                        </template>
                                        <v-card>
                                            <v-color-picker
                                                v-model="color.value"
                                                :swatches="swatches"
                                                show-swatch
                                                hide-mode-switch
                                                mode="hexa"
                                                flat
                                            ></v-color-picker>
                                            <v-layout justify-center>
                                                <v-btn
                                                    @click="setDark(color)"
                                                    color="primary"
                                                    class="elevation-0 mt-1 mb-3"
                                                >Guardar</v-btn>
                                            </v-layout>
                                        </v-card>
                                    </v-menu>
                                </v-list-item>
                                <v-divider></v-divider>
                            </div>
                        </div>
                        <div v-else>
                            <div v-for="color in lightColorsList" :key="color.label">
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>{{ color.label }}</v-list-item-title>
                                    </v-list-item-content>
                                    <v-menu
                                        v-model="color.menu"
                                        offset-y
                                        :close-on-content-click="false"
                                        max-width="281px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-list-item-avatar
                                                :color="color.value"
                                                size="40"
                                                v-on="on"
                                                style="cursor: pointer"
                                            >
                                                <span></span>
                                            </v-list-item-avatar>
                                        </template>
                                        <v-card>
                                            <v-color-picker
                                                v-model="color.value"
                                                :swatches="swatches"
                                                show-swatches
                                                hide-mode-switch
                                                mode="hexa"
                                                flat
                                            ></v-color-picker>
                                            <v-layout justify-center>
                                                <v-btn
                                                    @click="setLight(color)"
                                                    color="primary"
                                                    class="elevation-0 mt-1 mb-3"
                                                >Guardar</v-btn>
                                            </v-layout>
                                        </v-card>
                                    </v-menu>
                                </v-list-item>
                                <v-divider></v-divider>
                            </div>
                        </div>
                        <v-list-item>
                            <v-list-item-content>
                                <p>Los colores seleccionados modificarán ciertos elementos de la interfaz, por ejemplo, barras de navegación, alertas, botones, etc.</p>
                                <p
                                    class="mt-2"
                                >Los colores del tema oscuro y el tema claro son independientes, por lo que puedes modificar los colores de un tema sin alterar los colores del otro.</p>
                                <p
                                    class="mt-2"
                                >Tu configuración de colores se aplicará solo en este navegador.</p>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
//Vuex
import { mapState, mapMutations } from "vuex";

export default {
    name: "InterfacePreferences",

    data() {
        return {
            mode: JSON.parse(window.localStorage.getItem("darkMode")) || false,
            darkColorsList: [],
            lightColorsList: [],
            swatches: [
                ["#F44336", "#FF9800", "#FFEB3B"],
                ["#E91E63", "#9C27B0", "#673AB7"],
                ["#3F51B5", "#2196F3", "#03A9F4"],
                ["#009688", "#4CAF50", "#8BC34A"],
                ["#607D8B", "#000000", "#FFFFFF"]
            ]
        };
    },

    computed: {
        ...mapState("preferences", ["darkMode", "darkColors", "lightColors"])
    },

    mounted() {
        this.defineLightColorsList();
        this.defineDarkColorsList();
    },

    methods: {
        ...mapMutations("preferences", [
            "modeControl",
            "darkControl",
            "lightControl"
        ]),

        defineDarkColorsList() {
            for (let color in this.darkColors) {
                let label;

                switch (color) {
                    case "primary":
                        label = "Color Primario";
                        break;
                    case "secondary":
                        label = "Color Secundario";
                        break;
                    case "accent":
                        label = "Color de Acento";
                        break;
                    case "error":
                        label = "Color de Errores";
                        break;
                    case "info":
                        label = "Color de Información";
                        break;
                    case "success":
                        label = "Color de exito";
                        break;
                    case "warning":
                        label = "Color de Advertencia";
                        break;
                }

                let colorObjet = {
                    name: color,
                    label: label,
                    value: this.darkColors[color],
                    menu: false
                };

                this.darkColorsList.push(colorObjet);
            }
        },

        defineLightColorsList() {
            for (let color in this.lightColors) {
                let label;

                switch (color) {
                    case "primary":
                        label = "Color Primario";
                        break;
                    case "secondary":
                        label = "Color Secundario";
                        break;
                    case "accent":
                        label = "Color de Acento";
                        break;
                    case "error":
                        label = "Color de Errores";
                        break;
                    case "info":
                        label = "Color de Información";
                        break;
                    case "success":
                        label = "Color de exito";
                        break;
                    case "warning":
                        label = "Color de Advertencia";
                        break;
                }

                let colorObjet = {
                    name: color,
                    label: label,
                    value: this.lightColors[color],
                    menu: false
                };

                this.lightColorsList.push(colorObjet);
            }
        },

        setMode: async function() {
            await this.modeControl(this.mode);
            this.$vuetify.theme.dark = this.mode;
        },

        setLight: async function(color) {
            await this.lightControl(color);
            this.$vuetify.theme.themes.light = this.lightColors;
            for (let i = 0; i < this.lightColorsList.length; i++) {
                this.lightColorsList[i].menu = false;
            }
        },

        setDark: async function(color) {
            await this.darkControl(color);
            this.$vuetify.theme.themes.light = this.darkColors;
            for (let i = 0; i < this.darkColorsList.length; i++) {
                this.darkColorsList[i].menu = false;
            }
        }
    }
};
</script>