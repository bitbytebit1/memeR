<template>
  <!-- Footer -->
  <v-footer
    app
    fixed
    padless
    class="blue darken-4"
  >
    <span class="orange--text">&copy; {{ (new Date()).getFullYear() }} memeR Inc.</span>
    <v-spacer />
    <span class="orange--text">{{ $store.getters.getTotalMemes }}</span>
  </v-footer>
</template>
