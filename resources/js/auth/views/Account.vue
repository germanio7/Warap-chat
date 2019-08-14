<template>
    <div>
        <br />dark
        <v-layout justify-center>
            <v-flex xs10 lg8>
                <v-layout justify-center>
                    <!-- Login/register card -->
                    <v-card width="400" height="350" v-show="!editFoto">
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
                                    <v-layout justify-center wrap>
                                        <v-flex xs12>
                                            <v-layout justify-center>
                                                <v-badge v-model="badge" bottom color="transparent">
                                                    <template v-slot:badge>
                                                        <v-icon color="primary">fas fa-pen</v-icon>
                                                    </template>
                                                    <div
                                                        v-if="account.user.foto != null"
                                                        @mouseover="badge = true"
                                                        @mouseleave="badge = false"
                                                    >
                                                        <v-avatar
                                                            color="primary"
                                                            size="86"
                                                            style="cursor: pointer;"
                                                            @click="editFoto = true"
                                                        >
                                                            <img :src="account.user.foto" />
                                                        </v-avatar>
                                                    </div>
                                                    <div
                                                        v-else
                                                        @mouseover="badge = true"
                                                        @mouseleave="badge = false"
                                                    >
                                                        <v-avatar
                                                            color="primary"
                                                            size="86"
                                                            style="cursor: pointer;"
                                                            @click="editFoto = true"
                                                        >
                                                            <span
                                                                class="display-1 white--text"
                                                            >{{ account.profile }}</span>
                                                        </v-avatar>
                                                    </div>
                                                </v-badge>
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
                    <!-- Edit Photo -->
                    <v-layout justify-center v-show="editFoto">
                        <v-flex xs12 sm6 px-2>
                            <br />
                            <v-layout justify-center wrap>
                                <croppa
                                    v-model="foto"
                                    :width="200"
                                    :height="200"
                                    placeholder="Foto de Perfil"
                                    placeholder-color="#000"
                                    :placeholder-font-size="24"
                                    canvas-color="transparent"
                                    :show-remove-button="false"
                                    :show-loading="true"
                                    :loading-size="25"
                                    :prevent-white-space="true"
                                    :zoom-speed="10"
                                ></croppa>
                                <v-flex xs12 px-2>
                                    <v-layout justify-center>
                                        <v-btn text icon color="primary" @click="foto.zoomIn()">
                                            <v-icon>fas fa-search-plus</v-icon>
                                        </v-btn>
                                        <v-btn text icon color="primary" @click="foto.zoomOut()">
                                            <v-icon>fas fa-search-minus</v-icon>
                                        </v-btn>
                                        <v-btn text icon color="primary" @click="foto.rotate()">
                                            <v-icon>fas fa-redo-alt</v-icon>
                                        </v-btn>
                                        <div v-if="foto != null">
                                            <v-btn
                                                v-show="foto.hasImage()"
                                                text
                                                icon
                                                color="primary"
                                                @click="foto.remove()"
                                            >
                                                <v-icon>fas fa-times</v-icon>
                                            </v-btn>
                                            <v-btn
                                                v-show="!foto.hasImage()"
                                                text
                                                icon
                                                color="primary"
                                                @click="foto.chooseFile()"
                                            >
                                                <v-icon>fas fa-plus</v-icon>
                                            </v-btn>
                                        </div>
                                    </v-layout>
                                </v-flex>
                                <v-flex xs12 px-2>
                                    <br />
                                    <v-layout justify-center>
                                        <v-btn
                                            @click="editFoto = false"
                                            :disabled="inProcess"
                                            outlined
                                            color="primary"
                                            class="mx-2"
                                        >Cancelar</v-btn>
                                        <v-btn
                                            @click="confirmEditFoto()"
                                            :disabled="inProcess"
                                            :loading="inProcess"
                                            color="primary"
                                            class="mx-2 elevation-0"
                                        >Guardar</v-btn>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
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
            deleteDialog: false,
            editFoto: false,
            foto: null,
            badge: false
        };
    },

    components: {
        EditAccount
    },

    computed: {
        ...mapState("auth", ["inProcess"]),
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
            "updatePhoto",
            "deleteAccount"
        ]),
        edit: async function() {
            if (this.$refs.edit_form.validate()) {
                await this.updateAccount();
                await this.getUser();
                this.editDialog = false;
            }
        },

        confirmEditFoto: async function() {
            if (this.foto != null) {
                await this.updatePhoto({ foto: this.foto.generateDataUrl() });
                await this.getUser();
                this.editFoto = false;
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
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>