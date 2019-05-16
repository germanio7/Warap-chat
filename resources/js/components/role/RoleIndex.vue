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
              <template v-slot:items="rol">
                <td>{{ rol.item.role }}</td>
                <td>{{ rol.item.permission }}</td>
                <td>
                  <v-btn flat icon color="success" @click="edit({ data: rol.item }); dialog = true;">
                    <v-icon size="medium">fas fa-pen</v-icon>
                  </v-btn>
                  <v-btn flat icon color="error" @click="destroy({ url: 'api/role/delete/'+rol.item.id, reload: 'api/role/index' })">
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
            <h2>New Role</h2>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
            <v-form ref="roleForm" @submit.prevent="updateRole()">
              <RoleForm></RoleForm>
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

import RoleForm from './RoleForm.vue'
import { mapState, mapActions } from 'vuex'

export default {

  name: 'RoleIndex',

  data() {
    return {
      dialog: false,
      headers: [
        { text: 'Rol', sortable: false },
        { text: 'Permission', sortable: false },
        { text: '', sortable: false },
      ],
    }
  },

  components: {
    RoleForm
  },

  updated() {
    if(this.form.permission) {
      if(typeof(this.form.permission == 'string')) {
        this.form.scope = this.form.permission.split([' ']);
      }
    }
  },

  computed: {
    ...mapState( 'crudx', [
      'data',
      'form'
    ]),
  },

  mounted() {
    this.index({ url: 'api/role/index' });
  },

  methods: {
    ...mapActions( 'crudx', [
      'index',
      'edit',
      'update',
      'destroy'
    ]),

    updateRole: function() {
      if(this.$refs.roleForm.validate()) {
        let permission = '';
          for (let i = 0; i < this.form.scope.length; i++) {
            permission = permission+this.form.scope[i]+' ';
          }
          this.form.permission = permission;
          this.update({ url: 'api/role/edit/'+this.form.id, reload: 'api/role/index' });
          this.dialog = false;
      }
    }
  },

}

</script>