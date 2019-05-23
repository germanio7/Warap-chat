<template>
    <div>
        <div v-if="errors" style="color: #FF5252;">
            <div v-for="error in error_messages" :key="error.id">{{ error }}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Error",

    props: ["tag"],

    computed: {
        ...mapState("auth", ["errors"]),

        error_messages: function() {
            return this.errors["errors"][this.tag];
        }
    }
};
</script>