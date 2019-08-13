<template>
    <div>
        <v-container>
            <!-- Users Table -->

            <v-layout justify-center>
                <v-flex xs12 sm10 lg8>
                    <v-card>
                        <v-card-text>
                            <template>
                                <v-simple-table>
                                    <thead>
                                        <tr>
                                            <th class="text-xs-left">Nombre</th>
                                            <th class="text-xs-left">Email</th>
                                            <th class="txt-xs-left">Rol</th>
                                            <th class="text-xs-left"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="user in data" :key="user.id">
                                            <td>{{ user.name }}</td>
                                            <td>{{ user.email }}</td>
                                            <td>{{ user.rol }}</td>
                                            <td>
                                                <v-menu>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn color="primary" text icon v-on="on">
                                                            <v-icon size="medium">fas fa-ellipsis-v</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item
                                                            @click="edit({data: user}); editUsersDialog = true"
                                                        >
                                                            <v-list-item-title>Editar</v-list-item-title>
                                                        </v-list-item>
                                                        <v-list-item
                                                            @click="userID = user.id; deleteUsersDialog = true"
                                                        >
                                                            <v-list-item-title>Eliminar</v-list-item-title>
                                                        </v-list-item>
                                                    </v-list>
                                                </v-menu>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-simple-table>
                            </template>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>

            <!-- Edit Users Dialog -->
            <v-dialog v-model="editUsersDialog" width="500" persistent scrollable>
                <v-form ref="userForm" @submit.prevent="updateUser()">
                    <v-card>
                        <v-card-text>
                            <h2>Editar Usuario</h2>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                            <UsersForm mode="edit"></UsersForm>
                        </v-card-text>
                        <v-card-actions>
                            <v-layout justify-end>
                                <v-btn
                                    @click="closeEdit()"
                                    outlined
                                    color="primary"
                                    class="mx-2"
                                >Cancelar</v-btn>
                                <v-btn type="submit" color="primary" class="elevation-0 mx-2">Editar</v-btn>
                            </v-layout>
                        </v-card-actions>
                    </v-card>
                </v-form>
            </v-dialog>
            <!-- Delete Roles Dialog -->
            <v-dialog v-model="deleteUsersDialog" width="500" persistent>
                <v-card>
                    <v-card-text>
                        <h2>¿Estás seguro?</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>¿Estás seguro que deseas eliminar este Usuario? este cambio es irreversible</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-layout justify-end wrap>
                            <v-btn
                                @click="deleteUsersDialog = false;"
                                outlined
                                color="primary"
                                class="elevation-0 mx-2"
                            >Cancel</v-btn>
                            <v-btn @click="erase()" color="primary" class="elevation-0 mx-2">Delete</v-btn>
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
            userID: null
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
        this.index({ url: "/api/users" });
    },

    methods: {
        ...mapActions("crudx", ["index", "edit", "update", "destroy"]),
        ...mapActions("auth", ["getUser"]),

        updateUser: async function() {
            if (this.$refs.userForm.validate()) {
                await this.update({ url: "/api/users/" + this.form.id });
                this.index({ url: "/api/users" });
                this.editUsersDialog = false;
            }
        },

        closeEdit: async function() {
            await this.index({ url: "/api/users" });
            this.$refs.userForm.reset();
            this.$refs.userForm.resetValidation();
            this.editUsersDialog = false;
        },

        erase: async function() {
            await this.destroy({ url: "/api/users/" + this.userID });
            this.index({ url: "/api/users" });
            this.userID = null;
            this.deleteUsersDialog = false;
        }
    }
};
</script>