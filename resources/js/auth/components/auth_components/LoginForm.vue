<template>
    <div>
        <v-layout wrap justify-center>
            <v-flex xs12 px-3>
                <v-text-field
                    v-model="form.username"
                    :rules="[rules.required]"
                    label="Email"
                    color="primary"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs12 px-3>
                <v-text-field
                    v-model="form.password"
                    :rules="[rules.required]"
                    :append-icon="password_type ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    @click:append="password_type = !password_type"
                    :type="password_type ? 'text' : 'password'"
                    label="Contraseña"
                    color="primary"
                    outlined
                ></v-text-field>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "LoginForm",

    data() {
        return {
            password_type: false,
            rules: {
                required: value => !!value || "Este campo es obligatorio"
            }
        };
    },

    computed: {
        ...mapState("auth", ["form"])
    }
};
</script>