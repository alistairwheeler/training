/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import tree from "./modules/tree";
import lesson from "./modules/lesson";
import ui from "./modules/ui";

Vue.use(Vuex);

/* This Store is used to centralize the data of the app that is shared between the different components.
- The whole app is organized around a TreeView that is displayed in the navigation drawer of the app. This TreeView is
here for the user to navigate in the app.
- The state of the drawer is also controlled from this store because it can be changed from several components.
- The light-box isLightBoxVisible state and image src are also controlled from this store.
*/
export default new Vuex.Store({
  modules: {
    tree, lesson, ui
  },
});
