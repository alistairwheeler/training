/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import {ListItem} from "./Models/ListItem";
import {Lesson} from "./Models/Lesson";
import {convertSmpTreeView, sortLessonIDs} from "./Helper";

Vue.use(Vuex);

//Store pattern made with vuex

//It serves as the unique source of truth for the application, to make easier to communicate information to other components
//

export default new Vuex.Store({
    state: {
        displayedLesson: {},
        courses: [],
        lessons: [],
        currentLessonId: 0,
        currentSectionId: 0,
        currentCourseId: 0,
        allLessonsLoaded: false,
        drawer: false,
        otherLessonsIDs: [],
        treeViewItems: [],

        categories: [],
        items: [],

    },
    getters: {
        allLessonsLoaded: state => {
            return state.allLessonsLoaded;
        },

        drawer: state => {
          return state.drawer;
        },

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

        coursesAsListItems: state => {
            return state.courses.map(course => ListItem.convertSmpCourse(course));
        },

        lessons: state => {
            return state.lessons;
        },

        lessonWithId: (state) => (lessonId) => {
            console.log(state.lessons.find(lsn => parseInt(lsn.row_id) === lessonId));
            return state.lessons.find(lsn => parseInt(lsn.row_id) === lessonId)
        },

        lessonsFromCourseAsListItems: (state) => (courseId) => {
            let filteredLessons = state.lessons.filter(lsn => parseInt(lsn.lrnLsnPrtId__lrnPrtPlnId) === courseId);
            return filteredLessons.map(lsn => ListItem.convertSmpLesson(lsn))
        },

        lessonsFromSectionAsListItems: (state) => (sectionId) => {
            let filteredLessons = state.lessons.filter(lsn => parseInt(lsn.lrnLsnPrtId) === sectionId);
            return filteredLessons.map(lsn => ListItem.convertSmpLesson(lsn))
        },

        lessonsAsListItems: state => {
            console.log("lessonsAsListItems");
            return state.lessons.map(lsn => ListItem.convertSmpLesson(lsn))
        },

        //NEW MODEL

        categoriesAsListItems: (state) => {
            return state.categories.map(category => ListItem.convertSmpCategory(category))
        },

        contentItemsAsListItems: (state) => {
            return state.items.map(item => ListItem.convertSmpContentItem(item));
        }

    },
    mutations: {
        ALL_LESSONS_LOADED(state, choice) {
            state.allLessonsLoaded = choice;
        },

        UPDATE_DRAWER(state, choice){
            state.drawer = choice;
        },

        PUSH_COURSE(state, course) {
            if(state.courses.find(elt => elt.row_id === course.row_id) === undefined){
                state.courses.push(course);
            } else{
                console.log("course already in the store")
            }
        },

        PUSH_LESSON(state, lesson) {
            if( state.lessons.find(elt => elt.row_id === lesson.row_id) === undefined){
                state.lessons.push(lesson);
            } else {
                console.log("lesson already in the store")
            }
        },

        UPDATE_CURRENT_LESSON_ID(state, id) {
            state.currentLessonId = id;
        },

        UPDATE_CURRENT_SECTION_ID(state, id) {
            state.currentSectionId = id;
        },

        UPDATE_CURRENT_COURSE_ID(state, id) {
            state.currentCourseId = id;
        },

        UPDATE_OTHER_LESSONS_IDs(state, lessons) {
            Vue.set(state, 'otherLessonsIDs', lessons)
        },

        UPDATE_TREE_VIEW_ITEMS(state, treeViewItems) {
            Vue.set(state, 'treeViewItems', treeViewItems)
        },

        UPDATE_DISPLAYED_LESSON(state, lesson) {
            Vue.set(state, 'displayedLesson', lesson);
        },

        UPDATE_COURSES(state, courses) {
            state.courses = courses;
        },

        UPDATE_LESSONS(state, lessons) {
            state.lessons = lessons;
        },

        //NEW MODEL

        PUSH_CATEGORY(state, category){
            if(state.categories.find(elt => elt.row_id === category.row_id) === undefined){
                state.courses.push(category);
            } else{
                console.log("category already in the store")
            }
        },

        PUSH_ITEM(state, item){
            if(state.items.find(elt => elt.row_id === item.row_id) === undefined){
                state.courses.push(item);
            } else{
                console.log("category already in the store")
            }
        },
    },
    actions: {
        updateDisplayedLesson({commit}, lesson) {
            console.log(lesson);
            commit('UPDATE_DISPLAYED_LESSON', lesson);
        },

        async fetchCourses({commit}, smp) {
            return new Promise((resolve, reject) => {
                let course = smp.getBusinessObject("LrnPlan");
                course.search(() => {
                    if (course.list) {
                        course.list.forEach(elt => commit('PUSH_COURSE', elt));
                        resolve(course.list);
                    } else {
                        reject("Could not load the content");
                    }
                }, {}) //We give empty filters to the research so it doesn't remember previous researches
            });
        },

        async fetchLesson(context, payload) {
            return new Promise((resolve, reject) => {
                let lessonObject = payload.smp.getBusinessObject("LrnLesson");
                lessonObject.get((response) => {
                    if (response) {
                        console.log(response);
                        context.commit('PUSH_LESSON', response);
                        context.commit('UPDATE_DISPLAYED_LESSON', response);
                        resolve(response);
                    } else
                        reject("Could not load the lesson");
                }, payload.lessonId)
            })
        },

        async fetchAllLessons({commit}, smp) {
            return new Promise((resolve, reject) => {
                let lessonObject = smp.getBusinessObject("LrnLesson");
                lessonObject.search(() => {
                    if (lessonObject.list) {
                        lessonObject.list.forEach(elt => commit('PUSH_LESSON', elt));
                        commit('ALL_LESSONS_LOADED', true);
                        resolve(lessonObject.list);
                    } else {
                        resolve('Could not load the content')
                    }
                }, {})
            })
        },

        async fetchLessonsFromCourseID(context, payload) {
            return new Promise((resolve, reject) => {
                let lessonObject = payload.smp.getBusinessObject("LrnLesson");
                lessonObject.search(() => {
                    if (lessonObject.list) {
                        lessonObject.list.forEach(elt => context.commit('PUSH_LESSON', elt));
                        resolve(lessonObject.list);
                    } else {
                        reject("Could not load the content")
                    }
                }, {"lrnLsnPrtId__lrnPrtPlnId": payload.courseId});
            })
        },

        async fetchLessonsFromSection(context, payload) {
            return new Promise((resolve, reject) => {
                let lessonObject = payload.smp.getBusinessObject("LrnLesson");
                lessonObject.search(() => {
                    if (lessonObject.list) {
                        lessonObject.list.forEach(elt => context.commit('PUSH_LESSON', elt));
                        resolve(lessonObject.list);
                    } else {
                        reject("Could not load the content")
                    }
                }, {"lrnLsnPrtId": payload.sectionId});
            });
        },

        async fetchTreeViewFromCourse(context, payload) {
            console.log("fetchTreeView");
            console.log(payload);
            return new Promise((resolve, reject) => {
                payload.smp.treeview((treeView) => {
                    console.log(treeView);
                    let convertedTreeView = convertSmpTreeView(treeView.list);
                    context.commit('UPDATE_TREE_VIEW_ITEMS', convertedTreeView);
                    context.commit('UPDATE_OTHER_LESSONS_IDs', sortLessonIDs(convertedTreeView));
                    resolve(convertedTreeView)
                }, 'lrnTreeView', {service: 'page', object: 'LrnPlan', rowid: payload.courseId, child: 'LrnPart'})
            });
        },

        //NEW MODEL

        async getCategories(context, smp) {
            return new Promise((resolve, reject) => {
                let category = smp.getBusinessObject("TrnCategory");
                category.search(() => {
                    if (category.list) {
                        category.list.forEach(elt => context.commit('PUSH_CATEGORY', elt));
                        resolve(category.list);
                    } else {
                        reject("Could not load the categories");
                    }
                }, {})
            });
        },

        async getCategoriesFromParent(context, payload) {
            return new Promise((resolve, reject) => {
                let category = payload.smp.getBusinessObject("TrnCategory");
                category.search(() => {
                    if (category.list) {
                        category.list.forEach(elt => context.commit('PUSH_CATEGORY', elt));
                        resolve(category.list);
                    } else {
                        reject("Could not load the categories");
                    }
                }, {"trnCatId": payload.categoryId})
            });
        },

        async getLessons(context, smp) {
            return new Promise((resolve, reject) => {
                let lesson = smp.getBusinessObject("TrnLesson");
                lesson.search(() => {
                    if (lesson.list) {
                        lesson.list.forEach(elt => context.commit('PUSH_ITEM', elt));
                        resolve(lesson.list);
                    } else {
                        reject("Could not load the lessons");
                    }
                }, {})
            });
        },

        async getLessonsFromCategory(context, payload) {
            return new Promise((resolve, reject) => {
                let lesson = payload.smp.getBusinessObject("TrnLesson");
                lesson.search(() => {
                    if (lesson.list) {
                        lesson.list.forEach(elt => context.commit('PUSH_ITEM', elt));
                        resolve(lesson.list);
                    } else {
                        reject("Could not load the lessons");
                    }
                }, {"trnCatId": payload.categoryId})
            });
        },
    }
});
