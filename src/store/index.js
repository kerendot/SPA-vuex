import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import {todoStore} from './todos.store'
import {emailStore} from './emails.store'


export default new Vuex.Store({
  modules: {
    todo: todoStore,
    email: emailStore
  }
})

