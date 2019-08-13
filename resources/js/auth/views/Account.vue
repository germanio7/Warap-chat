<template>
    <div>
        <br />
        <v-layout justify-center>
            <v-flex xs10 lg8>
                <v-layout justify-center>
                    <!-- Login/register card -->
                    <v-card width="400" height="350">
                        <v-card-text style="padding: 0;">
                            <v-layout wrap>
                                <!-- User View -->
                                <v-flex xs12 pa-2>
                                    <v-layout justify-end>
                                        <v-menu offset-y>
                                            <template v-slot:activator="{ on }">
                                                <v-btn color="primary" dark icon v-on="on">
                                                    <v-icon size="medium">fas fa-ellipsis-v</v-icon>
                                                </v-btn>
                                            </template>
                                            <v-list>
                                                <v-list-item
                                                    @click="editAccount(); editDialog = true"
                                                >
                                                    <v-list-item-title>Editar</v-list-item-title>
                                                </v-list-item>
                                                <v-list-item @click="deleteDialog = true">
                                                    <v-list-item-title>Eliminar</v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-layout>
                                    <br />
                                    <br />
                                    <v-layout justify-center wrap>
                                        <v-flex xs12>
                                            <v-layout justify-center>
                                                <v-avatar class="profile" size="86">
                                                    <span class="display-1">{{ account.profile }}</span>
                                                </v-avatar>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs12 style="text-align: center; margin-top: 40px">
                                            <h1 class="primary--text">{{ account.user.name }}</h1>
                                        </v-flex>
                                        <v-flex xs12 style="text-align: center;">
                                            <h3
                                                class="text-xs-center primary--text"
                                            >{{ account.user.email }}</h3>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <!-- Edit Account Dialog -->
                    <v-dialog v-model="editDialog" width="500" persistent>
                        <v-card>
                            <v-form ref="edit_form" @submit.prevent="edit()">
                                <v-card-text>
                                    <h2>Editar Datos</h2>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <EditAccount></EditAccount>
                                </v-card-text>
                                <v-divider></v-divider>
                                <v-card-text>
                                    <v-layout justify-end wrap>
                                        <v-btn
                                            @click="editDialog = false;"
                                            outlined
                                            color="primary"
                                            class="mx-2"
                                        >Cancelar</v-btn>
                                        <v-btn
                                            type="submit"
                                            color="primary"
                                            class="elevation-0 mx-2"
                                        >Editar</v-btn>
                                    </v-layout>
                                </v-card-text>
                            </v-form>
                        </v-card>
                    </v-dialog>
                    <!-- Delete Account Dialog -->
                    <v-dialog v-model="deleteDialog" width="500" persistent>
                        <v-card>
                            <v-card-title>
                                <h3>Estas Seguro?</h3>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>Estas seguro que deseas eliminar tu cuenta? este cambio es irreversible</v-card-text>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-layout justify-end wrap>
                                    <v-btn
                                        @click="deleteDialog = false;"
                                        outlined
                                        color="primary"
                                        class="mx-2"
                                    >Cancelar</v-btn>
                                    <v-btn @click="erase()" color="primary" class="mx-2">Eliminar</v-btn>
                                </v-layout>
                            </v-card-text>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import EditAccount from "../components/auth_components/EditAccount.vue";
import { mapState, mapGetters, mapActions } from "vuex";

export default {
    name: "Account",

    data() {
        return {
            editDialog: false,
            deleteDialog: false
        };
    },

    components: {
        EditAccount
    },

    computed: {
        ...mapGetters("auth", ["account"])
    },

    mounted() {
        this.getUser();
    },

    methods: {
        ...mapActions("auth", [
            "getUser",
            "editAccount",
            "updateAccount",
            "deleteAccount"
        ]),
        edit: async function() {
            if (this.$refs.edit_form.validate()) {
                await this.updateAccount();
                await this.getUser();
                this.editDialog = false;
            }
        },
        erase: async function() {
            await this.deleteAccount();
            this.$router.push("/");
        }
    }
};
</script>

<style>
.profile {
    border: solid 3px #41b883;
    background-color: rgb(65, 184, 131, 0.25);
}

.profile span {
    color: #41b883;
}
</style>