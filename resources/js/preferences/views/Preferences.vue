<template>
    <div>
        <v-toolbar dark absolute color="primary">
            <v-btn @click="$router.push('/main')" icon>
                <v-icon>fas fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Preferencias</v-toolbar-title>
        </v-toolbar>
        <v-container>
            <br />
            <br />
            <br />
            <br />
            <v-layout justify-center wrap>
                <v-flex xs12 sm8 v-show="rol == 'superAdmin'">
                    <h2 class="title">Aplicación</h2>
                    <appPreferences></appPreferences>
                    <br />
                </v-flex>
                <v-flex xs12 sm8>
                    <h2 class="title">Interfaz</h2>
                    <InterfacePreferences></InterfacePreferences>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
// Components
import appPreferences from "../components/appPreferences.vue";
import InterfacePreferences from "../components/InterfacePreferences.vue";

// Vuex
import { mapState } from "vuex";

export default {
    name: "Preferences",

    components: {
        appPreferences,
        InterfacePreferences
    },

    computed: {
        ...mapState("auth", ["rol"])
    }
};
</script>