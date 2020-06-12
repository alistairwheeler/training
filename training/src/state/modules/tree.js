export default {
  namespaced: true,
  state: {
    tree: [],
  },
  getters: {
    breadCrumbItems(state, getters, rootState) {
      let parents = rootState.lesson.currentLesson.trnLsnPath.split('/');
      parents.splice(0, 1);
      let cursor = state.tree;
      let path = "";
      let result = [];
      let finish = false;

      parents.forEach(function (val, idx) {
        path += "/" + val;
        let foundCat = cursor.find(item => item.trnCatPath && item.trnCatPath === path);
        if (foundCat !== undefined) {
          result.push({
            title: foundCat.trnCatTitle,
            path: foundCat.trnCatPath
          });
          if (idx === parents.length - 2)
            cursor = foundCat.lessons;
          else
            cursor = foundCat.categories;
        } else if (idx === parents.length - 1) {
          let foundLsn = cursor.find(item => item.trnLsnPath && item.trnLsnPath === path);
          if (foundLsn !== undefined) {
            result.push({
              title: foundLsn.trnLsnTitle,
              path: foundLsn.trnLsnPath
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
          let foundCat = cursor.find(item => item.trnCatPath && item.trnCatPath === path);
          if (foundCat !== undefined) {
            if (idx === parents.length - 2)
              cursor = foundCat.lessons;
            else
              cursor = foundCat.categories;
          } else if (idx === parents.length - 1) {
            foundLsn = cursor.find(item => item.trnLsnPath && item.trnLsnPath === path);
          }
        });
        return foundLsn;
      },
  },
  mutations: {
    UPDATE_TREE(state, tree) {
      state.tree = tree;
    },
  },
  actions: {
    async fetchTree({commit}, payload) {
      return new Promise((resolve) => {
        payload.smp._call(undefined, "/ext/TrnTreeService?array=true", undefined, tree => {
          commit('UPDATE_TREE', tree);
          resolve();
        });
      })
    },
  }
}
