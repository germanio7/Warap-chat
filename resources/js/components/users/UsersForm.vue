<template>
    <div>
        <v-layout justify-center wrap>
            <v-flex xs10>
                <v-text-field
                    v-model="formUsers.name"
                    :rules="[rules.required]"
                    label="Name"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs10>
                <v-text-field
                    v-model="formUsers.email"
                    :rules="[rules.required]"
                    label="Email"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs10>
                <v-text-field
                    v-model="formUsers.password"
                    :rules="rulesPassword ? [rules.required, rules.max, rules.min] : []"
                    :append-icon="password ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    @click:append="password = !password"
                    :type="password ? 'text' : 'password'"
                    label="Password"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs10>
                <v-text-field
                    v-model="formUsers.password_confirm"
                    :rules="rulesPassword ? [rules.required, rules.max, rules.min] : []"
                    :append-icon="confirm_password ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    @click:append="confirm_password = !confirm_password"
                    :type="confirm_password ? 'text' : 'password'"
                    label="Confirm Password"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs10>
                <v-select
                    v-model="formUsers.role_id"
                    :items="roles"
                    item-text="role"
                    item-value="id"
                    label="Role"
                    outlined
                ></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
    name: "UsersForm",

    props: ["mode"],

    data() {
        return {
            selected: "",
            password: false,
            confirm_password: false,
            rules: {
                required: value => !!value || "Este campo es obligatorio",
                max: value =>
                    (value && value.length <= 255) ||
                    "Este campo no puede contener mas de 255 digitos",
                min: value =>
                    (value && value.length >= 6) ||
                    "Este campo debe contener al menos 6 digitos"
            }
        };
    },

    computed: {
        ...mapState("users", ["formUsers"]),
        ...mapState("roles", ["roles"]),

        rulesPassword() {
            if (this.mode == "create") {
                return true;
            } else if (this.mode == "edit") {
                if (this.formUsers.password) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },

    mounted() {
        if (this.roles == null) {
            this.indexRoles();
        }
    },

    methods: {
        ...mapActions("roles", ["indexRoles"])
    }
};
</script>