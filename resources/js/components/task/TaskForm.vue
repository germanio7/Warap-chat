<template>
  <div>
    <v-layout wrap justify-center>
      <v-flex xs10>
        <v-text-field
          v-model="form.task"
          :rules="[rules.required]"
          label="Task"
          hint="Task"
          color="secondary"
          outline
          single-line
        ></v-text-field>
      </v-flex>
      <v-flex xs10>
        <v-textarea
          v-model="form.description"
          :rules="[rules.required]"
          label="Description"
          hint="Description"
          color="secondary"
          outline
          single-line
        ></v-textarea>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {

  name: 'TaskForm',

  data() {
    return {
      rules: {
        required: value => !! value || 'Este campo es obligatorio',
      },
    }
  },

  computed: {
    ...mapState( 'crudx', [
      'form'
    ])
  },

}

</script>
