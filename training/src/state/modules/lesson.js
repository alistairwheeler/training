import {SET_LESSON, SET_LESSON_IMAGES, UNSET_LESSON} from "../mutation-types";

export default {
  namespaced: true,
  state: {
    lesson: {},
    lessonImages: [],
  },
  actions: {
    async fetchLesson({dispatch} , payload) {
      await dispatch("fetchLessonContent", payload);
      await dispatch("fetchLessonImages", payload);
    },
    async fetchLessonContent({commit}, payload) {
      return new Promise( (resolve) => {
        let lesson = payload.smp.getBusinessObject("TrnLesson");
        lesson.get(function () {
          commit(SET_LESSON, lesson.item);
          resolve();
        }, payload.lessonId);
      });
    },
    async fetchLessonImages({commit}, payload) {
      return new Promise((resolve, reject) => {
        let picture = payload.smp.getBusinessObject("TrnPicture");
        picture.search(function () {
          if (picture.list) {
            commit(SET_LESSON_IMAGES, picture.list.map(pic => ({
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
    unsetLesson({commit}) {
      commit(UNSET_LESSON);
    }
  },
  mutations: {
    [SET_LESSON](state, lesson) {
      state.lesson = lesson;
    },
    [SET_LESSON_IMAGES](state, images) {
      state.lessonImages = images;
    },
    [UNSET_LESSON](state) {
      state.lesson = {};
      state.lessonImages = [];
    },
  }
}
