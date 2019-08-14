<template>
    <div>
        <v-container>
            <br />
            <v-layout justify-center wrap>
                <v-flex xs12 sm8>
                    <h2 class="title">Aplicación</h2>
                    <appPreferences></appPreferences>
                </v-flex>
                <v-flex xs12 sm8>
                    <br />
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

export default {
    name: "Preferences",

    components: {
        appPreferences,
        InterfacePreferences
    }
};
</script>