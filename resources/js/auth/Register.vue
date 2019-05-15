<template>
  <div>
    <br><br>
    <v-layout justify-center>
      <v-flex xs10 lg8>
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
                    <v-layout wrap justify-center>
                        <v-flex xs11>
                            <error tag="name"></error>
                            <v-text-field
                                v-model="form.name"
                                :rules="[rules.required, rules.max]"
                                label="Name"
                                outline
                                single-line
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs11>
                            <error tag="email"></error>
                            <v-text-field
                                v-model="form.email"
                                :rules="[rules.required, rules.max]"
                                label="Email"
                                outline
                                single-line
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs11>
                            <error tag="password"></error>
                            <v-text-field
                                v-model="form.password"
                                :rules="[rules.required, rules.max, rules.min]"
                                :append-icon="password_type ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                @click:append="password_type = !password_type"
                                :type="password_type ? 'text' : 'password'"
                                label="Password"
                                outline
                                single-line
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
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
      </v-flex>  
    </v-layout>

  </div>
</template>

<script>

  import error from '../crudx/error.vue'

  import { mapState, mapActions } from 'vuex'

  export default {

    name: 'Register.vue',

    data() {
        return {
            password_type: false,
            rules: {
                required: value => !!value || 'Este campo es obligatorio',
                max: value => (value && value.length <= 255) || 'Este campo no puede contener mas de 255 digitos',
                min: value => (value && value.length >= 6) || 'Este campo debe contener al menos 6 digitos',
            },
        }
    },

    components: {
        error
    },

    computed: {
        ...mapState( 'auth', [
            'form',
            'inProcess'
        ]),
    },

    methods: {

        ...mapActions( 'auth', [
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