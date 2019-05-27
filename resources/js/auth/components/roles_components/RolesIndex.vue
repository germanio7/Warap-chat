<template>
    <div>
        <v-container>
            <!-- Roles Table -->
            <v-layout justify-center>
                <v-flex xs12 sm10 lg8>
                    <template>
                        <v-data-table hide-actions :headers="headers" :items="data">
                            <template v-slot:items="rol">
                                <td>{{ rol.item.role }}</td>
                                <td>{{ rol.item.permission }}</td>
                                <td>
                                    <v-btn
                                        flat
                                        icon
                                        color="success"
                                        @click="edit({ data: rol.item }); editRolesDialog = true;"
                                    >
                                        <v-icon size="medium">fas fa-pen</v-icon>
                                    </v-btn>
                                    <v-btn
                                        flat
                                        icon
                                        color="error"
                                        @click="roleID = rol.item.id; deleteRolesDialog = true"
                                    >
                                        <v-icon size="medium">fas fa-trash</v-icon>
                                    </v-btn>
                                </td>
                            </template>
                        </v-data-table>
                    </template>
                </v-flex>
            </v-layout>
            <!-- Edit Roles Dialog -->
            <v-dialog v-model="editRolesDialog" width="400" persistent>
                <v-card>
                    <v-card-text>
                        <h2>Edit Role</h2>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-text>
                        <v-form ref="roleForm" @submit.prevent="updateRole()">
                            <RolesForm></RolesForm>
                            <br>
                            <v-layout justify-end>
                                <v-btn @click="editRolesDialog = false" outline color="error">Cancel</v-btn>
                                <v-btn type="submit" color="secondary">update</v-btn>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
            <!-- Delete Roles Dialog -->
            <v-dialog v-model="deleteRolesDialog" width="400" persistent>
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
            </v-dialog>
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
            editRolesDialog: false,
            deleteRolesDialog: false,
            roleID: null,
            headers: [
                { text: "Rol", sortable: false },
                { text: "Permission", sortable: false },
                { text: "", sortable: false }
            ]
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
        this.index({ url: "api/role/index" });
    },

    methods: {
        ...mapActions("crudx", ["index", "edit", "update", "destroy"]),

        updateRole: async function() {
            if (this.$refs.roleForm.validate()) {
                let permission = "";
                for (let i = 0; i < this.form.scope.length; i++) {
                    permission = permission + this.form.scope[i] + " ";
                }
                this.form.permission = permission;
                await this.update({ url: "api/role/edit/" + this.form.id });
                this.index({ url: "api/role/index" });
                this.editRolesDialog = false;
            }
        },

        erase: async function() {
            await this.destroy({ url: "api/role/delete/" + this.roleID });
            this.index({ url: "api/role/index" });
            this.roleID = null;
            this.deleteRolesDialog = false;
        }
    }
};
</script>