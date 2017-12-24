<template>
  <v-container>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-jumbotron primary-title>
          <div class="text-md-center">
            <h2 class="headline ma-0">Stuff</h2>
            <h4 class="headline ma-0"></h4>
          </div>
        </v-jumbotron>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.user
      }
    }
  }
</script>
