<template>
  <div>
    <v-layout justify-center wrap>
      <v-flex xs10>
        <v-text-field
          v-model="form.role"
          :rules="[rules.required]"
          label="Role"
          hint="Role"
          color="secondary"
          outline
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex xs10>
        <template>
          <v-data-table
            v-model="form.scope"
            :headers="headers"
            :items="showData"
            hide-actions
            select-all
            item-key="id"
          >
            <template v-slot:items="props">
              <tr :active="props.selected" @click="props.selected = !props.selected">
                <td>
                  <v-checkbox
                    :input-value="props.selected"
                    primary
                    hide-details
                  ></v-checkbox>
                </td>
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.description }}</td>
              </tr>
            </template>
          </v-data-table>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
  
  name: 'RoleForm',

  data() {
    return {
      selected: [],
      
      headers: [
        { text: 'Permission', sortable: false },
        { text: 'Description', sortable: false },
      ],
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
    this.show({ url: 'api/role/show' });
  },

  methods: {
    ...mapActions( 'crudx', [
      'show'
    ]),

    toggleAll () {
      if (this.selected.length) this.selected = []
      else this.selected = this.desserts.slice()
    },
  }

}

</script>
