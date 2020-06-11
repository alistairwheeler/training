export default {
  namespaced: true,
  state: {
    currentLesson: false,
    currentLessonImages: false,
  },
  actions: {
    async loadLesson(payload) {
      await this.dispatch("loadLessonContent", payload);
      await this.dispatch("loadLessonImages", payload);
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
    async loadLessonContent({commit}, payload) {
      return new Promise( (resolve) => {
        let lesson = payload.smp.getBusinessObject("TrnLesson");
        lesson.get(function () {
          commit('UPDATE_CURRENT_LESSON', lesson.item);
          resolve();
        }, payload.lessonId);
      });
    },
  },
  mutations: {
    UPDATE_CURRENT_LESSON(state, lesson) {
      state.currentLesson = lesson;
    },
    UPDATE_LESSON_IMAGES(state, images) {
      state.currentLessonImages = images;
    },
    UNLOAD_LESSON(state) {
      state.currentLesson = false;
      state.currentLessonImages = false;
    },
  }
}
