<template>
    <div>
        <v-btn
            dark
            fab
            fixed
            right
            bottom
            @click="createUsersDialog = !createUsersDialog"
            color="secondary"
        >
            <v-icon>fas fa-plus</v-icon>
        </v-btn>

        <v-dialog v-model="createUsersDialog" width="400" persistent>
            <v-card>
                <v-card-text>
                    <h2>New User</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="usersForm" @submit.prevent="saveUser">
                        <UsersForm></UsersForm>
                        <br>
                        <v-layout justify-end>
                            <v-btn @click="createUsersDialog = false" outline color="error">Cancel</v-btn>
                            <v-btn type="submit" color="secondary">Save</v-btn>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
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

        saveUser: async function() {
            if (this.$refs.usersForm.validate()) {
                await this.save({ url: "api/users/save" });
                this.index({ url: "api/users/index" });
                this.createUsersDialog = false;
            }
        }
    }
};
</script>
