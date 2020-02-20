<template>
  <div class="grid-lesson">
    <div class="grid-item grid-item-content">
      <ul class="breadcrumb">
          <li class="breadcrumb__item" v-for="(item, index) in this.breadCrumbItems" :key="index"
              @click="breadCrumbItemClicked(item.path, index, breadCrumbItems.length)">
              <span>{{item.title}}</span>
              <span class="breadcrumb__divider" v-if="index !== breadCrumbItems.length-1">></span>
          </li>
      </ul>
      <div class="lesson_content" v-highlightjs v-if="this.lessonToDisplay.content" v-html="this.lessonToDisplay.content"></div>
    </div>
    <div class="grid-item grid-item-media">
      <Carousel v-bind:images="urlList"/>
    </div>
    <div class="grid-item grid-item-video">
      <video controls muted class="video">
        <source src="http://dl5.webmfiles.org/big-buck-bunny_trailer.webm" type="video/webm" />
        Sorry, your browser doesn't support embedded videos.
      </video>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console,no-unused-vars,no-undef */
import Carousel from "./Carousel";
import { mapGetters } from "vuex";

export default {
  name: "LessonItem",
  components: {Carousel},
  data: () => ({
    lessonToDisplay: {},
    urlList: []
  }),
  computed: {
    ...mapGetters(["getLessonWithPath", "hierarchy", "breadCrumb"]),
    openDrawer: function() {
      return this.$store.getters.drawerOpen;
    },
    breadCrumbItems: function() {
      return this.breadCrumb(
        this.$router.currentRoute.path.split("lessonItem")[1]
      );
    }
  },
  methods: {
    displayLesson(contentItem) {
      this.lessonToDisplay.title = contentItem.title;
      this.lessonToDisplay.content = contentItem.content;
      this.lessonToDisplay.videoUrl = contentItem.videoUrl;
      this.$store.commit("UPDATE_DISPLAYED_LESSON_PATH", contentItem.path);
      let payload = {
        smp: this.$smp,
        lessonId: contentItem.row_id
      };
      this.$store
        .dispatch("fetchLessonsPictureURLs", payload)
        .then(urlList => (this.urlList = urlList))
        .catch(err => console.error(err));
    },

    breadCrumbItemClicked(categoryPath, index, length) {
      if (index !== length - 1) {
        this.$router
          .push("/courses/" + categoryPath)
          .catch(err => console.error(err));
      }
    }
  },
  async created() {
    let splitted = this.$router.currentRoute.path.split("lessonItem");
    let lessonPath = splitted[1] ? splitted[1] : "";
    let payload = {
      smp: this.$smp
    };

    this.$store.commit("UPDATE_DRAWER_OPEN", true);

    if (lessonPath !== "") {
      let contentItem = this.getLessonWithPath(lessonPath);
      if (contentItem !== undefined) {
        this.displayLesson(contentItem);
      } else {
        payload.itemPath = lessonPath;
        this.$store.dispatch("fetchLesson", payload).then(contentItem => {
          this.displayLesson(contentItem);
        });
      }
      this.$store
        .dispatch("fetchHierarchy", payload)
        .catch(err => console.error(err));
    } else {
      console.error("error on the path of the lesson" + lessonPath);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../assets/sass/utils/variables";
@import "../assets/sass/utils/mixins";

.grid-lesson {
  position: absolute;
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 50%);
}

.grid-item{
  margin: 1em;
  padding: 0.5em;
  overflow: scroll;
  box-shadow: 0px 0px 9px 2px rgba(204,204,204,1);
}

.grid-item-content{
  grid-column: 1;
  grid-row: 1 / 3;
  padding: 1em;
}

.grid-item-media{
  grid-column: 2;
  grid-row: 1;
}

.grid-item-video{
  grid-column: 2;
  grid-row: 2;
}

video{
  height: 100%;
  width: 100%;
}

.breadcrumb {
  border-bottom: $regular-thickness solid $light-grey;
  background-color: white;
  // margin: $breadcrumb-margin 0 $breadcrumb-margin 0;
  padding: 0.3em;

  &__item {
    text-transform: uppercase;

    &:hover {
      cursor: pointer;
    }
  }

  &__divider {
    margin: 0 $breadcrumb-margin 0 $breadcrumb-margin;
    text-transform: uppercase;
  }
}

/* ----- LESSON CONTENT ----- */
.lesson-title {
  color: $color-primary;
  font-size: nth($title-size, 1) + 1rem;
  font-weight: bold;
  margin-top: map-get($margins, medium);
}

.lesson_content {
  @include flex-column-nowrap;
  overflow: hidden;
  text-align: justify;

  & ::v-deep h1 {
    font-size: nth($title-size, 1);
  }

  & ::v-deep h2 {
    /* ::v-deep is used instead of >>> because we are using sass (with scss syntax). it is a deep selector to apply styles ot the v-html content*/
    font-size: nth($title-size, 2);
    font-weight: bold;
    color: $color-secondary;
  }

  & ::v-deep h3 {
    font-size: nth($title-size, 3);
    font-weight: bold;
    color: $color-secondary;
  }

  & ::v-deep h4 {
    font-size: nth($title-size, 4);
    color: $color-secondary;
  }

  & ::v-deep h5 {
    font-size: nth($title-size, 5);
    color: $color-secondary;
  }

  & ::v-deep h6 {
    font-size: nth($title-size, 6);
    color: $color-secondary;
  }

  & ::v-deep p {
    text-align: justify;
  }

  & ::v-deep .info,
  & ::v-deep .success,
  & ::v-deep .warning,
  & ::v-deep .error {
    border-radius: $regular-radius;
    padding: map-get($paddings, x-small);
    margin: map-get($margins, x-small);
  }

  & ::v-deep .info {
    background-color: $information !important;
  }

  & ::v-deep .success {
    background-color: $success !important;
  }

  & ::v-deep .warning {
    background-color: $warning !important;
  }

  & ::v-deep .error {
    background-color: $error !important;
  }

  & ::v-deep blockquote > p::before {
    content: '" ';
  }

  & ::v-deep blockquote > p::after {
    content: ' "';
  }

  & ::v-deep blockquote > p {
    font-style: italic;
  }

  & ::v-deep strong {
    text-decoration: underline;
  }

  & ::v-deep ol li {
    list-style: decimal;
  }

  & ::v-deep img {
    margin-left: $content-padding;
  }
}
</style>
