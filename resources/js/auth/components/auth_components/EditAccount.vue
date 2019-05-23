<template>
    <div>
        <v-layout wrap justify-center>
            <v-flex xs10>
                <v-text-field
                    v-model="form.name"
                    :rules="[rules.required, rules.max]"
                    label="Name"
                    hint="Name"
                    :persistent-hint="form.name ? true : false"
                    color="secondary"
                    outline
                    single-line
                ></v-text-field>
            </v-flex>
            <v-flex xs10>
                <v-text-field
                    v-model="form.email"
                    :rules="[rules.required, rules.max]"
                    label="Email"
                    hint="Email"
                    :persistent-hint="form.name ? true : false"
                    color="secondary"
                    outline
                    single-line
                ></v-text-field>
            </v-flex>
            <v-btn flat color="info" v-show="!changePass" @click="changePass = true">Change Password</v-btn>
            <v-flex xs10 v-show="changePass">
                <v-text-field
                    v-model="form.current_password"
                    :rules="changePass ? [rules.required, rules.max, rules.min] : []"
                    :append-icon="currentPass ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    @click:append="currentPass = !currentPass"
                    :type="currentPass ? 'text' : 'password'"
                    label="Current Password"
                    hint="Current Password"
                    :persistent-hint="form.current_password ? true : false"
                    color="secondary"
                    outline
                    single-line
                ></v-text-field>
            </v-flex>
            <v-flex xs10 v-show="changePass">
                <v-text-field
                    v-model="form.password"
                    :rules="changePass ? [rules.required, rules.max, rules.min] : []"
                    :append-icon="newPass ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    @click:append="newPass = !newPass"
                    :type="newPass ? 'text' : 'password'"
                    label="New Password"
                    hint="New Password"
                    :persistent-hint="form.password ? true : false"
                    color="secondary"
                    outline
                    single-line
                ></v-text-field>
            </v-flex>
            <v-flex xs10 v-show="changePass">
                <v-text-field
                    v-model="form.confirm_password"
                    :rules="changePass ? [rules.required, rules.max, rules.min] : []"
                    :append-icon="confirmPass ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    @click:append="confirmPass = !confirmPass"
                    :type="confirmPass ? 'text' : 'password'"
                    label="Confirm Password"
                    hint="Confirm Password"
                    :persistent-hint="form.confirm_password ? true : false"
                    color="secondary"
                    outline
                    single-line
                ></v-text-field>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "EditAccount",

    data() {
        return {
            changePass: false,
            currentPass: false,
            newPass: false,
            confirmPass: false,
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