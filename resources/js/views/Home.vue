<template>
    <div>
        <br />
        <br />
        <br />
        <v-layout wrap>
            <v-flex xs12>
                <v-layout justify-center>
                    <img src="images/logo.png" width="300" height="300" />
                </v-layout>
            </v-flex>
            <v-flex xs12 style="text-align: center;">
                <br />
                <h1 class="display-2 font-weight-light secondary--text">{{ appName }}</h1>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
// Vuex
import { mapState } from "vuex";

export default {
    name: "Home",

    computed: {
        ...mapState("preferences", ["appName"])
    }
};
</script>
