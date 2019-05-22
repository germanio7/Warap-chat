<template>
  <div>
    <v-btn dark fab fixed right bottom @click="dialog = !dialog" color="secondary">
      <v-icon>fas fa-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-text>
          <h2>New User</h2>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="usersForm" @submit.prevent="saveUser">
            <UsersForm></UsersForm>
            <br>
            <v-layout justify-end>
              <v-btn @click="dialog = false" outline color="error">Cancel</v-btn>
              <v-btn type="submit" color="secondary">Save</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <UsersIndex></UsersIndex>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import UsersIndex from '../../components/users/UsersIndex.vue'
import UsersForm from '../../components/users/UsersForm.vue'

export default {
  
  name: 'Users',

  data() {
    return {
      dialog: false,
    }
  },

  components: {
    UsersIndex,
    UsersForm
  },

  computed: {
    ...mapState( 'crudx', [
      'form'
    ])
  },

  methods: {
    ...mapActions( 'crudx', [
      'save'
    ]),

    saveUser() {
      if(this.$refs.usersForm.validate()) {
        this.save({ url: 'api/users/save', reload: 'api/users/index' });
        this.dialog = false;
      }
    }
  }

}

</script>

