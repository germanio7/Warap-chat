<template>
    <div>
        <InterfacePreferences></InterfacePreferences>
    </div>
</template>

<script>
// Components
import appPreferences from "./AppPreferences.vue";
import InterfacePreferences from "./InterfacePreferences.vue";

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