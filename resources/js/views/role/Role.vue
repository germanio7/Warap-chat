<template>
  <div>
    <v-btn dark fab fixed right bottom @click="dialog = !dialog" color="secondary">
      <v-icon>fas fa-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-text>
          <h2>New Role</h2>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="roleForm" @submit.prevent="saveRole">
            <RoleForm></RoleForm>
            <br>
            <v-layout justify-end>
              <v-btn @click="dialog = false" outline color="error">Cancel</v-btn>
              <v-btn type="submit" color="secondary">Save</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <RoleIndex></RoleIndex>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

import RoleIndex from '../../components/role/RoleIndex.vue'
import RoleForm from '../../components/role/RoleForm.vue'

export default {
  
  name: 'Role',

  data() {
    return {
      dialog: false,
    }
  },

  components: {
    RoleIndex,
    RoleForm
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

    saveRole() {
      if(this.$refs.roleForm.validate()) {
        let permission = '';
        for (let i = 0; i < this.form.scope.length; i++) {
          permission = permission+this.form.scope[i]+' ';
        }
        this.form.permission = permission;
        this.save({ url: 'api/role/save', reload: 'api/role/index' });
        this.dialog = false;
      }
    }
  }

}

</script>
