import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

//Store pattern made with vuex

//It serves as the unique source of truth for the application, to make easier to communicate information to other components
//

export default new Vuex.Store({
    state: {
        currentLessonId: 1,
        otherLessonsIDs: [],
        treeViewItems: [],
    },
    getters: {
        currentLessonId: state => {
            return state.currentLessonId
        },
        otherLessonsIDs: state => {
            return state.otherLessonsIDs
        },
        treeViewItems: state => {
            return state.treeViewItems;
        },
    },
    mutations: {
        updateCurrentLessonId(state, id) {
            Vue.set(state, 'currentLessonId', id)
        },
        setOtherLessonsIDs(state, lessons) {
            Vue.set(state, 'otherLessonsIDs', lessons)
        },
        updateTreeViewItems(state, treeViewItems) {
            Vue.set(state, 'treeViewItems', treeViewItems)
        }
    },
    actions: {}
});
