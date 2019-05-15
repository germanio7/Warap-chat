<template>
  <div>
    <v-btn dark fab fixed right bottom @click="dialog = !dialog" color="secondary">
      <v-icon>fas fa-plus</v-icon>
    </v-btn>

    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-text>
          <h2>New Task</h2>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-form ref="taskForm" @submit.prevent="saveTask">
            <TaskForm></TaskForm>
            <v-layout justify-center>
              <v-btn type="submit" color="secondary">Save</v-btn>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <TaskIndex></TaskIndex>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

import TaskIndex from '../../components/task/TaskIndex.vue'
import TaskForm from '../../components/task/TaskForm.vue'

export default {

  name: 'Task',

  data() {
    return {
      dialog: false,
    }
  },

  components: {
    TaskIndex,
    TaskForm
  },

  methods: {
    ...mapActions( 'crudx', [
      'save'
    ]),

    saveTask() {
      if(this.$refs.taskForm.validate()) {
        this.save({ url: 'api/task/save', reload: 'api/task/index' });
        this.dialog = false;
      }
    }
  }
  
}

</script>
