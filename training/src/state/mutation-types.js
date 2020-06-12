/*
It is a commonly seen pattern to use constants for mutation types in various Flux implementations.
This allows the code to take advantage of tooling like linters, and putting all constants in a single file allows
your collaborators to get an at-a-glance view of what mutations are possible in the entire application:

// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // we can use the ES2015 computed property name feature
    // to use a constant as the function name
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})

*/
