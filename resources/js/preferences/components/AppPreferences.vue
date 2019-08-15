<template>
    <div>
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="fas fa-caret-down">Nombre de la Aplicación</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-flex xs8 sm6>
                                    <v-text-field
                                        v-model="aplicationName"
                                        placeholder="Nombre de la Aplicación"
                                        color="primary"
                                        outlined
                                    ></v-text-field>
                                </v-flex>
                            </v-list-item-content>
                            <v-list-item-action style="margin-top: -15px;">
                                <v-btn
                                    :loading="process"
                                    @click="updateName()"
                                    text
                                    icon
                                    color="primary"
                                >
                                    <v-icon size="medium">fas fa-pen</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <p>Nombre que será mostrado en distintas partes de la aplicación.</p>
                                <p
                                    class="mt-2"
                                >Por ejemplo, en pantallas de bienvenida, errores, etc.</p>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header expand-icon="fas fa-caret-down">Logo</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-list>
                        <v-list-item>
                            <v-list-item-content>
                                <v-layout justify-center>
                                    <v-flex>
                                        <v-layout justify-end>
                                            <croppa
                                                v-model="logo"
                                                :width="260"
                                                :height="260"
                                                placeholder="Logo"
                                                placeholder-color="#000"
                                                :placeholder-font-size="24"
                                                canvas-color="transparent"
                                                :show-remove-button="false"
                                                :show-loading="true"
                                                :loading-size="25"
                                                :prevent-white-space="true"
                                                :zoom-speed="10"
                                                initial-image="images/logo.png"
                                            ></croppa>
                                        </v-layout>
                                    </v-flex>
                                    <v-flex style="margin-top: -5px;">
                                        <v-layout column>
                                            <v-btn text icon color="primary" @click="logo.zoomIn()">
                                                <v-icon>fas fa-search-plus</v-icon>
                                            </v-btn>
                                            <v-btn
                                                text
                                                icon
                                                color="primary"
                                                @click="logo.zoomOut()"
                                            >
                                                <v-icon>fas fa-search-minus</v-icon>
                                            </v-btn>
                                            <v-btn text icon color="primary" @click="logo.rotate()">
                                                <v-icon>fas fa-redo-alt</v-icon>
                                            </v-btn>
                                            <div v-if="logo != null">
                                                <v-btn
                                                    v-show="logo.hasImage()"
                                                    text
                                                    icon
                                                    color="primary"
                                                    @click="logo.remove()"
                                                >
                                                    <v-icon>fas fa-times</v-icon>
                                                </v-btn>
                                                <v-btn
                                                    v-show="!logo.hasImage()"
                                                    text
                                                    icon
                                                    color="primary"
                                                    @click="logo.chooseFile()"
                                                >
                                                    <v-icon>fas fa-plus</v-icon>
                                                </v-btn>
                                            </div>
                                            <div v-if="logo != null">
                                                <v-btn
                                                    @click="updateLogo()"
                                                    :disabled="!logo.hasImage()"
                                                    :loading="process"
                                                    text
                                                    icon
                                                    color="primary"
                                                >
                                                    <v-icon size="medium">fas fa-pen</v-icon>
                                                </v-btn>
                                            </div>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-list-item-content>
                        </v-list-item>
                        <v-divider></v-divider>
                        <v-list-item>
                            <v-list-item-content>
                                <p>Logo que será mostrado en distintas partes de la aplicación.</p>
                                <p
                                    class="mt-2"
                                >Por ejemplo, en pantallas de bienvenida, errores, etc.</p>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>

<script>
// axios
import axios from "axios";

// vuex
import { mapState, mapActions } from "vuex";

export default {
    name: "AppPreferences",

    data() {
        return {
            process: false,
            aplicationName: window.localStorage.getItem("appName"),
            logo: null
        };
    },

    computed: {
        ...mapState("preferences", ["appName"])
    },

    methods: {
        ...mapActions("preferences", ["updateAppName", "updateAppLogo"]),

        updateName: async function() {
            if (this.aplicationName) {
                this.process = true;
                await this.updateAppName({
                    url: "/api/preferences/update",
                    appName: this.aplicationName
                });
                document.getElementById(
                    "appTitle"
                ).innerHTML = this.aplicationName;
                this.process = false;
            }
        },

        updateLogo: async function() {
            this.process = true;
            await this.updateAppLogo({
                url: "/api/preferences/update",
                logo: this.logo.generateDataUrl()
            });
            this.process = false;
        }
    }
};
</script>