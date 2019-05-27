<template>
    <div>
        <v-layout justify-center wrap>
            <v-flex xs10>
                <Error tag="role"></Error>
                <v-text-field
                    v-model="form.role"
                    :rules="[rules.required]"
                    label="Role"
                    hint="Role"
                    color="secondary"
                    outline
                    single-line
                ></v-text-field>
            </v-flex>
            <v-flex xs10>
                <Error tag="permission"></Error>
                <v-select
                    v-model="form.scope"
                    :items="showData"
                    item-text="id"
                    item-value="id"
                    label="Permission"
                    color="secondary"
                    multiple
                    outline
                    single-line
                ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import Error from "../Error.vue";
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

    components: {
        Error
    },

    computed: {
        ...mapState("crudx", ["form", "showData"])
    },

    mounted() {
        this.show({ url: "api/role/show" });
    },

    methods: {
        ...mapActions("crudx", ["show"])
    }
};
</script>
