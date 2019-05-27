<template>
    <div>
        <v-container>
            <!-- Users Table -->
            <v-layout justify-center>
                <v-flex xs12 sm10 lg8>
                    <template>
                        <v-data-table hide-actions :headers="headers" :items="data">
                            <template v-slot:items="user">
                                <td>{{ user.item.name }}</td>
                                <td>{{ user.item.email }}</td>
                                <td>
                                    <v-btn
                                        flat
                                        icon
                                        color="success"
                                        @click="edit({ data: user.item }); editUsersDialog = true;"
                                    >
                                        <v-icon size="medium">fas fa-pen</v-icon>
                                    </v-btn>
                                    <v-btn
                                        flat
                                        icon
                                        color="error"
                                        @click="userID = user.item.id; deleteUsersDialog = true"
                                        :disabled="account.user.id == user.item.id ? true : false"
                                    >
                                        <v-icon size="medium">fas fa-trash</v-icon>
                                    </v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </template>
                </v-flex>
            </v-layout>
            <!-- Edit Users Dialog -->
            <v-dialog v-model="editUsersDialog" width="500" persistent>
                <v-card>
                    <v-card-text>
                        <h2>Edit User</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form ref="userForm" @submit.prevent="updateUser()">
                            <UsersForm></UsersForm>
                            <br>
                            <v-layout justify-end>
                                <v-btn @click="editUsersDialog = false" outline color="error">Cancel</v-btn>
                                <v-btn type="submit" color="secondary">update</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Delete Roles Dialog -->
            <v-dialog v-model="deleteUsersDialog" width="400" persistent>
                <v-card>
                    <v-card-title>
                        <h2>are you sure?</h2>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>Are you sure you want to delete this user? this change is irreversible</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-layout justify-end wrap>
                            <v-btn
                                @click="deleteUsersDialog = false;"
                                outline
                                color="success"
                            >Cancel</v-btn>
                            <v-btn @click="erase()" color="error">Delete</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import UsersForm from "./UsersForm.vue";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
    name: "UserIndex",

    data() {
        return {
            editUsersDialog: false,
            deleteUsersDialog: false,
            userID: null,
            headers: [
                { text: "Name", sortable: false },
                { text: "Email", sortable: false },
                { text: "", sortable: false }
            ]
        };
    },

    components: {
        UsersForm
    },

    computed: {
        ...mapState("crudx", ["data", "form"]),
        ...mapGetters("auth", ["account"])
    },

    created() {
        this.getUser();
    },

    mounted() {
        this.index({ url: "api/users/index" });
    },

    methods: {
        ...mapActions("crudx", ["index", "edit", "update", "destroy"]),
        ...mapActions("auth", ["getUser"]),
        updateUser: async function() {
            if (this.$refs.userForm.validate()) {
                await this.update({ url: "api/users/edit/" + this.form.id });
                this.index({ url: "api/users/index" });
                this.editUsersDialog = false;
            }
        },
        erase: async function() {
            await this.destroy({ url: "api/users/delete/" + this.userID });
            this.index({ url: "api/users/index" });
            this.userID = null;
            this.deleteUsersDialog = false;
        }
    }
};
</script>