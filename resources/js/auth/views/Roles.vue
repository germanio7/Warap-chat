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

        <v-dialog v-model="createRolesDialog" width="400" persistent>
            <v-card>
                <v-card-text>
                    <h2>Nuevo Rol</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form ref="roleForm" @submit.prevent="saveRole">
                        <RolesForm></RolesForm>
                        <br />
                        <v-layout justify-end>
                            <v-btn
                                @click="createRolesDialog = false"
                                class="mx-2"
                                outlined
                                color="primary"
                            >Cancel</v-btn>
                            <v-btn class="elevation-0 mx-2" type="submit" color="primary">Save</v-btn>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

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
        ...mapState("crudx", ["form"])
    },

    methods: {
        ...mapActions("crudx", ["index", "save"]),

        saveRole: async function() {
            if (this.$refs.roleForm.validate()) {
                let permission = "";
                for (let i = 0; i < this.form.scope.length; i++) {
                    permission = permission + this.form.scope[i] + " ";
                }
                this.form.permission = permission;
                await this.save({ url: "api/role/save" });
                this.index({ url: "api/role/index" });
                this.createRolesDialog = false;
            }
        }
    }
};
</script>