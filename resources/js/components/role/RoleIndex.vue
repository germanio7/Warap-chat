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
                  <v-btn flat icon color="success">
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
    </v-container>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {

  name: 'RoleIndex',

  data() {
    return {
      headers: [
        { text: 'Rol', sortable: false },
        { text: 'Permission', sortable: false },
        { text: '', sortable: false },
      ],
    }
  },

  computed: {
    ...mapState( 'crudx', [
      'data'
    ])
  },

  mounted() {
    this.index({ url: 'api/role/index' });
  },

  methods: {
    ...mapActions( 'crudx', [
      'index'
    ]),
  }

}

</script>