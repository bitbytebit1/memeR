<template>
  <v-app
    id="inspire"
    dark
  >
    <NavBar />
    <!-- Main content -->
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          justify-center
          align-center
        >
          <router-view />
        </v-layout>
      </v-container>
    </v-content>

    <!-- Footer -->
    <v-footer
      app
      fixed
      class="blue darken-4"
    >
      <span class="orange--text">&copy; {{ (new Date()).getFullYear() }} memeR Inc.</span>
      <v-spacer />
      <span class="orange--text">{{ $store.getters.getTotalMemes }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
export default {
  components: {
    NavBar
  },
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
