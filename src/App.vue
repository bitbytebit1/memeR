<template>
  <v-app
    id="inspire"
    dark
  >
    <!-- NAVBAR -->
    <NavBar />

    <!-- ROUTER -->
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
    <!-- FOOTER -->
    <!-- <Footer /> -->
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar/NavBar.vue'
// import Footer from '@/components/Footer/Footer.vue'
export default {
  components: {
    NavBar
    // Footer
  },
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
<style>
html { overflow-y: auto }
</style>
