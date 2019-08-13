<template>
    <div>
        <v-btn
            dark
            fab
            fixed
            right
            bottom
            large
            @click="createUsersDialog = !createUsersDialog"
            color="primary"
        >
            <v-icon>fas fa-plus</v-icon>
        </v-btn>

        <v-dialog v-model="createUsersDialog" width="500" persistent scrollable>
            <v-form ref="usersForm" @submit.prevent="saveUser">
                <v-card>
                    <v-card-text>
                        <h2>Nuevo Usuario</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <UsersForm mode="create"></UsersForm>
                    </v-card-text>
                    <v-card-actions>
                        <v-layout justify-end>
                            <v-btn
                                @click="cancelUser()"
                                outlined
                                color="primary"
                                class="mx-2"
                            >Cancelar</v-btn>
                            <v-btn type="submit" color="primary" class="elevation-0 mx-2">Guardar</v-btn>
                        </v-layout>
                    </v-card-actions>
                </v-card>
            </v-form>
        </v-dialog>
        <UsersIndex></UsersIndex>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import UsersIndex from "../components/users_components/UsersIndex.vue";
import UsersForm from "../components/users_components/UsersForm.vue";

export default {
    name: "Users",

    data() {
        return {
            createUsersDialog: false
        };
    },

    components: {
        UsersIndex,
        UsersForm
    },

    computed: {
        ...mapState("crudx", ["form"])
    },

    methods: {
        ...mapActions("crudx", ["index", "save"]),

        cancelUser() {
            this.$refs.usersForm.reset();
            this.$refs.usersForm.resetValidation();
            this.createUsersDialog = false;
        },

        saveUser: async function() {
            if (this.$refs.usersForm.validate()) {
                await this.save({ url: "/api/users" });
                this.index({ url: "/api/users" });
                this.createUsersDialog = false;
            }
        }
    }
};
</script>
