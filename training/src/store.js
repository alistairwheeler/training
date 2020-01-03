/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import {ListItem} from "./Models/ListItem";
import {Category} from "./Models/Category";
import {ContentItem} from "./Models/ContentItem";

Vue.use(Vuex);

//Store pattern made with vuex

//It serves as the unique source of truth for the application, to make easier the communication of information between components

export default new Vuex.Store({
    state: {
        hierarchy: [],
        categories: [],
        items: [],
        displayLessonPath: '',
        allCategoriesLoaded: false,
        allItemsLoaded: false,
        drawerOpen: false,
    },

    getters: {
        //NEW MODEL
        drawerOpen: state => {
            return state.drawerOpen
        },

        allCategoriesLoaded: state => {
            return state.allCategoriesLoaded;
        },

        allItemsLoaded: state => {
            return state.allItemsLoaded;
        },

        getLessonWithPath: state => lessonPath => {
            return state.items.find(item => item.path === lessonPath)
        },

        categoriesAsListItems: (state) => {
            return state.categories.map(category => ListItem.convertCategory(category))
        },

        childrenCategories: state => motherPath => {
            if (motherPath[0] !== '/')
                motherPath = '/' + motherPath;
            return state.categories
                .filter(category => category.parentPath === motherPath)
                .map(category => ListItem.convertCategory(category));
        },

        childrenLessons: state => motherPath => {
            console.log("childrenLessons");
            if (motherPath[0] !== '/')
                motherPath = '/' + motherPath;
            return state.items
                .filter(item => item.categoryPath === motherPath)
                .map(item => ListItem.convertContentItem(item));
        },

        nextLessonPath: (state, getters) => {
            console.log("nextLessonPath");
            let currentPath = state.displayLessonPath;
            console.log("currentPath : " + currentPath);
            let sisterLessons = getters.sisterLessons(currentPath);
            let currentIndex = sisterLessons.findIndex(lesson => lesson.path === currentPath);
            if (currentIndex === sisterLessons.length - 1) {
                return undefined
            } else {
                return sisterLessons[currentIndex + 1].path;
            }
        },

        previousLessonPath: (state, getters) => {
            let currentPath = state.displayLessonPath;
            let sisterLessons = getters.sisterLessons(currentPath);
            let currentIndex = sisterLessons.findIndex(lesson => lesson.path === currentPath);
            if (currentIndex === 0) {
                return undefined
            } else {
                return sisterLessons[currentIndex - 1].path;
            }
        },

        sisterLessons: (state, getters) => (lessonPath) => {
            console.log("sisterLessons");
            console.log("lessonPath : " + lessonPath);
            let parents = getters.parentsList(lessonPath);
            let directParent = parents[parents.length - 1];
            console.log("directPrent.path : " + directParent.path);
            return getters.childrenLessons(directParent.path)
                .sort((lsn1, lsn2) => {
                    return parseInt(lsn1.order) - parseInt(lsn2.order)
                });
        },

        parentsList: state => lessonPath => {
            console.log("parentsList");
            let parents = [];
            let obj = {};
            state.hierarchy.forEach(ancestor => {
                if (lessonPath.includes(ancestor.trnCatPath)) {
                    obj.title = ancestor.trnCatTitle;
                    obj.path = ancestor.trnCatPath;
                    parents.push(obj);
                    parents.push(...Category.findParentsOfLesson(ancestor, lessonPath));
                }
            });
            return parents;
        },

        breadCrumb: state => lessonPath => {
            console.log("breadCrumb() " + lessonPath);
            let breadCrumbItems = [];
            let obj = {};
            state.hierarchy.forEach(ancestor => {
                console.log(ancestor.trnCatTitle);
                if (lessonPath.includes(ancestor.trnCatPath)) {
                    console.log(ancestor.trnCatTitle + " is included in the path");
                    obj.title = ancestor.trnCatTitle;
                    obj.path = ancestor.trnCatPath;
                    breadCrumbItems.push(obj);
                    breadCrumbItems.push(...Category.findLessonBreadCrumb(ancestor, lessonPath));
                } else {
                    console.log(ancestor.trnCatTitle + " is not included in the path")
                }
            });
            console.log(breadCrumbItems);
            return breadCrumbItems;
        },

        hierarchy: state => {
            return state.hierarchy;
        },

        treeView: (state) => {
            let treeView = [];
            state.hierarchy.map(ancestorCategory => treeView.push(Category.convertExtCategoryToTreeView(ancestorCategory)));
            return treeView
        },

    },

    mutations: {
        UPDATE_DRAWER_OPEN(state, choice) {
            state.drawerOpen = choice;
        },

        ALL_CATEGORIES_LOADED(state, choice) {
            state.allCategoriesLoaded = choice;
        },

        ALL_ITEMS_LOADED(state, choice) {
            state.allItemsLoaded = choice;
        },

        PUSH_CATEGORY(state, category) {
            if (state.categories.find(elt => elt.row_id === category.row_id) === undefined) {
                state.categories.push(category);
            } else {
                console.log("category already in the store")
            }
        },

        PUSH_ITEM(state, item) {
            if (state.items.find(elt => elt.row_id === item.row_id) === undefined) {
                state.items.push(item);
            } else {
                console.log("item already in the store")
            }
        },

        UPDATE_HIERARCHY(state, hierarchy) {
            state.hierarchy = hierarchy;
        },

        UPDATE_DISPLAYED_LESSON_PATH(state, lessonPath) {
            Vue.set(state, 'displayLessonPath', lessonPath);
        },

    },

    actions: {
        async fetchCategories({commit}, payload) {
            return new Promise((resolve, reject) => {
                let category = payload.smp.getBusinessObject("TrnCategory");
                category.search(() => {
                    if (category.list) {
                        category.list.forEach(smpCategory => {
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
                lesson.search(() => {
                    if (lesson.list) {
                        let lsn = new ContentItem(lesson.list[0]);
                        commit('PUSH_ITEM', lsn);
                        resolve(lsn);
                    } else
                        reject("Could not load the lesson");
                }, {"trnLsnPath": payload.itemPath})
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

        async getChildrenOf({commit}, payload) {
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

        async fetchHierarchy({commit}, payload) {
            let placeHolderHierarchy = [
                {
                    "trnCatId": null,
                    "trnCatOrder": 1010,
                    "trnCatDescription": "1",
                    "trnCatId__trnCatTitle": null,
                    "trnCatTitle": "cat1",
                    "trnCatPath": "/cat1",
                    "categories": [
                        {
                            "trnCatId": "11",
                            "trnCatOrder": 1020,
                            "trnCatDescription": "2",
                            "trnCatId__trnCatTitle": "cat1",
                            "trnCatTitle": "cat2",
                            "trnCatPath": "/cat1/cat2",
                            "categories": [
                                {
                                    "trnCatId": "12",
                                    "trnCatOrder": 1030,
                                    "trnCatDescription": "3",
                                    "trnCatId__trnCatTitle": "cat2",
                                    "trnCatTitle": "cat3",
                                    "trnCatPath": "/cat1/cat2/cat3",
                                    "categories": [
                                        {
                                            "trnCatId": "13",
                                            "trnCatOrder": 1040,
                                            "trnCatDescription": "4",
                                            "trnCatId__trnCatTitle": "cat3",
                                            "trnCatTitle": "cat4",
                                            "trnCatPath": "/cat1/cat2/cat3/cat4",
                                            "row_id": "14",
                                            "trnCatPicture": null,
                                            "trnCatId__trnCatPath": "/cat1/cat2/cat3",
                                            "lessons": [
                                                {
                                                    "trnLsnPath": "/cat1/cat2/cat3/cat4/lecon3",
                                                    "trnLsnOrder": 300,
                                                    "trnLsnCatId__trnCatPath": "/cat1/cat2/cat3/cat4",
                                                    "trnLsnTitle": "Lecon 3",
                                                    "trnLsnDescription": "Une leçon pour la catégorie enfant 1, qui avait envie d'être maman",
                                                    "trnLsnVideoUrl": null,
                                                    "trnLsnContent": "<h1> je suis un titre de niveau 1<\/h1>",
                                                    "trnLsnCatId__trnCatTitle": "cat4",
                                                    "row_id": "3",
                                                    "trnLsnCatId": "14"
                                                },
                                                {
                                                    "trnLsnPath": "/cat1/cat2/cat3/cat4/lecon1",
                                                    "trnLsnOrder": 10,
                                                    "trnLsnCatId__trnCatPath": "/cat1/cat2/cat3/cat4",
                                                    "trnLsnTitle": "Lecon1",
                                                    "trnLsnDescription": "LeconRecursive1",
                                                    "trnLsnVideoUrl": null,
                                                    "trnLsnContent": null,
                                                    "trnLsnCatId__trnCatTitle": "cat4",
                                                    "row_id": "7",
                                                    "trnLsnCatId": "14"
                                                }
                                            ]
                                        }
                                    ],
                                    "row_id": "13",
                                    "trnCatPicture": null,
                                    "trnCatId__trnCatPath": "/cat1/cat2"
                                }
                            ],
                            "row_id": "12",
                            "trnCatPicture": null,
                            "trnCatId__trnCatPath": "/cat1"
                        }
                    ],
                    "row_id": "11",
                    "trnCatPicture": null,
                    "trnCatId__trnCatPath": null
                },
                {
                    "trnCatId": null,
                    "trnCatOrder": 200,
                    "trnCatDescription": "Une deuxième catégorie pour plus de diversité",
                    "trnCatId__trnCatTitle": null,
                    "trnCatTitle": "Catégorie 2",
                    "trnCatPath": "/catgorie2",
                    "categories": [
                        {
                            "trnCatId": "5",
                            "trnCatOrder": 100,
                            "trnCatDescription": "Première catégorie créée pour utilisation dans le front Simplicité",
                            "trnCatId__trnCatTitle": "Catégorie 2",
                            "trnCatTitle": "Catégorie1",
                            "trnCatPath": "/catgorie2/catgorie1",
                            "categories": [
                                {
                                    "trnCatId": "4",
                                    "trnCatOrder": 300,
                                    "trnCatDescription": "Une catégorie enfant pour tester ce feature",
                                    "trnCatId__trnCatTitle": "Catégorie1",
                                    "trnCatTitle": "Enfant 1",
                                    "trnCatPath": "/catgorie2/catgorie1/enfant1",
                                    "row_id": "6",
                                    "trnCatPicture": null,
                                    "trnCatId__trnCatPath": "/catgorie2/catgorie1"
                                }
                            ],
                            "row_id": "4",
                            "trnCatPicture": null,
                            "trnCatId__trnCatPath": "/catgorie2",
                            "lessons": [
                                {
                                    "trnLsnPath": "/catgorie2/catgorie1/titre1",
                                    "trnLsnOrder": 1010,
                                    "trnLsnCatId__trnCatPath": "/catgorie2/catgorie1",
                                    "trnLsnTitle": "Titre 1",
                                    "trnLsnDescription": "Description 1",
                                    "trnLsnVideoUrl": null,
                                    "trnLsnContent": null,
                                    "trnLsnCatId__trnCatTitle": "Catégorie1",
                                    "row_id": "4",
                                    "trnLsnCatId": "4"
                                }
                            ]
                        }
                    ],
                    "row_id": "5",
                    "trnCatPicture": null,
                    "trnCatId__trnCatPath": null,
                    "lessons": [
                        {
                            "trnLsnPath": "/catgorie2/titre2",
                            "trnLsnOrder": 1020,
                            "trnLsnCatId__trnCatPath": "/catgorie2",
                            "trnLsnTitle": "Titre 2",
                            "trnLsnDescription": "Description 2",
                            "trnLsnVideoUrl": null,
                            "trnLsnContent": null,
                            "trnLsnCatId__trnCatTitle": "Catégorie 2",
                            "row_id": "5",
                            "trnLsnCatId": "5"
                        }
                    ]
                }
            ];
            console.log("fetchHierarchy");
            return new Promise((resolve, reject) => {
                let url = payload.smp.getExternalObjectURL('TrnExternalTreeView');
                payload.smp.getExternalObject(response => {
                    commit('UPDATE_HIERARCHY', placeHolderHierarchy);
                    resolve(placeHolderHierarchy);
                }, 'TrnExternalTreeView');
            })
        },
    }

});
