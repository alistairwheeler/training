/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import {ListItem} from "./Models/ListItem";
import {Lesson} from "./Models/Lesson";
import {convertSmpTreeView, sortLessonIDs} from "./Helper";
import {Category} from "./Models/Category";
import {ContentItem} from "./Models/ContentItem";

Vue.use(Vuex);

//Store pattern made with vuex

//It serves as the unique source of truth for the application, to make easier to communicate information to other components

export default new Vuex.Store({
    state: {
        //OLD MODEL
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

        //NEW MODEL
        categories: [],
        items: [],
        allCategoriesLoaded: false,
        allItemsLoaded: false,
    },
    getters: {
        //NEW MODEL
        allCategoriesLoaded: state => {
            return state.allCategoriesLoaded;
        },

        getLessonWithPath : state => lessonPath => {
            return state.items.find(item => item.path === lessonPath)
        },

        allItemsLoaded: state => {
            return state.allItemsLoaded;
        },

        categoriesAsListItems: (state) => {
            return state.categories.map(category => ListItem.convertCategoryToListItem(category))
        },

        contentItemsAsListItems: (state) => {
            return state.items.map(item => ListItem.convertContentItemToListItem(item));
        },

        contentItemsFromCategoryAsItemList: (state) => (categoryPath) => {
            let filteredItems = state.items.filter(item => item.categoryPath.includes(categoryPath));
            return filteredItems.map(item => ListItem.convertContentItemToListItem(item))
        },

        allChildrenAsItemList: (state) => (categoryPath) => {
            let children = state.categories
                .filter(cat => cat.path.includes(categoryPath + '/'))
                .map(cat => ListItem.convertCategoryToListItem(cat));

            state.items
                .filter(item => item.categoryPath.includes(categoryPath))
                .map(item => children.push(ListItem.convertContentItemToListItem(item)));
            return children;
        },

        ancestorCategories : (state) => {
            return state.categories.filter(cat => cat.parentId === undefined)
                .map(ancestorCategory => ListItem.convertCategoryToListItem(ancestorCategory));
        },

        //OLD MODEL
        drawer: state => {
          return state.drawer;
        },

        treeViewItems: state => {
            return state.treeViewItems;
        },

        displayedLesson: state => {
            return state.displayedLesson
        },
    },

    mutations: {
        //NEW MODEL
        ALL_CATEGORIES_LOADED(state, choice){
            state.allCategoriesLoaded = choice;
        },

        ALL_ITEMS_LOADED(state, choice){
            state.allItemsLoaded = choice;
        },

        PUSH_CATEGORY(state, category){
            if(state.categories.find(elt => elt.row_id === category.row_id) === undefined){
                state.categories.push(category);
            } else{
                console.log("category already in the store")
            }
        },

        PUSH_ITEM(state, item){
            if(state.items.find(elt => elt.row_id === item.row_id) === undefined){
                state.items.push(item);
            } else{
                console.log("item already in the store")
            }
        },

        //OLD MODEL
        UPDATE_DRAWER(state, choice){
            state.drawer = choice;
        },

        UPDATE_TREE_VIEW_ITEMS(state, treeViewItems) {
            Vue.set(state, 'treeViewItems', treeViewItems)
        },

        UPDATE_DISPLAYED_LESSON(state, lesson) {
            Vue.set(state, 'displayedLesson', lesson);
        },

    },

    actions: {
        updateDisplayedLesson({commit}, lesson) {
            console.log(lesson);
            commit('UPDATE_DISPLAYED_LESSON', lesson);
        },

        //NEW MODEL
        async fetchCategories({commit}, payload) {
            return new Promise((resolve, reject) => {
                let category = payload.smp.getBusinessObject("TrnCategory");
                category.search(() => {
                    if (category.list) {
                        category.list.forEach(smpCategory => {
                            console.log(smpCategory);
                            commit('PUSH_CATEGORY', new Category(smpCategory))
                        });
                        commit('ALL_CATEGORIES_LOADED', true);
                        resolve(category.list);
                    } else {
                        reject("Could not load the categories");
                    }
                }, {})
            });
        },

        async getCategoriesFromParent({commit}, payload) {
            return new Promise((resolve, reject) => {
                let category = payload.smp.getBusinessObject("TrnCategory");
                category.search(() => {
                    if (category.list) {
                        category.list.forEach(smpCategory => commit('PUSH_CATEGORY', new Category(smpCategory)));
                        resolve(category.list);
                    } else {
                        reject("Could not load the categories");
                    }
                }, {"trnCatPath": payload.categoryPath})
            });
        },

        async fetchContentItem({commit}, payload) {
            return new Promise((resolve, reject) => {
                let lesson = payload.smp.getBusinessObject("TrnLesson");
                lesson.get(smpLesson => {
                    if (smpLesson) {
                        commit('PUSH_ITEM', new ContentItem(smpLesson));
                        resolve(smpLesson);
                    } else
                        reject("Could not load the lesson");
                }, {trnLsnPath: payload.itemPath})
            })
        },

        async getLessons(context, smp) {
            return new Promise((resolve, reject) => {
                let lesson = smp.getBusinessObject("TrnLesson");
                lesson.search(() => {
                    if (lesson.list) {
                        lesson.list.forEach(smpLesson => context.commit('PUSH_ITEM', new ContentItem(smpLesson)));
                        context.commit('ALL_ITEMS_LOADED', true);
                        resolve(lesson.list);
                    } else {
                        reject("Could not load the lessons");
                    }
                }, {})
            });
        },

        async getLessonsFromCategory({commit}, payload) {
            return new Promise((resolve, reject) => {
                let lesson = payload.smp.getBusinessObject("TrnLesson");
                lesson.search(() => {
                    if (lesson.list) {
                        lesson.list.forEach(smpLesson => commit('PUSH_ITEM', new ContentItem(smpLesson)));
                        resolve(lesson.list);
                    } else {
                        reject("Could not load the lessons");
                    }
                }, {"trnCatId": payload.categoryId})
            });
        },

        async getChildrenOf({commit}, payload){
            console.log("getting children of : " + payload.parentId);
            let children = [];
            let categoriesPromise = new Promise((resolve, reject) => {
                let category = payload.smp.getBusinessObject("TrnCategory");
                category.search(() => {
                    if (category.list) {
                        category.list.forEach(smpCategory => {
                            children.push(new Category(smpCategory));
                            commit('PUSH_CATEGORY', new Category(smpCategory))
                        });
                        resolve(category.list);
                    } else {
                        reject("Could not load the categories");
                    }
                }, {"trnCatId": payload.parentId})
            });
            let lessonsPromise = new Promise((resolve, reject) => {
                let lesson = payload.smp.getBusinessObject("TrnLesson");
                lesson.search(() => {
                    if (lesson.list) {
                        lesson.list.forEach(smpLesson => {
                            children.push(new ContentItem(smpLesson));
                            commit('PUSH_ITEM', new ContentItem(smpLesson))
                        });
                        resolve(lesson.list);
                    } else {
                        reject("Could not load the lessons");
                    }
                }, {"trnLsnCatId": payload.parentId})
            });

            Promise.all([categoriesPromise, lessonsPromise]).then(() => console.log(children))
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

    }
});
