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
                    <v-btn flat icon color="success">
                      <v-icon size="medium">fas fa-pen</v-icon>
                    </v-btn>
                    <v-btn flat icon color="error">
                      <v-icon size="medium">fas fa-trash</v-icon>
                    </v-btn>
                  </v-layout>
                  <br><br><br>
                  <v-layout justify-center wrap>
                    <v-flex xs12>
                      <v-layout justify-center>
                        <v-avatar size="85">
                          <img src="https://i.pravatar.cc/300" alt="avatar">
                        </v-avatar>
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
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex';

  export default {
      
    name: 'User',

    computed: {
      ...mapState( 'auth', [
        'user'
      ])
    },

    mounted() {
      this.getUser();
    },

    methods: {
      ...mapActions( 'auth', [
        'getUser'
      ])
    }

  }

</script>
