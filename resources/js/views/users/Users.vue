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
            <v-form ref="usersForm" @submit.prevent="userSave">
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
                                :disabled="$store.state.users.inProcess"
                                outlined
                                color="primary"
                                class="mx-2"
                            >Cancelar</v-btn>
                            <v-btn
                                :disabled="$store.state.users.inProcess"
                                :loading="$store.state.users.inProcess"
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
// Components
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

    mounted() {
        this.getUsers();
    },

    methods: {
        getUsers: async function() {
            this.process = true;
            if (this.$store.state.users.users == null) {
                await this.$store.dispatch("users/index");
            }
            this.process = false;
        },

        cancelUser() {
            this.$refs.usersForm.reset();
            this.$refs.usersForm.resetValidation();
            this.createUsersDialog = false;
        },

        userSave: async function() {
            if (this.$refs.usersForm.validate()) {
                await this.$store.dispatch("users/save");
                this.createUsersDialog = false;
                this.$store.dispatch("users/index");
            }
        }
    }
};
</script>