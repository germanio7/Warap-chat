<template>
    <div>
        <v-btn
            dark
            fab
            fixed
            right
            bottom
            large
            @click="createRolesDialog = !createRolesDialog"
            color="primary"
        >
            <v-icon>fas fa-plus</v-icon>
        </v-btn>

        <v-dialog v-model="createRolesDialog" width="500" persistent>
            <v-card>
                <v-card-text>
                    <h2>Nuevo Rol</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="roleForm" @submit.prevent="saveRole">
                        <RolesForm></RolesForm>
                        <v-layout justify-end>
                            <v-btn
                                @click="cancelRole()"
                                class="mx-2"
                                outlined
                                color="primary"
                            >Cancelar</v-btn>
                            <v-btn class="elevation-0 mx-2" type="submit" color="primary">Guardar</v-btn>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <br />
        <RolesIndex></RolesIndex>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import RolesIndex from "../components/roles_components/RolesIndex.vue";
import RolesForm from "../components/roles_components/RolesForm.vue";

export default {
    name: "Roles",

    data() {
        return {
            createRolesDialog: false
        };
    },

    components: {
        RolesIndex,
        RolesForm
    },

    computed: {
        ...mapState("crudx", ["form", "showData"])
    },

    mounted() {
        this.show({ url: "/api/roles/show" });
    },

    methods: {
        ...mapActions("crudx", ["index", "show", "save"]),

        cancelRole() {
            this.$refs.roleForm.reset();
            this.$refs.roleForm.resetValidation();
            this.createRolesDialog = false;
        },

        saveRole: async function() {
            if (this.$refs.roleForm.validate()) {
                let permission = "";
                let description = "";
                for (let i = 0; i < this.form.scope.length; i++) {
                    let find = this.showData.find(
                        permiso => permiso.id === this.form.scope[i]
                    );

                    if (find) {
                        permission = permission + find.id + " ";
                        description = description + find.description + ", ";
                    }
                }

                this.form.permission = permission;
                this.form.description = description;
                await this.save({ url: "/api/roles" });
                await this.index({ url: "/api/roles" });
                this.createRolesDialog = false;
            }
        }
    }
};
</script>