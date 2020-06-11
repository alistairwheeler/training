/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import tree from "./modules/tree";
import lesson from "./modules/lesson";

Vue.use(Vuex);

/* This Store is used to centralize the data of the app that is shared between the different components.
- The whole app is organized around a TreeView that is displayed in the navigation drawer of the app. This TreeView is
here for the user to navigate in the app.
- The state of the drawer is also controlled from this store because it can be changed from several components.
- The light-box isLightBoxVisible state and image src are also controlled from this store.
*/
export default new Vuex.Store({
  modules: {
    tree, lesson
  },
  state: {
    isDrawerOpen: true,
    isLightBoxVisible: false,
    lightBoxImageSrc: '',
  },
  mutations: {
    UPDATE_DRAWER_OPEN(state, choice) {
      state.isDrawerOpen = choice;
    },
    SET_LIGHT_BOX_IMAGE(state, imageSrc) {
      state.lightBoxImageSrc = imageSrc;
    },
    SET_LIGHT_BOX_VISIBILITY(state, choice) {
      state.isLightBoxVisible = choice;
    },
  },

  actions: {
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
    displayLightBox({commit}, imageSrc) {
      commit('SET_LIGHT_BOX_IMAGE', imageSrc);
      commit('SET_LIGHT_BOX_VISIBILITY', true);
    },
     hideLightBox({commit}) {
       commit('SET_LIGHT_BOX_VISIBILITY', false);
     }
  },
});
