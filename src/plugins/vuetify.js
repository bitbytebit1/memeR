import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

Vue.use(Vuetify, {
  directives: {
    Touch
  }
})
export default new Vuetify({
  icons: {
    iconfont: 'md'
  }
})
