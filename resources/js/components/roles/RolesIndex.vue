<template>
    <div>
        <v-container>
            <!-- Roles Table -->
            <v-layout justify-center>
                <v-flex xs12 sm10 lg8>
                    <v-card>
                        <v-card-text>
                            <template>
                                <v-simple-table>
                                    <thead>
                                        <tr>
                                            <th class="text-xs-left">Rol</th>
                                            <th class="text-xs-left">Permisos</th>
                                            <th class="text-xs-left"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="rol in $store.state.roles.roles" :key="rol.id">
                                            <td>{{ rol.role }}</td>
                                            <td class="tokens-description">{{ rol.description }}</td>
                                            <td>
                                                <v-menu>
                                                    <template v-slot:activator="{ on }">
                                                        <v-btn color="primary" text icon v-on="on">
                                                            <v-icon size="medium">fas fa-ellipsis-v</v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <v-list>
                                                        <v-list-item
                                                            @click="$store.dispatch('roles/edit', {data: rol}); editRolesDialog = true"
                                                        >
                                                            <v-list-item-title>Editar</v-list-item-title>
                                                        </v-list-item>
                                                        <v-list-item
                                                            @click="roleID = rol.id; deleteRolesDialog = true;"
                                                        >
                                                            <v-list-item-title>Eliminar</v-list-item-title>
                                                        </v-list-item>
                                                        <v-divider></v-divider>
                                                        <v-list-item @click="openPermisos(rol)">
                                                            <v-list-item-title>Ver Permisos</v-list-item-title>
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
            <!-- Edit Roles Dialog -->
            <v-dialog v-model="editRolesDialog" width="500" persistent>
                <v-card>
                    <v-card-text class="primary white--text">
                        <h2>Editar Rol</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form ref="roleForm" @submit.prevent="rolesUpdate()">
                            <br />
                            <RolesForm></RolesForm>
                            <v-layout justify-end wrap>
                                <v-btn
                                    @click="closeEdit()"
                                    :disabled="$store.state.roles.inProcess"
                                    outlined
                                    color="primary"
                                    class="mx-2"
                                >Cancelar</v-btn>
                                <v-btn
                                    :disabled="$store.state.roles.inProcess"
                                    :loading="$store.state.roles.inProcess"
                                    type="submit"
                                    color="primary"
                                    class="elevation-0 mx-2"
                                >Editar</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Delete Roles Dialog -->
            <v-dialog v-model="deleteRolesDialog" width="500" persistent>
                <v-card>
                    <v-card-text class="error white--text">
                        <h2>¿Estás seguro?</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>¿Estás seguro que deseas eliminar este Rol? este cambio es irreversible</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-layout justify-end wrap>
                            <v-btn
                                @click="deleteRolesDialog = false;"
                                :disabled="$store.state.roles.inProcess"
                                outlined
                                color="error"
                                class="mx-2"
                            >Cancelar</v-btn>
                            <v-btn
                                @click="erase()"
                                :disabled="$store.state.roles.inProcess"
                                :loading="$store.state.roles.inProcess"
                                color="error"
                                class="elevation-0 mx-2"
                            >Eliminar</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Permisos Roles Dialog -->
            <v-dialog v-model="permisosRolesDialog" width="600" persistent scrollable>
                <v-card>
                    <v-card-title class="primary pa-0 white--text">
                        <div class="ml-5">Permisos</div>
                        <v-spacer></v-spacer>
                        <v-btn dark @click="closePermisos()" icon>
                            <v-icon size="medium">fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-list-item two-line v-for="permiso in permisos" :key="permiso.id">
                            <v-list-item-content>
                                <v-list-item-title>{{permiso.descripcion}}</v-list-item-title>
                                <v-list-item-subtitle>{{permiso.permiso}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>

<script>
import RolesForm from "./RolesForm.vue";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
    name: "RoleIndex",

    data() {
        return {
            editRolesDialog: false,
            deleteRolesDialog: false,
            permisosRolesDialog: false,
            permisos: [],
            roleID: null
        };
    },

    components: {
        RolesForm
    },

    updated() {
        if (this.$store.state.roles.form.permission) {
            if (typeof (this.$store.state.roles.form.permission == "string")) {
                this.$store.state.roles.form.scope = this.$store.state.roles.form.permission.split(
                    [" "]
                );
            }
        }
    },

    methods: {
        rolesUpdate: async function() {
            if (this.$refs.roleForm.validate()) {
                let permission = "";
                let description = "";
                for (
                    let i = 0;
                    i < this.$store.state.roles.form.scope.length;
                    i++
                ) {
                    let find = this.$store.state.roles.permissions.find(
                        permiso =>
                            permiso.id === this.$store.state.roles.form.scope[i]
                    );
                    if (find) {
                        permission = permission + find.id + " ";
                        description = description + find.description + ", ";
                    }
                }
                this.$store.state.roles.form.permission = permission;
                this.$store.state.roles.form.description = description;
                await this.$store.dispatch("roles/update", {
                    id: this.$store.state.roles.form.id
                });
                this.$refs.roleForm.reset();
                await this.$store.dispatch("roles/index");
                this.editRolesDialog = false;
            }
        },

        closeEdit: async function() {
            this.editRolesDialog = false;
            await this.$store.dispatch("roles/index");
            this.$refs.roleForm.reset();
            this.$refs.roleForm.resetValidation();
        },

        openPermisos(rol) {
            let permisos = rol.permission.split(" ");
            let descripciones = rol.description.split(", ");

            for (let i = 0; i < descripciones.length; i++) {
                let newPermiso = {
                    permiso: permisos[i],
                    descripcion: descripciones[i]
                };

                this.permisos.push(newPermiso);
            }

            this.permisosRolesDialog = true;
        },

        closePermisos() {
            this.permisos = [];
            this.permisosRolesDialog = false;
        },

        erase: async function() {
            await this.$store.dispatch("roles/destroy", { id: this.roleID });
            await this.$store.dispatch("roles/index");
            this.roleID = null;
            this.deleteRolesDialog = false;
        }
    }
};
</script>

<style>
.tokens-description {
    display: inline-block;
    margin-top: 26px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
@media (min-width: 600px) {
    .tokens-description {
        max-width: 200px;
    }
}
@media (min-width: 960px) {
    .tokens-description {
        max-width: 400px;
    }
}
</style>
