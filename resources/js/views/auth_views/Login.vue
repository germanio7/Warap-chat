<template>
  <div>
    <br><br>
    <v-layout justify-center>

      <!-- Login/register card -->
      <v-card width="750">
        <v-card-text style="padding: 0;">
          <v-layout wrap align-center>

            <!-- Login Progress -->
            <v-flex xs12 sm6 pa-3 v-show="inProcess">
              <v-layout justify-center>
                <v-progress-circular
                  :size="70"
                  :width="7"
                  color="secondary"
                  indeterminate
                ></v-progress-circular>
              </v-layout>
            </v-flex>

            <!-- Login Form -->
            <v-flex xs12 sm6 pa-3 v-show="!inProcess">

              <v-alert style="width: 92%;" :value="errors ? true : false" color="error">
                <div v-if="errors">
                  {{ errors.error_description }}
                </div>
              </v-alert>
              
              <br>
              <v-form ref="login_form" @submit.prevent="loginValidate()">
                <LoginForm></LoginForm>
                <v-layout justify-center wrap>
                  <v-btn to="/register" outline color="secondary">Sign Up</v-btn>
                  <v-btn type="" class="elevation-0" color="secondary">Log In</v-btn>
                </v-layout>
              </v-form>
            </v-flex>

            <!-- img dialog -->
            <v-flex xs12 sm6 class="hidden-xs-only">
              <v-img height="400px" src="./images/vue_background.jpg"></v-img>
            </v-flex>

          </v-layout>
        </v-card-text>
      </v-card>

    </v-layout>

  </div>
</template>

<script>

  import LoginForm from '../../components/auth_components/LoginForm.vue'

  import { mapState, mapActions } from 'vuex'

  export default {

    name: 'Login',

    components: {
        LoginForm
    },

    computed: {
        ...mapState([
            'form',
            'inProcess',
            'errors'
        ]),
    },


    methods: {

        ...mapActions([
            'login'
        ]),

        loginValidate() {
            if(this.$refs.login_form.validate()) {
                this.login();
            }
        },

    }

  }

</script>