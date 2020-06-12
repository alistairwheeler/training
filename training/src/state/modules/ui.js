import {SET_DRAWER_STATE, SET_LIGHT_BOX_IMAGE, SET_LIGHT_BOX_VISIBILITY} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    isDrawerOpen: true,
    isLightBoxVisible: false,
    lightBoxImageSrc: '',
  },
  actions: {
    toggleDrawer({commit, state}){
      commit(SET_DRAWER_STATE, !state.isDrawerOpen);
    },
    displayLightBox({commit}, imageSrc) {
      commit(SET_LIGHT_BOX_IMAGE, imageSrc);
      commit(SET_LIGHT_BOX_VISIBILITY, true);
    },
    hideLightBox({commit}) {
      commit(SET_LIGHT_BOX_VISIBILITY, false);
    }
  },
  mutations: {
    [SET_DRAWER_STATE](state, choice) {
      state.isDrawerOpen = choice;
    },
    [SET_LIGHT_BOX_IMAGE](state, imageSrc) {
      state.lightBoxImageSrc = imageSrc;
    },
    [SET_LIGHT_BOX_VISIBILITY](state, visibility) {
      state.isLightBoxVisible = visibility;
    },
  }
}
