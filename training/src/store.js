import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        currentLessonId: 1,
        otherLessonsIDs: [],
        treeViewItems: [],
        sections: [],

    },
    getters: {
        currentLessonId: state => {
            return state.currentLessonId
        },
        otherLessonsIDs: state => {
            return state.otherLessonsIDs
        },
        sections: state => {
            return state.sections
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
        updateSections(state, sections) {
            Vue.set(state, 'sections', sections)
        },
        updateTreeViewItems(state, treeViewItems) {
            Vue.set(state, 'treeViewItems', treeViewItems)
        }
    },
    actions: {}
});
