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
                                :disabled="inProcess"
                                class="mx-2"
                                outlined
                                color="primary"
                            >Cancelar</v-btn>
                            <v-btn
                                :disabled="inProcess"
                                :loading="inProcess"
                                class="elevation-0 mx-2"
                                type="submit"
                                color="primary"
                            >Guardar</v-btn>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <br />
        <template>
            <div class="loading" v-show="process">
                <v-layout justify-center>
                    <v-progress-circular :size="70" :width="7" color="primary" indeterminate></v-progress-circular>
                </v-layout>
            </div>
        </template>
        <RolesIndex v-show="!process"></RolesIndex>
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
            process: false,
            createRolesDialog: false
        };
    },

    components: {
        RolesIndex,
        RolesForm
    },

    computed: {
        ...mapState("crudx", ["inProcess", "form", "showData"])
    },

    mounted() {
        this.getRoles();
    },

    methods: {
        ...mapActions("crudx", ["index", "show", "save"]),

        getRoles: async function() {
            this.process = true;
            let response = await this.index({ url: "/api/roles" });
            this.process = false;
        },

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
                this.createRolesDialog = false;
                await this.getRoles();
            }
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