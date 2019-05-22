<template>
  <div>
    <v-container>
      <v-layout justify-center>
        <v-flex xs12>
          <template>
            <v-data-table
              hide-actions
              :headers="headers"
              :items="data"
            >
              <template v-slot:items="user">
                <td>{{ user.item.name }}</td>
                <td>{{ user.item.email }}</td>
                <td>
                  <v-btn flat icon color="success" @click="edit({ data: user.item }); dialog = true;">
                    <v-icon size="medium">fas fa-pen</v-icon>
                  </v-btn>
                  <v-btn flat icon color="error">
                    <v-icon size="medium">fas fa-trash</v-icon>
                  </v-btn>
                </td>
              </template>
            </v-data-table>
          </template>
        </v-flex>
      </v-layout>

      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-card-text>
            <h2>Edit User</h2>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="userForm" @submit.prevent="updateUser()">
              <UsersForm></UsersForm>
              <br>
              <v-layout justify-end>
                <v-btn @click="dialog = false" outline color="error">Cancel</v-btn>
                <v-btn type="submit" color="secondary">update</v-btn>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>

    </v-container>
  </div>
</template>

<script>

import UsersForm from './UsersForm.vue'
import { mapState, mapActions } from 'vuex'

export default {

  name: 'UserIndex',

  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Name', sortable: false },
        { text: 'Email', sortable: false },
        { text: '', sortable: false },
      ],
    }
  },

  components: {
    UsersForm
  },

  computed: {
    ...mapState( 'crudx', [
      'data',
      'form'
    ]),
  },

  mounted() {
    this.index({ url: 'api/users/index' });
  },

  methods: {
    ...mapActions( 'crudx', [
      'index',
      'edit',
      'update'
    ]),


    updateUser: function() {
      if(this.$refs.userForm.validate()) {
          this.update({ url: 'api/users/edit/'+this.form.id, reload: 'api/users/index' });
          this.dialog = false;
      }
    }

  }

}

</script>