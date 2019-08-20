<template>
    <div>
        <v-layout justify-center wrap>
            <v-flex xs10>
                <v-text-field
                    v-model="$store.state.roles.form.role"
                    :rules="[rules.required]"
                    label="Rol"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs10>
                <v-select
                    v-model="$store.state.roles.form.scope"
                    :items="$store.state.roles.permissions"
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

    mounted() {
        this.$store.dispatch("roles/show");
    }
};
</script>
