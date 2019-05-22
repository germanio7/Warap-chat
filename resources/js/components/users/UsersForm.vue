<template>
  <div>
    <v-layout justify-center wrap>
      <v-flex xs10>
        <v-text-field
          v-model="form.name"
          :rules="[rules.required]"
          label="Name"
          hint="Name"
          color="secondary"
          outline
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          v-model="form.email"
          :rules="[rules.required]"
          label="Email"
          hint="Email"
          color="secondary"
          outline
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          v-model="form.password"
          :rules="[rules.required]"
          :append-icon="password ? 'fas fa-eye' : 'fas fa-eye-slash'"
          @click:append="password = !password"
          :type="password ? 'text' : 'password'"
          label="Password"
          hint="Password"
          color="secondary"
          outline
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex xs10>
        <v-text-field
          v-model="form.password_confirm"
          :rules="[rules.required]"
          :append-icon="confirm_password ? 'fas fa-eye' : 'fas fa-eye-slash'"
          @click:append="confirm_password = !confirm_password"
          :type="confirm_password ? 'text' : 'password'"
          label="Confirm Password"
          hint="Confirm Password"
          color="secondary"
          outline
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex xs10>
        <v-select
            v-model="form.role_id"
            :items="showData"
            item-text="role"
            item-value="id"
            label="Role"
            color="secondary"
            outline
            single-line
          ></v-select>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  
  name: 'UsersForm',

  data() {
    return {
      selected: '',
      password: false,
      confirm_password: false,
      rules: {
        required: value => !! value || 'Este campo es obligatorio',
      },
    }
  },

  computed: {
    ...mapState( 'crudx', [
      'form',
      'showData'
    ])
  },

  mounted() {
    this.show({ url: 'api/role/index' });
  },

  methods: {
    ...mapActions( 'crudx', [
      'show'
    ]),
  }

}

</script>
