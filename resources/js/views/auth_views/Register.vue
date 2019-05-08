<template>
  <div>
    <br><br>
    <v-layout justify-center>

      <!-- Login/register card -->
      <v-card width="750">
        <v-card-text style="padding: 0;">
          <v-layout wrap align-center>

            <!-- img dialog -->
            <v-flex xs12 sm6 class="hidden-xs-only">
              <v-img height="400px" src="./images/vue_background.jpg"></v-img>
            </v-flex>

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

            <!-- Register Form -->
            <v-flex xs12 sm6 pa-3 v-show="!inProcess">
              <v-form ref="register_form" @submit.prevent="registerValidate()">
                <RegisterForm></RegisterForm>
                <v-layout justify-center wrap>
                  <v-btn to="/login" outline color="secondary">Log In</v-btn>
                  <v-btn type="" class="elevation-0" color="secondary">Sign Up</v-btn>
                </v-layout>
              </v-form>
            </v-flex>

          </v-layout>
        </v-card-text>
      </v-card>

    </v-layout>

  </div>
</template>

<script>

  import RegisterForm from '../../components/auth_components/RegisterForm.vue'

  import { mapState, mapActions } from 'vuex'

  export default {

    name: 'Register.vue',

    components: {
        RegisterForm
    },

    computed: {
        ...mapState([
            'form',
            'inProcess'
        ]),
    },

    methods: {

        ...mapActions([
            'register'
        ]),

        registerValidate() {
          if(this.$refs.register_form.validate()) {
            this.register();
          }
        }

    }

  }

</script>