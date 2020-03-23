import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import memes from './memes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user: user,
    memes: memes,
    shared: shared
  }
})
