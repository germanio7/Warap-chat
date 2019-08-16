<template>
    <v-app
        :style="dark ? 'background: url(img/patterndark.png);' : 'background: url(img/patternlight.png);'"
    >
        <v-app-bar
            v-show="token == null"
            fixed
            flat
            dark
            extended
            src="img/background.png"
            color="primary"
        >
            <template v-slot:img="{ props }" v-show="token == null">
                <v-img
                    v-bind="props"
                    gradient="to top right, rgba(37,211,102,.5), rgba(7, 94, 84,.8)"
                ></v-img>
            </template>
            <v-toolbar-title>Warapp</v-toolbar-title>
        </v-app-bar>
        <div :class="token == null ? 'app-content' : ''">
            <v-content>
                <router-view />
            </v-content>
        </div>
    </v-app>
</template>

<script>
// Vuex
import { mapState, mapActions } from "vuex";

// axios
import axios from "axios";

export default {
    name: "App",

    computed: {
        ...mapState("auth", ["token"]),

        dark() {
            let darkMode = window.localStorage.getItem("darkMode");

            if (darkMode) {
                if (darkMode == "true") {
                    return true;
                } else if (darkMode == "false") {
                    return false;
                }
            } else {
                return false;
            }
        }
    },

    mounted() {
        if (this.token != null) {
            this.getUser();
        }
    },

    methods: {
        ...mapActions("auth", ["getUser"])
    }
};
</script>

<style>
.app-content {
    z-index: 9;
    margin-top: 56px;
}

@media (max-width: 960px) {
    .app-content {
        margin-top: 48px;
    }
}
</style>