<template>
    <div>
        <v-toolbar color="primary" dark absolute>
            <v-btn @click="$router.push('/home')" icon>
                <v-icon>fas fa-arrow-left</v-icon>
            </v-btn>
            <v-toolbar-title>Roles</v-toolbar-title>
        </v-toolbar>
        <v-btn
            color="primary"
            dark
            fab
            fixed
            right
            bottom
            large
            @click="createRolesDialog = !createRolesDialog"
        >
            <v-icon>fas fa-plus</v-icon>
        </v-btn>
        <v-dialog v-model="createRolesDialog" width="500" persistent>
            <v-card>
                <v-card-text class="primary white--text">
                    <h2>Nuevo Rol</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="roleForm" @submit.prevent="saveRole">
                        <RolesForm></RolesForm>
                        <v-layout justify-end>
                            <v-btn
                                @click="cancelRole()"
                                :disabled="$store.state.roles.inProcess"
                                color="primary"
                                class="mx-2"
                                outlined
                            >Cancelar</v-btn>
                            <v-btn
                                :disabled="$store.state.roles.inProcess"
                                :loading="$store.state.roles.inProcess"
                                color="primary"
                                class="elevation-0 mx-2"
                                type="submit"
                            >Guardar</v-btn>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
        <br />
        <br />
        <br />
        <br />
        <template>
            <div class="loading" v-show="process">
                <v-layout justify-center>
                    <v-progress-circular color="primary" :size="70" :width="7" indeterminate></v-progress-circular>
                </v-layout>
            </div>
        </template>
        <RolesIndex v-show="!process"></RolesIndex>
    </div>
</template>

<script>
// Components
import RolesIndex from "../../components/roles/RolesIndex.vue";
import RolesForm from "../../components/roles/RolesForm.vue";

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

    mounted() {
        this.getRoles();
    },

    methods: {
        getRoles: async function() {
            this.process = true;
            if (this.$store.state.roles.roles == null) {
                await this.$store.dispatch("roles/index");
            }
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
                await this.$store.dispatch("roles/save");
                this.createRolesDialog = false;
                await this.$store.dispatch("roles/index");
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