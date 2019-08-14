<template>
    <div>
        <v-container>
            <br />
            <v-layout justify-center>
                <v-flex xs12 sm8>
                    <v-card>
                        <v-card-text>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>Tema Oscuro</v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-switch @change="modeControl" v-model="darkMode"></v-switch>
                                    </v-list-item-action>
                                </v-list-item>
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
                                                min-width="250px"
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
                                                        hide-mode-switch
                                                        mode="hexa"
                                                        flat
                                                    ></v-color-picker>
                                                    <v-layout justify-center>
                                                        <v-btn
                                                            @click="darkControl(color)"
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
                                                min-width="250px"
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
                                                        hide-mode-switch
                                                        mode="hexa"
                                                        flat
                                                    ></v-color-picker>
                                                    <v-layout justify-center>
                                                        <v-btn
                                                            @click="lightControl(color)"
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
                            </v-list>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Preferences",

    data() {
        return {
            darkMode: false,
            darkColors: {},
            lightColors: {},
            darkColorsList: [],
            lightColorsList: []
        };
    },

    mounted() {
        this.setPreferences();
    },

    methods: {
        setPreferences() {
            this.darkMode = JSON.parse(window.localStorage.getItem("darkMode"));
            this.darkColors = JSON.parse(
                window.localStorage.getItem("darkColors")
            );
            this.lightColors = JSON.parse(
                window.localStorage.getItem("lightColors")
            );

            this.defineLightColorsList();
            this.defineDarkColorsList();
        },

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

        modeControl() {
            this.$vuetify.theme.dark = this.darkMode;
            window.localStorage.setItem(
                "darkMode",
                JSON.stringify(this.darkMode)
            );
        },

        darkControl(color) {
            this.darkColors[color.name] = color.value;

            this.$vuetify.theme.themes.dark = this.darkColors;
            window.localStorage.setItem(
                "darkColors",
                JSON.stringify(this.darkColors)
            );

            for (let i = 0; i < this.darkColorsList.length; i++) {
                this.darkColorsList[i].menu = false;
            }
        },

        lightControl(color) {
            this.lightColors[color.name] = color.value;

            this.$vuetify.theme.themes.light = this.lightColors;
            window.localStorage.setItem(
                "lightColors",
                JSON.stringify(this.lightColors)
            );

            for (let i = 0; i < this.lightColorsList.length; i++) {
                this.lightColorsList[i].menu = false;
            }
        }
    }
};
</script>