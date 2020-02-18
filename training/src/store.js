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
        drawerOpen: 
            state => state.drawerOpen,
        allCategoriesLoaded:
            state => state.allCategoriesLoaded,
        allItemsLoaded:
            state => state.allItemsLoaded,
        getLessonWithPath:
            state => lessonPath => state.items.find(item => item.path === lessonPath),
        ancestorCategoriesAsListItems: 
            state => {
                let ancestors = [];
                state.categories.map(category => {
                    if(category.parentId === null)
                        ancestors.push(ListItem.convertCategory(category))
                });
                return ancestors
            },
        categoriesAsListItems: 
            state => state.categories.map(category => ListItem.convertCategory(category)),
        childrenCategories: 
            state => motherPath => {
                if (motherPath[0] !== '/')
                    motherPath = '/' + motherPath;
                return state.categories
                    .filter(category => category.parentPath === motherPath)
                    .map(category => ListItem.convertCategory(category));
            },
        childrenLessons: 
            state => motherPath => {
                if (motherPath[0] !== '/')
                    motherPath = '/' + motherPath;
                return state.items
                    .filter(item => item.categoryPath === motherPath)
                    .map(item => ListItem.convertContentItem(item));
            },
        nextLessonPath: 
            (state, getters) => {
                let currentPath = state.displayLessonPath;
                let sisterLessons = getters.sisterLessons(currentPath);
                let currentIndex = sisterLessons.findIndex(lesson => lesson.path === currentPath);
                return currentIndex === sisterLessons.length - 1 ? undefined : sisterLessons[currentIndex + 1].path;
            },
        previousLessonPath: 
            (state, getters) => {
                let currentPath = state.displayLessonPath;
                let sisterLessons = getters.sisterLessons(currentPath);
                let currentIndex = sisterLessons.findIndex(lesson => lesson.path === currentPath);
                return currentIndex === 0 ? undefined : sisterLessons[currentIndex - 1].path;
            },
        sisterLessons: 
            (state, getters) => (lessonPath) => {
                let parents = getters.parentsList(lessonPath);
                let directParent = parents[parents.length - 1];
                return getters.childrenLessons(directParent.path).sort((lsn1, lsn2) => parseInt(lsn1.order) - parseInt(lsn2.order));
            },
        parentsList: 
            state => lessonPath => {
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
        breadCrumb: 
            state => lessonPath => {
                let breadCrumbItems = [];
                let obj = {};
                state.hierarchy.forEach(ancestor => {
                    if (lessonPath.includes(ancestor.trnCatPath)) {
                        obj.title = ancestor.trnCatTitle;
                        obj.path = ancestor.trnCatPath;
                        breadCrumbItems.push(obj);
                        breadCrumbItems.push(...Category.findLessonBreadCrumb(ancestor, lessonPath));
                    }
                });
                return breadCrumbItems;
            },
        hierarchy: 
            state => state.hierarchy,
        treeView: 
            state => {
                let treeView = [];
                //console.log(JSON.stringify(state.hierarchy, null, 4));
                state.hierarchy.map(ancestorCategory => treeView.push(Category.convertExtCategoryToTreeView(ancestorCategory)));
                //console.log(JSON.stringify(treeView, null, 4));
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

        async fetchLessonsFromCategory({commit}, payload) {
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

        async fetchLesson({commit}, payload) {
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

        async fetchChildrenOf({commit}, payload) {
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
            return await Promise.all([categoriesPromise, lessonsPromise])
        },

        async fetchHierarchy({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                payload.smp._call(undefined, "/api/ext/TrnExternalTreeView", undefined, r=>{
                    commit('UPDATE_HIERARCHY', r);
                    resolve(r);
                });
            })
        },

        async fetchLessonsPictureURLs({commit}, payload) {
            //console.log('fetchLessonsPictureURLs() ' + payload.lessonId);
            return new Promise((resolve, reject) => {
                let picture = payload.smp.getBusinessObject("TrnPicture");
                picture.search(async () => {
                    if (picture.list) {
                        resolve(await picture.list.map(pic => payload.smp.dataURL(pic.trnPicImage)))
                    } else
                        reject("Impossible to fetch the pictures")
                }, {'trnPicLsnId': payload.lessonId},  { inlineDocs: true })
            });
        },

        async fetchCategoryPicture({commit}, payload) {
            return new Promise((resolve, reject) => {
                let picture = payload.smp.getBusinessObject("TrnCategory");
                picture.search(async () => {
                    if (picture.list) {
                        resolve(await picture.list.map(pic => {
                            pic.trnCatPicture!=null ? payload.smp.dataURL(pic.trnCatPicture) : null;
                        }))
                    } else
                        reject("Impossible to fetch the pictures")
                }, {'row_id': payload.categoryId},  { inlineDocs: true })
            });
        },

        /*async fetchCategoryPictureURLs({commit}, payload) {
            // console.log('fetchCategoryPictureURLs()' + payload.categoryId);
            return new Promise((resolve, reject) => {
                let categoryPicture = payload.smp.getBusinessObject("TrnCategoryPicture");
                categoryPicture.search(async () => {
                    if (categoryPicture.list) {
                        resolve(await categoryPicture.list.map(pic => payload.smp.dataURL(pic.trnCtpImage))[0])
                    } else
                        reject("Impossible to fetch the pictures")
                }, {'trnCtpCatId': payload.categoryId}, { inlineDocs: true })
            });
        },*/
    }

});
