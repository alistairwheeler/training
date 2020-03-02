/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
//import {convertTreeToArray, convertTreeToVuetify, findLessonBreadCrumb, findParentsOfLesson} from "./Helper";

Vue.use(Vuex);

//Store pattern made with vuex

//It serves as the unique source of truth for the application, to make easier the communication of information between components

export default new Vuex.Store({
    state: {
        hierarchy: [],
        categories: [],
        items: [],
        displayLessonPath: '',

        drawerOpen: true,
        tree: [],
        vTree: [],
        treeLoaded: false,
        currentLesson: false,
        currentLessonImages: false,
    },

    getters: {
        //NEW MODEL
        drawerOpen:
            state => state.drawerOpen,
        drawerActive:
            state => state.currentLesson ? [state.currentLesson.trnLsnPath] : [],
        treeLoaded:
            state => state.treeLoaded,
        breadCrumbItems:
            state => {
                let parents = state.currentLesson.trnLsnPath.split('/');
                parents.splice(0, 1);
                let cursor = state.tree;
                let path = "";
                let rslt = [];
                let finish = false;

                parents.forEach(function (val, idx, array) {
                    path += "/" + val;
                    let foundCat = cursor.find(item => item.trnCatPath && item.trnCatPath == path);
                    if (foundCat != undefined) {
                        rslt.push({
                            title: foundCat.trnCatTitle,
                            path: foundCat.trnCatPath
                        });
                        if (idx == parents.length - 2)
                            cursor = foundCat.lessons;
                        else
                            cursor = foundCat.categories;
                    } else if (idx == parents.length - 1) {
                        let foundLsn = cursor.find(item => item.trnLsnPath && item.trnLsnPath == path);
                        if (foundLsn != undefined) {
                            rslt.push({
                                title: foundLsn.trnLsnTitle,
                                path: foundLsn.trnLsnPath
                            })
                            finish = true;
                        }
                    }
                });
                return finish == true ? rslt : false;
            },
        getLessonFromPath:
            state => lessonPath => {
                let parents = lessonPath.split('/');
                parents.splice(0, 1);
                let cursor = state.tree;
                let path = "";
                let foundLsn = undefined;

                parents.forEach(function (val, idx, array) {
                    path += "/" + val;
                    let foundCat = cursor.find(item => item.trnCatPath && item.trnCatPath == path);
                    if (foundCat != undefined) {
                        if (idx == parents.length - 2)
                            cursor = foundCat.lessons;
                        else
                            cursor = foundCat.categories;
                    } else if (idx == parents.length - 1) {
                        foundLsn = cursor.find(item => item.trnLsnPath && item.trnLsnPath == path);
                    }
                });
                return foundLsn;
            },
        currentLesson:
            state => state.currentLesson,
        currentLessonImages:
            state => state.currentLessonImages,
        currentLessonImagesLoaded:
            state => state.currentLessonImages !== false,
        tree:
            state => state.tree,
        treeAsVuetifyTree:
            state => state.vTree,

        //GETTERS TO DEVELOP WITH THE NEW TREEVIEW

    },

    mutations: {
        UPDATE_DRAWER_OPEN(state, choice) {
            state.drawerOpen = choice;
        },

        UPDATE_TREE(state, tree) {
            state.tree = tree;
            state.treeLoaded = true;

            //recursive v-tree builder
            let convertItemToVTree = function (item) {
                if (Object.prototype.hasOwnProperty.call(item, "trnLsnPath")) {
                    return {
                        id: item.row_id,
                        name: item.trnLsnTitle,
                        path: item.trnLsnPath,
                        description: item.trnLsnDescription,
                        type: "lesson",
                        open: true
                    }
                } else {
                    var childLessons = item.lessons.map(convertItemToVTree);
                    var childCategories = item.categories.map(convertItemToVTree);
                    return {
                        id: item.row_id,
                        name: item.trnCatTitle,
                        path: item.trnCatPath,
                        description: item.trnCatDescription,
                        type: "category",
                        children: [...childCategories, ...childLessons],
                        open: true
                    };
                }
            };
            state.vTree = state.tree.map(convertItemToVTree);
        },

        UPDATE_DISPLAYED_LESSON_PATH(state, lessonPath) {
            Vue.set(state, 'displayLessonPath', lessonPath);
        },

        UPDATE_CURRENT_LESSON(state, lesson) {
            state.currentLesson = lesson;
        },


        UPDATE_LESSON_IMAGES(state, images) {
            state.currentLessonImages = [];
            images.forEach(img => state.currentLessonImages.push(img));
            console.log("--- Lesson images added");
        },

        UNLOAD_LESSON(state) {
            state.currentLesson = false;
            state.currentLessonImages = false;
            console.log("--- Lesson images deleted");
        },
    },

    actions: {
        // Call only once at app creation

        async fetchTree({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                payload.smp._call(undefined, "/ext/TrnTreeService?array=true", undefined, r => {
                    commit('UPDATE_TREE', r);
                    resolve();
                });
            })
        },

        async loadLesson({commit}, payload) {
            await this.dispatch("loadLessonContent", payload);
            this.dispatch("loadLessonImages", payload);
        },

        async loadLessonImages({commit}, payload) {
            return new Promise((resolve, reject) => {
                let picture = payload.smp.getBusinessObject("TrnPicture");
                picture.search(function () {
                    if (picture.list) {
                        commit('UPDATE_LESSON_IMAGES', picture.list.map(pic => payload.smp.imageURL("TrnPicture", "trnPicImage", pic.row_id, pic.trnPicImage, false)));
                        resolve();
                    } else
                        reject("Impossible to fetch the pictures")
                }, {'trnPicLsnId': payload.lessonId})
            });
        },

        async loadLessonContent(context, payload) {
            return new Promise(async (resolve, reject) => {
                let lesson = payload.smp.getBusinessObject("TrnLesson");
                lesson.get(function () {
                    context.commit('UPDATE_CURRENT_LESSON', lesson.item);
                    resolve();
                }, payload.lessonId);
            });
        },

        async fetchLessonsPictureURLs({commit}, payload) {
            return new Promise((resolve, reject) => {
                let picture = payload.smp.getBusinessObject("TrnPicture");
                picture.search(async () => {
                    if (picture.list) {
                        resolve(picture.list.map(pic => payload.smp.imageURL("TrnPicture", "trnPicImage", pic.row_id, pic.trnPicImage, false)))
                    } else
                        reject("Impossible to fetch the pictures")
                }, {'trnPicLsnId': payload.lessonId})
            });
        },

        // ------

        async fetchCategoryPicture({commit}, payload) {
            return new Promise((resolve, reject) => {
                let picture = payload.smp.getBusinessObject("TrnCategory");
                picture.search(async () => {
                    if (picture.list) {
                        resolve(picture.list.map(pic => {
                            pic.trnCatPicture != null ? payload.smp.dataURL(pic.trnCatPicture) : null;
                        }))
                    } else
                        reject("Impossible to fetch the pictures")
                }, {'row_id': payload.categoryId}, {inlineDocs: true})
            });
        },
    },
});
