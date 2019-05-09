<template>
  <div>
    <v-card>
      <v-card-text style="padding: 0;">
        <v-layout wrap align-center>

          <!-- ToDo Progress -->
          <v-flex xs12 pa-3 v-show="inProcess">
            <v-layout justify-center>
              <v-progress-circular
                :size="70"
                :width="7"
                color="secondary"
                indeterminate
              ></v-progress-circular>
            </v-layout>
          </v-flex>

          <!-- ToDo List -->
          <v-flex xs12 pa-3 v-show="!inProcess">
            <v-layout justify-center>
              <TodoIndex></TodoIndex>
            </v-layout>
          </v-flex>

        </v-layout>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  import TodoIndex from '../components/TodoIndex'

  export default {

    name: 'ToDo',

    components: {
      TodoIndex
    },

    computed: {
      ...mapState( 'crudx', [
          'inProcess'
      ]),
    },

  }

</script>
