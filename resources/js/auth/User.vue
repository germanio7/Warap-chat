<template>
  <div>
    <br>
    <v-layout justify-center>
      <v-flex xs10 lg8>
        <v-layout justify-center>

          <!-- Login/register card -->
          <v-card width="750">
            <v-card-text style="padding: 0;">
              <v-layout wrap>

                <!-- User View -->
                <v-flex xs12 sm6 pa-2>
                  <v-layout justify-end>
                    <v-btn flat icon color="success" @click="editUser(); editDialog = true">
                      <v-icon size="medium">fas fa-pen</v-icon>
                    </v-btn>
                    <v-btn flat icon color="error" @click="deleteDialog = true">
                      <v-icon size="medium">fas fa-trash</v-icon>
                    </v-btn>
                  </v-layout>
                  <br><br><br>
                  <v-layout justify-center wrap>
                    <v-flex xs12>
                      <v-layout justify-center>
                        <div class="profile">
                          <div class="profile-text">
                            {{ profile }}
                          </div>
                        </div>
                      </v-layout>
                    </v-flex>
                    <v-flex xs12>
                      <br>
                      <h1 class="text-xs-center primary--text">{{ user.name }}</h1>
                    </v-flex>
                    <v-flex xs12>
                      <h3 class="text-xs-center primary--text">{{ user.email }}</h3>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <!-- img dialog -->
                <v-flex xs12 sm6 class="hidden-xs-only">
                  <v-img height="400px" src="./images/vue_background.jpg"></v-img>
                </v-flex>

              </v-layout>
            </v-card-text>
          </v-card>

          <v-dialog v-model="editDialog" width="500" persistent>
            <v-card>
              <v-form ref="edit_form" @submit.prevent="edit()">
                <v-card-text>
                  <h2>Edit User</h2>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                  <EditUser></EditUser>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-text>
                  <v-layout justify-end wrap>
                    <v-btn @click="editDialog = false;" outline color="error">Cancel</v-btn>
                    <v-btn type="submit" color="success">Update</v-btn>
                  </v-layout>
                </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>

          <v-dialog v-model="deleteDialog" width="500" persistent>
            <v-card>
              <v-card-title>
                <h2>are you sure?</h2>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text>
                Are you sure you want to delete your account? this change is irreversible
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>
                  <v-layout justify-end wrap>
                    <v-btn @click="deleteDialog = false;" outline color="success">Cancel</v-btn>
                    <v-btn @click="deleteUser()" color="error">Delete</v-btn>
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

  import EditUser from './EditUser.vue'
  import { mapState, mapActions } from 'vuex';

  export default {
      
    name: 'User',

    data() {
      return {
        editDialog: false,
        deleteDialog: false
      }
    },

    components: {
      EditUser
    },

    computed: {
      ...mapState( 'auth', [
        'user',
        'profile'
      ])
    },

    mounted() {
      this.getUser();
    },

    methods: {
      ...mapActions( 'auth', [
        'getUser',
        'editUser',
        'updateUser',
        'deleteUser'
      ]),

      edit: function() {
        if(this.$refs.edit_form.validate()) {
          this.updateUser();
          this.editDialog = false;
        }
      }
    }

  }

</script>

<style scoped>

.profile {
  width: 86px;
  height: 86px;
  border: solid 2px #41B883;
  border-radius: 50%;
  background-color: rgba(65, 184, 131, .25);
}

.profile .profile-text {
  color: #41B883;
  text-align: center;
  font-size: 40px;
  line-height: 86px;
}

</style>