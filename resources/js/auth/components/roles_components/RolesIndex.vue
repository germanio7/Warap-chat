<template>
    <div>
        <v-container>
            <!-- Roles Table -->
            <v-layout justify-center>
                <v-flex xs12 sm10 lg8>
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
                                <tr v-for="rol in data" :key="rol.id">
                                    <td>{{ rol.role }}</td>
                                    <td>{{ rol.description }}</td>
                                    <td>
                                        <v-menu>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary" text icon v-on="on">
                                                    <v-icon size="medium">fas fa-ellipsis-v</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item @click="editRolesDialog = true">
                                                    <v-list-item-title>Editar</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item>
                                                    <v-list-item-title>Eliminar</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </template>
                </v-flex>
            </v-layout>
            <!-- Edit Roles Dialog -->
            <v-dialog v-model="editRolesDialog" width="400" persistent>
                <v-card>
                    <v-card-text>
                        <h2>Editar Rol</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form ref="roleForm" @submit.prevent="updateRole()">
                            <br />
                            <RolesForm></RolesForm>
                            <v-layout justify-end wrap>
                                <v-btn
                                    @click="editRolesDialog = false"
                                    outlined
                                    color="primary"
                                    class="mx-2"
                                >Cancelar</v-btn>
                                <v-btn type="submit" color="primary" class="elevation-0 mx-2">Editar</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Delete Roles Dialog -->
            <!-- <v-dialog v-model="deleteRolesDialog" width="400" persistent>
                <v-card>
                    <v-card-title>
                        <h2>are you sure?</h2>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>Are you sure you want to delete this role? this change is irreversible</v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-layout justify-end wrap>
                            <v-btn
                                @click="deleteRolesDialog = false;"
                                outline
                                color="success"
                            >Cancel</v-btn>
                            <v-btn @click="erase()" color="error">Delete</v-btn>
                        </v-layout>
                    </v-card-text>
                </v-card>
            </v-dialog>-->
        </v-container>
    </div>
</template>

<script>
import RolesForm from "./RolesForm.vue";
import { mapState, mapActions } from "vuex";

export default {
    name: "RoleIndex",

    data() {
        return {
            roles: [],
            editRolesDialog: false,
            deleteRolesDialog: false,
            roleID: null
        };
    },

    components: {
        RolesForm
    },

    updated() {
        if (this.form.permission) {
            if (typeof (this.form.permission == "string")) {
                this.form.scope = this.form.permission.split([" "]);
            }
        }
    },

    computed: {
        ...mapState("crudx", ["data", "form"])
    },

    mounted() {
        this.getRoles();
    },

    methods: {
        ...mapActions("crudx", ["index", "edit", "update", "destroy"]),

        getRoles: async function() {
            let response = await this.index({ url: "/api/roles" });
            this.roles = response;
        },

        updateRole: async function() {
            if (this.$refs.roleForm.validate()) {
                let permission = "";
                for (let i = 0; i < this.form.scope.length; i++) {
                    permission = permission + this.form.scope[i] + " ";
                }
                this.form.permission = permission;
                await this.update({ url: "/api/roles" + this.form.id });
                this.index({ url: "/api/roles" });
                this.editRolesDialog = false;
            }
        },

        erase: async function() {
            await this.destroy({ url: "/api/roles" + this.roleID });
            this.index({ url: "/api/roles" });
            this.roleID = null;
            this.deleteRolesDialog = false;
        }
    }
};
</script>