<template>
    <div>
        <v-layout wrap justify-center>
            <v-flex xs12 px-3>
                <v-text-field
                    v-model="form.name"
                    :rules="[rules.required, rules.max]"
                    label="Nombre"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs12 px-3>
                <v-text-field
                    v-model="form.email"
                    :rules="[rules.required, rules.max]"
                    label="Email"
                    outlined
                ></v-text-field>
            </v-flex>
            <v-flex xs12 px-3>
                <v-text-field
                    v-model="form.password"
                    :rules="[rules.required, rules.max, rules.min]"
                    :append-icon="password_type ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    @click:append="password_type = !password_type"
                    :type="password_type ? 'text' : 'password'"
                    label="Contraseña"
                    outlined
                ></v-text-field>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "RegisterForm",

    data() {
        return {
            password_type: false,
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
        ...mapState("auth", ["form"])
    }
};
</script>
