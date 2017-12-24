export default {
  state: {
    totalMemes: null
  },
  mutations: {
    setTotalMemes (state, payload) {
      state.totalMemes = payload
    }
  },
  getters: {
    getTotalMemes (state) {
      if (state.totalMemes) {
        return 'Total Dankage: ' + state.totalMemes
      } else {
        return null
      }
    }
  }
}
