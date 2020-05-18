/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

/* This Store is used to centralize the data of the app that is shared between the different components.
- The whole app is organized around a TreeView that is displayed in the navigation drawer of the app. This TreeView is
here for the user to navigate in the app.
- The state of the drawer is also controlled from this store because it can be changed from several components.
- The image popup state and image src are also controlled from this store.
*/
export default new Vuex.Store({
    state: {
        tree: [],
        drawerOpen: true,
        currentLesson: false,
        currentLessonImages: false,
        currentPopUpImage: '',
        popup: false,
    },
    getters: {
        tree:
          state => state.tree,
        drawerOpen:
            state => state.drawerOpen,
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
        getNextLessonPath:
            state => lessonPath => {
                let parents = lessonPath.split('/');
                parents.splice(0, 1);
                let cursor = state.tree;
                let path = "";
                let foundLsn = undefined;

                parents.forEach(function (val, idx, array) {
                    path += "/" + val;
                    let foundCat = cursor.find(item => item.trnCatPath && item.trnCatPath === path);
                    if (foundCat !== undefined) {
                        if (idx === parents.length - 2) //Means we are in the parent category of the we're looking lesson
                            cursor = foundCat.lessons;
                        else
                            cursor = foundCat.categories;
                    } else if (idx === parents.length - 1) {
                        foundLsn = cursor.find(item => item.trnLsnPath && item.trnLsnPath === path);
                    }
                });
                return foundLsn;
            },
        currentLesson:
            state => state.currentLesson,
        currentLessonImages:
            state => state.currentLessonImages,
    },

    mutations: {
        UPDATE_TREE(state, tree) {
            state.tree = tree;
        },
        UPDATE_DRAWER_OPEN(state, choice) {
            state.drawerOpen = choice;
        },
        UPDATE_CURRENT_LESSON(state, lesson){
            state.currentLesson = lesson;
        },
        UPDATE_LESSON_IMAGES(state, images){
            state.currentLessonImages = images;
        },
        UNLOAD_LESSON(state) {
            state.currentLesson = false;
            state.currentLessonImages = false;
        },
        UPDATE_POP_UP_IMAGE(state, image) {
            state.currentPopUpImage = image;
        },
        UPDATE_POP_UP_STATE(state, choice) {
            state.popup = choice;
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
                        commit('UPDATE_LESSON_IMAGES', picture.list.map(pic => ({
                            filename: pic.trnPicImage.name,
                            filesize: pic.trnPicImage.size,
                            filesrc: payload.smp.imageURL("TrnPicture", "trnPicImage", pic.row_id, pic.trnPicImage.id, false)
                        })));
                        resolve();
                    } else
                        reject("Impossible to fetch the pictures")
                }, {'trnPicLsnId': payload.lessonId}, {inlineDocs: 'infos'})
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
    },
});
