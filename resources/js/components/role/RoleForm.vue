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
        <v-select
            v-model="form.scope"
            :items="showData"
            item-text="id"
            item-value="id"
            label="Permission"
            color="secondary"
            multiple
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
