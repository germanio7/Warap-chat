<template>
    <div>
        <v-layout justify-center wrap>
            <v-flex xs10>
                <v-text-field
                    v-model="formRoles.role"
                    :rules="[rules.required]"
                    label="Rol"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs10>
                <v-select
                    v-model="formRoles.scope"
                    :items="permissions"
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
        ...mapState("roles", ["formRoles", "permissions"])
    },

    mounted() {
        this.indexPermissions();
    },

    methods: {
        ...mapActions("roles", ["indexPermissions"])
    }
};
</script>
