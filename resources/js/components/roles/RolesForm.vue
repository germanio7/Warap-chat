<template>
    <div>
        <v-layout justify-center wrap>
            <v-flex xs10>
                <v-text-field v-model="form.role" :rules="[rules.required]" label="Rol" outlined></v-text-field>
            </v-flex>
            <v-flex xs10>
                <v-select
                    v-model="form.scope"
                    :items="showData"
                    item-text="description"
                    item-value="id"
                    :rules="[rules.required]"
                    label="Permisos"
                    multiple
                    outlined
                ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "RolesForm",

    data() {
        return {
            selected: [],
            rules: {
                required: value => !!value || "Este campo es obligatorio"
            }
        };
    },

    computed: {
        ...mapState("crudx", ["form", "showData"])
    },

    mounted() {
        this.show({ url: "/api/roles/show" });
    },

    methods: {
        ...mapActions("crudx", ["show"])
    }
};
</script>
