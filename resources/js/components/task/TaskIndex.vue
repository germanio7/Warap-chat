<template>
  <div>

    <v-layout justify-center wrap>
      <v-flex xs10 sm5 lg3 v-for="task in data" :key="task.id" ma-2>
        <v-card height="250" style="overflow: auto;">
          <v-card-title>
            <v-layout space-around>
              <v-flex xs6 mt-2>
                <h2>{{ task.task }}</h2>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <div>
                    <v-btn flat icon @click="task_id = task.id; updateTask()" :color="task.state ? 'success' : 'warning'">
                      <div v-if="task.state">
                        <v-icon size="medium">fas fa-check</v-icon>
                      </div>
                      <div v-else>
                        <v-icon size="medium">fas fa-clock</v-icon>
                      </div>
                    </v-btn>
                  </div>
                  <v-btn flat icon color="error" @click="dialog = true; task_id = task.id">
                    <v-icon size="medium">fas fa-trash</v-icon>
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            {{ task.description }}
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-text>
          <h2>Are you sure?</h2>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <p>Are you sure you want to delete this task?</p>
          <br>
          <v-layout justify-end wrap>
            <v-btn @click="dialog = false; task_id = null" outline color="success">NO! Cancel</v-btn>
            <v-btn @click="dialog = false; deleteTask()" color="error">YES! Delete</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>

import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('accsess_token');

import { mapState, mapActions } from 'vuex'

export default {

  name: 'TaskIndex',

  data() {
    return {
      dialog: false,
      tasks: [],
      task_id: null
    }
  },

  computed: {
    ...mapState( 'crudx', [
      'inProcess',
      'data'
    ])
  },

  mounted() {
    this.index({ url: 'api/task/index'});
  },

  methods: {
    ...mapActions( 'crudx', [
      'index',
      'destroy'
    ]),

    deleteTask() {
      this.destroy({ url: 'api/task/delete/'+this.task_id, reload: 'api/task/index' });
    },

    updateTask() {
      axios.put('api/task/edit/'+this.task_id).then(response => {
        this.index({ url: 'api/task/index' });
      }).catch(error => {
        console.log(error.response.data);
      })
    }
  }

}

</script>