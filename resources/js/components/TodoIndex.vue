<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <template>
          <v-data-table
            :items="todos"
            class="elevation-0"
            hide-actions
            hide-headers
          >
            <template v-slot:items="todo">
              <td>{{ todo.item.description }}</td>
              <td>
                <div v-if="!todo.item.state">
                  <v-btn flat icon @click="edit()">
                    <v-icon color="error" size="medium">fas fa-exclamation-circle</v-icon>
                  </v-btn>
                </div>
                <div v-else>
                  <v-btn flat icon @click="edit()">
                    <v-icon color="success" size="medium">fas fa-check</v-icon>
                  </v-btn>
                </div>
              </td>
              <td>
                <v-btn flat icon @click="trash()">
                  <v-icon color="error" size="medium">fas fa-trash</v-icon>
                </v-btn>
              </td>
            </template>
          </v-data-table>
        </template>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>

  import axios from 'axios'

  import { mapState, mapActions } from 'vuex'

  export default {
    
    
    name: 'TodoIndex',

    data () {
      return {
        todos: []
      }
    },

    computed: {
      ...mapState( 'auth', [
          'token'
      ]),
    },

    mounted() {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.token;
      this.index();
    },

    methods: {

      index() {
        axios.get('api/todo/index').then(response => {
          this.todos = response.data
        }).catch(error => {
          console.log(error.response.data);
        });
      },

      edit() {
        axios.post('api/todo/edit').then(response => {
          console.log(response.data);
        }).catch(error => {
          console.log(error.response.data);
        })
      },

      trash() {
        axios.post('api/todo/delete').then(response => {
          console.log(response.data);
        }).catch(error => {
          console.log(error.response.data);
        })
      }
    }

  }

</script>
