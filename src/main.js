// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import AlertCmp from './components/Shared/Alert.vue'

Vue.use(Vuetify)
import('../node_modules/vuetify/dist/vuetify.min.css') // Ensure you are using css-loader

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAyW_ms7jv3cjxvqdhcyCakSAN7o_Jk5qA',
      authDomain: 'memer-b4dfa.firebaseapp.com',
      databaseURL: 'https://memer-b4dfa.firebaseio.com',
      projectId: 'memer-b4dfa',
      storageBucket: '',
      messagingSenderId: '692484678964'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
