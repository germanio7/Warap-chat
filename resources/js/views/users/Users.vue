<template>
    <div>
        <v-toolbar color="primary" dark absolute>
            <v-btn @click="$router.push('/home')" icon>
                <v-icon>fas fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Usuarios</v-toolbar-title>
        </v-toolbar>
        <v-btn
            color="primary"
            dark
            fab
            fixed
            right
            bottom
            large
            @click="createUsersDialog = !createUsersDialog"
        >
            <v-icon>fas fa-plus</v-icon>
        </v-btn>
        <v-dialog v-model="createUsersDialog" width="500" persistent scrollable>
            <v-form ref="usersForm" @submit.prevent="saveUser">
                <v-card>
                    <v-card-text class="primary white--text">
                        <h2>Nuevo Usuario</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <UsersForm mode="create"></UsersForm>
                        <v-layout justify-end>
                            <v-btn
                                @click="cancelUser()"
                                :disabled="inProcess"
                                outlined
                                color="primary"
                                class="mx-2"
                            >Cancelar</v-btn>
                            <v-btn
                                :disabled="inProcess"
                                :loading="inProcess"
                                type="submit"
                                color="primary"
                                class="elevation-0 mx-2"
                            >Guardar</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-form>
        </v-dialog>
        <br />
        <br />
        <br />
        <br />
        <template>
            <div class="loading" v-show="process">
                <v-layout justify-center>
                    <v-progress-circular color="primary" :size="70" :width="7" indeterminate></v-progress-circular>
                </v-layout>
            </div>
        </template>
        <UsersIndex v-show="!process"></UsersIndex>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import UsersIndex from "../../components/users/UsersIndex.vue";
import UsersForm from "../../components/users/UsersForm.vue";

export default {
    name: "Users",

    data() {
        return {
            process: false,
            createUsersDialog: false
        };
    },

    components: {
        UsersIndex,
        UsersForm
    },

    computed: {
        ...mapState("crudx", ["inProcess", "form"])
    },

    mounted() {
        this.getUsers();
    },

    methods: {
        ...mapActions("crudx", ["index", "save"]),

        getUsers: async function() {
            this.process = true;
            await this.index({ url: "/api/users" });
            this.process = false;
        },

        cancelUser() {
            this.$refs.usersForm.reset();
            this.$refs.usersForm.resetValidation();
            this.createUsersDialog = false;
        },

        saveUser: async function() {
            if (this.$refs.usersForm.validate()) {
                await this.save({ url: "/api/users" });
                this.createUsersDialog = false;
                this.getUsers();
            }
        }
    }
};
</script>