import { createStore } from 'vuex'
import auth from './auth'
import registration from './registration'

export default createStore({
  modules: {
    auth,
    registration
  }
})
