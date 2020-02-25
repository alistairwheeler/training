/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import {Category} from "./Models/Category";
import {convertTreeToArray, convertTreeToVuetify, findLessonBreadCrumb, findParentsOfLesson} from "./Helper";

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
        tree: {},
        treeLoaded: false,
        currentLesson: false,
        currentLessonImages: []
    },

    getters: {
        //NEW MODEL
        drawerOpen: 
            state => state.drawerOpen,
        treeLoaded:
            state => state.treeLoaded,
        breadCrumb: 
            state => lessonPath => {
                console.log("========= BREADCRUMB ========")
                let breadCrumbItems = [];
                let obj = {};
                convertTreeToArray(state.tree).forEach(ancestor => {
                    console.log(ancestor)
                    if (lessonPath.includes(ancestor.path)) {
                        obj.title = ancestor.trnCatTitle;
                        obj.path = ancestor.trnCatPath;
                        breadCrumbItems.push(obj);
                        breadCrumbItems.push(...findLessonBreadCrumb(ancestor, lessonPath));
                    }
                });
                console.log(breadCrumbItems)
                return breadCrumbItems;
            },

        /*
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
         */

        getLessonFromPath:
            state => lessonPath => {
                //try to find lesson in tree
                let parents = lessonPath.split('/');
                let cursor = state.tree;
                let path = "";
                try{
                    for(let i=1; i<parents.length; i++){
                        path+="/"+parents[i];
                        if(i==1)
                            cursor = cursor[path];
                        else if(i==parents.length-1)
                            cursor = cursor.lessons[path];
                        else
                            cursor = cursor.categories[path];
                    }
                    return cursor;
                }
                catch(e){
                    return false;
                }
            },
        currentLesson:
            state => state.currentLesson,
        currentLessonImages:
            state => state.currentLessonImages,
        tree:
            state => state.tree,
        treeAsVuetifyTree:
            state => convertTreeToVuetify(state.tree)

        //GETTERS TO DEVELOP WITH THE NEW TREEVIEW

    },

    mutations: {
        UPDATE_DRAWER_OPEN(state, choice) {
            state.drawerOpen = choice;
        },

        UPDATE_TREE(state, tree) {
            state.tree = tree;
            state.treeLoaded = true;
            console.debug("====================Tree loaded.");
            console.debug(JSON.stringify(tree, null, 4));
        },

        UPDATE_DISPLAYED_LESSON_PATH(state, lessonPath) {
            Vue.set(state, 'displayLessonPath', lessonPath);
        },

        UPDATE_CURRENT_LESSON(state, lesson){
            state.currentLesson = lesson;
        },

        UPDATE_LESSON_IMAGES(state, images){
            images.forEach(img => state.currentLessonImages.push(img));
            console.log("--- Lesson images added");
        },

        UNLOAD_LESSON(state){
            state.currentLesson = false;
            state.currentLessonImages.splice(0, state.currentLessonImages.length);
            console.log("--- Lesson images deleted");
        }
    },

    actions: {
        // Call only once at app creation

        async fetchTree({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                payload.smp._call(undefined, "/ext/TrnTreeService", undefined, r=>{
                    console.log("treeview");
                    console.log(r);
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
            return new Promise(async (resolve, reject) => {
                console.log("START SEARCH PICTURE");
                payload.smp._call(undefined, "/ext/TrnTreeService", {getImages: true, lessonId: payload.lessonId}, r=>{
                    console.log("END SEARCH PICTURE");
                    if(Array.isArray(r))
                        commit('UPDATE_LESSON_IMAGES', r.map(pic => payload.smp.imageURL("TrnPicture", "trnPicImage", pic.row_id, pic.trnPicImage, false)));
                    resolve();
                });
            });
            // TODO slow, use WS instead
            // return new Promise((resolve, reject) => {
            //     let picture = payload.smp.getBusinessObject("TrnPicture");
            //     console.log("START SEARCH PICTURE");
            //     picture.search(function(){
            //         console.log("END SEARCH PICTURE");
            //         console.log(picture.list);
            //         if (picture.list) {
            //             commit('UPDATE_LESSON_IMAGES', picture.list.map(pic => payload.smp.imageURL("TrnPicture", "trnPicImage", pic.row_id, pic.trnPicImage, false)));
            //             resolve();
            //         } else
            //             reject("Impossible to fetch the pictures")
            //     }, {'trnPicLsnId': payload.lessonId})
            // });
        },

        async loadLessonContent({commit}, payload) {
            return new Promise(async (resolve, reject) => {
                let lesson = payload.smp.getBusinessObject("TrnLesson");
                lesson.get(function(){
                    commit('UPDATE_CURRENT_LESSON', lesson.item);
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
                            pic.trnCatPicture!=null ? payload.smp.dataURL(pic.trnCatPicture) : null;
                        }))
                    } else
                        reject("Impossible to fetch the pictures")
                }, {'row_id': payload.categoryId},  { inlineDocs: true })
            });
        },
    },




});
