/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import {ListItem} from "./Models/ListItem";

Vue.use(Vuex);

//Store pattern made with vuex

//It serves as the unique source of truth for the application, to make easier to communicate information to other components
//




export default new Vuex.Store({
    state: {
        displayedLesson: {},
        courses: [],
        lessons: [],
        currentSectionId: 0,
        currentCourseId: 0,

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
        displayedLesson: state => {
            return state.displayedLesson
        },
        courses: state => {
            return state.courses;
        },
        lessons: state => {
            return state.lessons;
        },
        coursesAsItemList: state => {
            return state.courses.map(course => ListItem.convertSmpCourse(course));
        },
        lessonsAsItemList: state => {
            return state.lessons.map(lsn => ListItem.convertSmpLesson(lsn))
        }
    },
    mutations: {
        UPDATE_CURRENT_LESSON_ID(state, id) {
            Vue.set(state, 'currentLessonId', id)
        },

        SET_OTHER_LESSONS_IDs(state, lessons) {
            Vue.set(state, 'otherLessonsIDs', lessons)
        },

        UPDATE_TREEVIEW_ITEMS(state, treeViewItems) {
            Vue.set(state, 'treeViewItems', treeViewItems)
        },

        UPDATE_DISPLAYED_LESSON(state, lesson) {
            state.displayedLesson = lesson
        },
        UPDATE_COURSES(state, courses) {
            state.courses = courses
        },
        UPDATE_LESSONS(state, lessons) {
            state.lessons = lessons;
        }
    },
    actions: {
        async fetchCourses({commit}, smp) {
            return new Promise((resolve, reject) => {
                let course = smp.getBusinessObject("LrnPlan");
                course.search(() => {
                    if (course.list) {
                        commit('UPDATE_COURSES', course.list);
                        resolve(course.list);
                    } else {
                        reject("Could not load the content");
                    }
                }, {}) //We give empty filters to the research so it doesn't remember previous researches
            });
        },
        async fetchAllLessons({commit}, smp) {
            console.log("fetchAllLessons");
            return new Promise((resolve, reject) => {
                let lessonObject = smp.getBusinessObject("LrnLesson");
                lessonObject.search(() => {
                    if (lessonObject.list) {
                        commit('UPDATE_LESSONS', lessonObject.list);
                        resolve(lessonObject.list)
                    } else {
                        resolve('Could not load the content')
                    }
                }, {})
            })
        },

        async fetchLessonsFromCourseID(context, payload){

            console.log(payload);
            console.log("smp in store");
            console.log(payload.smp);
            console.log("courseId in store");
            console.log(payload.courseId);
            return new Promise((resolve, reject) => {
                let lessonObject = payload.smp.getBusinessObject("LrnLesson");
                lessonObject.search(() => {
                    if (lessonObject.list){
                        context.commit('UPDATE_LESSONS', lessonObject.list)
                        resolve(lessonObject.list);
                    }
                    else {
                        reject("Could not load the content")
                    }
                }, {"lrnLsnPrtId__lrnPrtPlnId": payload.courseId});
            })
        }
    }
});
