import {SET_TREE} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    tree: [],
  },
  getters: {
    breadCrumbItems(state, getters, rootState) {
      let parents = rootState.lesson.lesson.trnLsnFrontPath.split('/');
      parents.splice(0, 1);
      let cursor = state.tree;
      let path = "";
      let result = [];
      let finish = false;

      parents.forEach(function (val, idx) {
        path += "/" + val;
        let foundCat = cursor.find(item => item.trnCatFrontPath && item.trnCatFrontPath === path);
        if (foundCat !== undefined) {
          result.push({
            title: foundCat.trnCatTitle,
            path: foundCat.trnCatFrontPath
          });
          if (idx === parents.length - 2)
            cursor = foundCat.lessons;
          else
            cursor = foundCat.categories;
        } else if (idx === parents.length - 1) {
          let foundLsn = cursor.find(item => item.trnLsnFrontPath && item.trnLsnFrontPath === path);
          if (foundLsn !== undefined) {
            result.push({
              title: foundLsn.trnLsnTitle,
              path: foundLsn.trnLsnFrontPath
            });
            finish = true;
          }
        }
      });
      return finish === true ? result : false;
    },
    getLessonFromPath:
      state => lessonPath => {
        let parents = lessonPath.split('/');
        parents.splice(0, 1);
        let cursor = state.tree;
        let path = "";
        let foundLsn = undefined;

        parents.forEach(function (val, idx) {
          path += "/" + val;
          let foundCat = cursor.find(item => item.trnCatFrontPath && item.trnCatFrontPath === path);
          if (foundCat !== undefined) {
            if (idx === parents.length - 2)
              cursor = foundCat.lessons;
            else
              cursor = foundCat.categories;
          } else if (idx === parents.length - 1) {
            foundLsn = cursor.find(item => item.trnLsnFrontPath && item.trnLsnFrontPath === path);
          }
        });
        return foundLsn;
      },
  },
  actions: {
    async fetchTree({commit}, payload) {
      return new Promise((resolve) => {
        payload.smp._call(undefined, "/ext/TrnTreeService?array=true", undefined, tree => {
          commit(SET_TREE, tree);
          resolve();
        });
      })
    },
  },
  mutations: {
    [SET_TREE](state, tree) {
      state.tree = tree;
    },
  },
}
