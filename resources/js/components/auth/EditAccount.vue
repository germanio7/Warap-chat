<template>
    <div>
        <v-toolbar color="primary" dark prominent flat>
            <v-toolbar-title>
                <v-btn @click="setMode('chat')" icon style="margin: 0px 15px 4px 0px;">
                    <v-icon>fas fa-arrow-left</v-icon>
                </v-btn>Perfil
            </v-toolbar-title>
        </v-toolbar>
        <!-- Ver y editar Foto -->
        <v-layout justify-center>
            <v-flex xs12>
                <br />
                <v-layout justify-center>
                    <v-menu absolute>
                        <template v-slot:activator="{ on }">
                            <v-avatar v-on="on" size="160" color="primary" style="cursor: pointer;">
                                <img
                                    v-show="account.user.foto != null"
                                    :src="account.user.foto"
                                    width="100%"
                                    height="auto"
                                />
                                <span
                                    v-show="account.user.foto == null"
                                    class="white--text"
                                    style="font-size: 60px;"
                                >{{ account.profile }}</span>
                            </v-avatar>
                        </template>
                        <v-list>
                            <v-list-item>
                                <v-list-item-title>Ver foto</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="fotoDialog = true">
                                <v-list-item-title>Subir foto</v-list-item-title>
                            </v-list-item>
                            <v-list-item>
                                <v-list-item-title>Eliminar foto</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-dialog v-model="fotoDialog" persistent no-click-animation width="500">
                <v-card>
                    <v-card-title class="primary pa-0 white--text">
                        <v-btn dark @click="fotoDialog = false" icon>
                            <v-icon size="medium">fas fa-times</v-icon>
                        </v-btn>
                        <div class="hidden-xs-only">Arrastra la imagen para ajustar</div>
                        <v-spacer></v-spacer>
                        <v-btn dark @click="foto.chooseFile()" icon>
                            <v-icon size="medium">fas fa-image</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text style="padding: 50px;">
                        <v-layout row column align-end justify-center class="foto-buttons">
                            <v-btn
                                @click="foto.zoomIn()"
                                fab
                                small
                                dark
                                color="primary"
                                class="my-1"
                            >
                                <v-icon size="medium">fas fa-plus</v-icon>
                            </v-btn>
                            <v-btn
                                @click="foto.zoomOut()"
                                fab
                                small
                                dark
                                color="primary"
                                class="my-1"
                            >
                                <v-icon size="medium">fas fa-minus</v-icon>
                            </v-btn>
                        </v-layout>
                        <v-layout justify-center>
                            <croppa
                                v-model="foto"
                                :width="300"
                                :height="300"
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
                        </v-layout>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            @click="uploadFoto()"
                            :disabled="inProcess"
                            :loading="inProcess"
                            large
                            fab
                            right
                            dark
                            color="primary mb-5"
                            style="margin-top: -45px;"
                        >
                            <v-icon>fas fa-check</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
        <!-- Ver y editar datos -->
        <v-layout justify-center wrap>
            <v-flex xs12 px-3 mt-5>
                <v-form ref="editForm">
                    <v-list dense>
                        <v-subheader class="ml-2 primary--text">Tu nombre</v-subheader>
                        <v-list-item v-if="!editName">
                            <v-list-item-content>
                                <v-list-item-title>{{ account.user.name }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon @click="editName = true;" style="cursor: pointer;">
                                <v-icon size="medium">fas fa-pen</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item v-else style="margin-top: -15px;">
                            <v-list-item-content>
                                <v-text-field
                                    v-model="form.name"
                                    :rules="[rules.required]"
                                    clearable
                                    clear-icon="fas fa-times"
                                    append-icon="fas fa-check"
                                    @click:append="edit()"
                                    single-line
                                ></v-text-field>
                            </v-list-item-content>
                        </v-list-item>
                        <v-subheader class="ml-2 primary--text">Tu email</v-subheader>
                        <v-list-item v-if="!editEmail">
                            <v-list-item-content>
                                <v-list-item-title>{{ account.user.email }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon @click="editEmail = true;" style="cursor: pointer;">
                                <v-icon size="medium">fas fa-pen</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item v-else style="margin-top: -15px;">
                            <v-list-item-content>
                                <v-text-field
                                    v-model="form.email"
                                    :rules="[rules.required]"
                                    clearable
                                    clear-icon="fas fa-times"
                                    append-icon="fas fa-check"
                                    @click:append="edit()"
                                    single-line
                                ></v-text-field>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-form>
            </v-flex>
            <!-- Editar Contraseña -->
            <v-flex mt-5>
                <v-layout justify-center>
                    <v-btn
                        @click="editPassDialog = true"
                        color="primary"
                        outlined
                    >Cambiar contraseña</v-btn>
                </v-layout>
            </v-flex>
            <v-dialog v-model="editPassDialog" persistent no-click-animation width="400">
                <v-card>
                    <v-card-title class="primary pa-0 white--text">
                        <div class="ml-5">Cambiar contraseña</div>
                        <v-spacer></v-spacer>
                        <v-btn dark @click="editPassDialog = false" icon>
                            <v-icon size="medium">fas fa-times</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="passForm">
                            <v-layout justify-center wrap style="margin-top: 40px;">
                                <v-flex xs12 px-3>
                                    <v-text-field
                                        v-model="form.current_password"
                                        label="Contraseña actual"
                                        :rules="[rules.required]"
                                        :append-icon="currentPass ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        :type="currentPass ? 'text' : 'password'"
                                        @click:append="currentPass = !currentPass"
                                        outlined
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 px-3>
                                    <v-text-field
                                        v-model="form.password"
                                        label="Contraseña nueva"
                                        :rules="[rules.required]"
                                        :append-icon="newPass ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        :type="newPass ? 'text' : 'password'"
                                        @click:append="newPass = !newPass"
                                        outlined
                                    ></v-text-field>
                                </v-flex>
                                <v-flex xs12 px-3>
                                    <v-text-field
                                        v-model="form.confirm_password"
                                        label="Confirmar contraseña"
                                        :rules="[rules.required]"
                                        :append-icon="confirmPass ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                        :type="confirmPass ? 'text' : 'password'"
                                        @click:append="confirmPass = !confirmPass"
                                        outlined
                                    ></v-text-field>
                                </v-flex>
                            </v-layout>
                        </v-form>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            :loading="inProcess"
                            :disabled="inProcess"
                            color="primary"
                            text
                            @click="editPass()"
                        >Guardar cambios</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </div>
</template>

<script>
// Vuex
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
    name: "EditAccount",

    data() {
        return {
            foto: {},
            fotoDialog: false,
            editName: false,
            editEmail: false,
            editPassDialog: false,
            currentPass: false,
            newPass: false,
            confirmPass: false,
            rules: {
                required: value => !!value || "Este campo es obligatorio"
            }
        };
    },

    computed: {
        ...mapState("auth", ["inProcess", "form"]),
        ...mapGetters("auth", ["account"])
    },

    mounted() {
        this.setForm();
    },

    methods: {
        ...mapMutations("auth", ["fillForm"]),
        ...mapActions("auth", ["getUser", "updateAccount", "updatePhoto"]),
        ...mapMutations("home", ["setMode"]),

        setForm: async function() {
            let response = await this.getUser();
            await this.fillForm(response.user);
        },

        uploadFoto: async function() {
            if (this.foto.hasImage()) {
                await this.updatePhoto({ foto: this.foto.generateDataUrl() });
                await this.getUser();
                this.fotoDialog = false;
                this.foto.remove();
            }
        },

        edit: async function() {
            if (this.$refs.editForm.validate()) {
                await this.updateAccount();
                await this.getUser();
                this.editName = false;
                this.editEmail = false;
            }
        },

        editPass: async function() {
            if (this.$refs.passForm.validate()) {
                await this.updateAccount();
                await this.getUser();
                this.editPassDialog = false;
            }
        }
    }
};
</script>

<style>
.foto-buttons {
    height: 350px;
    display: block;
    position: absolute;
    right: 30px;
    z-index: 9;
}

.croppa-container {
    width: 300px;
    height: 300px;
    border-radius: 50%;
}

.croppa-container canvas {
    margin-top: 0px;
    border-radius: 50%;
}
</style>