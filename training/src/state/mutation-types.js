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
export const SET_LESSON = 'SET_LESSON'
export const SET_LESSON_IMAGES = 'SET_LESSON_IMAGES'
export const UNSET_LESSON = 'UNSET_LESSON'
export const SET_TREE = 'SET_TREE'
export const SET_DRAWER_STATE = 'SET_DRAWER_STATE'
export const SET_LIGHT_BOX_IMAGE = 'SET_LIGHT_BOX_IMAGE'
export const SET_LIGHT_BOX_VISIBILITY = 'SET_LIGHT_BOX_VISIBILITY'
