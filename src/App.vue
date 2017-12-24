<template>
  <v-app id="inspire" dark>
    <!-- Header -->
    <v-toolbar app fixed clipped-left class="blue accent-4">
      <!-- Toggle sidebar button -->
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <!-- Title -->
      <v-toolbar-title class="orange--text accent-4">memeR</v-toolbar-title>
      
    </v-toolbar>

    <!-- Left side draw -->
    <v-navigation-drawer
      clipped
      fixed
      v-model="drawer"
      app
      disable-route-watcher
    >
      <v-list dense>
        <v-list-tile
          exact
          active-class="orange--text"
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    
    <!-- Main content -->
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <router-view></router-view>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer app fixed class="blue darken-4">
      <span class="orange--text">&copy; {{(new Date()).getFullYear()}} memeR Inc.</span>
      <v-spacer></v-spacer>
      <span class="orange--text">{{$store.getters.getTotalMemes}}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'search', title: 'Browse', link: '/'},
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>
