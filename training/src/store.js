import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        title: 'Awesome title',
        currentLessonId: 1,
        previousLessonId: 0,
        nextLessonId: 0,
    },
    getters: {
        currentLessonId: state => {
            return state.currentLessonId
        },
    },
    mutations: {
        updateCurrentLessonId(state, id) {
            Vue.set(state, 'currentLessonId', id)
        },
    },
    actions: {

    }
});
