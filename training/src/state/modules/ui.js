export default {
  namespaced: true,
  state: {
    isDrawerOpen: true,
    isLightBoxVisible: false,
    lightBoxImageSrc: '',
  },
  actions: {
    toggleDrawer(context){
      context.commit('UPDATE_DRAWER_OPEN', !context.state.isDrawerOpen);
    },
    displayLightBox({commit}, imageSrc) {
      commit('SET_LIGHT_BOX_IMAGE', imageSrc);
      commit('SET_LIGHT_BOX_VISIBILITY', true);
    },
    hideLightBox({commit}) {
      commit('SET_LIGHT_BOX_VISIBILITY', false);
    }
  },
  mutations: {
    UPDATE_DRAWER_OPEN(state, choice) {
      state.isDrawerOpen = choice;
    },
    SET_LIGHT_BOX_IMAGE(state, imageSrc) {
      state.lightBoxImageSrc = imageSrc;
    },
    SET_LIGHT_BOX_VISIBILITY(state, visibility) {
      state.isLightBoxVisible = visibility;
    },
  }
}
