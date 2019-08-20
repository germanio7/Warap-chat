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
                                        <tr v-for="user in $store.state.users.users" :key="user.id">
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
                                                            @click="$store.dispatch('users/edit', {data: user}); editUsersDialog = true"
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
                <v-form ref="userForm" @submit.prevent="userUpdate()">
                    <v-card>
                        <v-card-text class="primary white--text">
                            <h2>Editar Usuario</h2>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-text>
                            <UsersForm mode="edit"></UsersForm>
                            <v-layout justify-end>
                                <v-btn
                                    @click="closeEdit()"
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
                                >Editar</v-btn>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                </v-form>
            </v-dialog>
            <!-- Delete Roles Dialog -->
            <v-dialog v-model="deleteUsersDialog" width="500" persistent>
                <v-card>
                    <v-card-text class="error white--text">
                        <h2>¿Estás seguro?</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>¿Estás seguro que deseas eliminar este Usuario? este cambio es irreversible</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-layout justify-end wrap>
                            <v-btn
                                @click="deleteUsersDialog = false;"
                                :disabled="$store.state.users.inProcess"
                                outlined
                                color="error"
                                class="elevation-0 mx-2"
                            >Cancelar</v-btn>
                            <v-btn
                                :disabled="$store.state.users.inProcess"
                                :loading="$store.state.users.inProcess"
                                @click="erase()"
                                color="error"
                                class="elevation-0 mx-2"
                            >Eliminar</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
// Components
import UsersForm from "./UsersForm.vue";

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

    methods: {
        userUpdate: async function() {
            if (this.$refs.userForm.validate()) {
                await this.$store.dispatch("users/update", {
                    id: this.$store.state.users.form.id
                });
                this.editUsersDialog = false;
                this.$store.dispatch("users/index");
            }
        },

        closeEdit: async function() {
            await this.$store.dispatch("users/index");
            this.$refs.userForm.reset();
            this.$refs.userForm.resetValidation();
            this.editUsersDialog = false;
        },

        erase: async function() {
            await this.$store.dispatch("users/destroy", { id: this.userID });
            this.$store.dispatch("users/index");
            this.userID = null;
            this.deleteUsersDialog = false;
        }
    }
};
</script>

<style>
.loading {
    position: fixed;
    z-index: 999999;
    left: 47.3%;
    top: 44%;
}
</style>