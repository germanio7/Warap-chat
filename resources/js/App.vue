<template>
  <v-app style="background-color: #34495E;">

    <!-- Toolbar | Navbar -->
    <v-toolbar color="primary" dark class="elevation-0">
      <v-toolbar-title>
        <v-avatar size="40" :tile="true">
          <img src="images/logo.png">
        </v-avatar>
        Laravel Passport Vue
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn to="/task" v-show="token !== null" flat>Task</v-btn>
        <v-btn to="/role" v-show="token !== null" flat>Role</v-btn>
        <v-btn @click="logout()" flat icon v-show="token !== null">
          <v-icon>fas fa-sign-out-alt</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-divider dark></v-divider>

    <br>

    <v-content>
      <router-view/>  
    </v-content>

  </v-app>
</template>

<script>

  import { mapState, mapActions } from 'vuex'

  export default {

    name: 'App',

    computed: {
      ...mapState( 'auth', [
        'token'
      ])
    },

    methods: {
      ...mapActions( 'auth', [
        'logout'
      ])
    }

  }

</script>
