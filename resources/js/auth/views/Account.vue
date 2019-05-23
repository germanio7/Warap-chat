<template>
    <div>
        <br>
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
                                        <v-btn
                                            flat
                                            icon
                                            color="success"
                                            @click="editAccount(); editDialog = true"
                                        >
                                            <v-icon size="medium">fas fa-pen</v-icon>
                                        </v-btn>
                                        <v-btn flat icon color="error" @click="deleteDialog = true">
                                            <v-icon size="medium">fas fa-trash</v-icon>
                                        </v-btn>
                                    </v-layout>
                                    <br>
                                    <br>
                                    <v-layout justify-center wrap>
                                        <v-flex xs12>
                                            <v-layout justify-center>
                                                <div class="profile">
                                                    <div class="profile-text">{{ profile }}</div>
                                                </div>
                                            </v-layout>
                                        </v-flex>
                                        <v-flex xs12>
                                            <br>
                                            <h1 class="text-xs-center primary--text">{{ user.name }}</h1>
                                        </v-flex>
                                        <v-flex xs12>
                                            <h3
                                                class="text-xs-center primary--text"
                                            >{{ user.email }}</h3>
                                        </v-flex>
                                    </v-layout>
                                </v-flex>
                            </v-layout>
                        </v-card-text>
                    </v-card>
                    <!-- Edit Account Dialog -->
                    <v-dialog v-model="editDialog" width="400" persistent>
                        <v-card>
                            <v-form ref="edit_form" @submit.prevent="edit()">
                                <v-card-text>
                                    <h2>Edit User</h2>
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
                                            outline
                                            color="error"
                                        >Cancel</v-btn>
                                        <v-btn
                                            type="submit"
                                            color="success"
                                            class="elevation-0"
                                        >Update</v-btn>
                                    </v-layout>
                                </v-card-text>
                            </v-form>
                        </v-card>
                    </v-dialog>
                    <!-- Delete Account Dialog -->
                    <v-dialog v-model="deleteDialog" width="400" persistent>
                        <v-card>
                            <v-card-title>
                                <h2>are you sure?</h2>
                            </v-card-title>
                            <v-divider></v-divider>
                            <v-card-text>Are you sure you want to delete your account? this change is irreversible</v-card-text>
                            <v-divider></v-divider>
                            <v-card-text>
                                <v-layout justify-end wrap>
                                    <v-btn
                                        @click="deleteDialog = false;"
                                        outline
                                        color="success"
                                    >Cancel</v-btn>
                                    <v-btn @click="erase()" color="error">Delete</v-btn>
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
import { mapState, mapActions } from "vuex";
import { async } from "q";

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
        ...mapState("auth", ["user", "profile"])
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

<style scoped>
.profile {
    width: 86px;
    height: 86px;
    border: solid 2px #41b883;
    border-radius: 50%;
    background-color: rgba(65, 184, 131, 0.25);
}

.profile .profile-text {
    color: #41b883;
    text-align: center;
    font-size: 40px;
    line-height: 80px;
}
</style>