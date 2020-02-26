<template>
  <div >
    <div class="grid-lesson">
      <div class="grid-item grid-item-content">
        <ul class="breadcrumb" v-if="this.hasCurrentLesson">
            <li class="breadcrumb__item" v-for="(item, index) in this.breadCrumbItems" :key="index"
                @click="breadCrumbItemClicked(item.path, index, breadCrumbItems.length)">
                <span>{{item.title}}</span>
                <span class="breadcrumb__divider" v-if="index !== breadCrumbItems.length-1">></span>
            </li>
        </ul>
        <div class="lesson_content" v-highlightjs v-if="this.currentLesson.trnLsnHtmlContent" v-html="this.currentLesson.trnLsnHtmlContent"></div>
      </div>

      <div class="grid-item grid-item-media">
        <Carousel v-bind:images="this.currentLessonImages" v-if="hasImages"/>
      </div>
      <div class="grid-item grid-item-video">
        <!-- Do NOT prelead anything to keep app snappy -->
        <video controls muted :src="videoUrl" preload="none" class="video" v-if="videoUrl">
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
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
    urlList: [],
    lesson: false
  }),
  computed: {
    ...mapGetters(["breadCrumb", "breadCrumbItems", "getLessonFromPath", "currentLesson", "currentLessonImages"]),
    openDrawer: function() {
      return this.$store.getters.drawerOpen;
    },
    breadCrumbItems2: function() {
      return this.breadCrumb(
        this.$router.currentRoute.path.split("lessonItem")[1]
      );
    },
    videoUrl: function(){
      if(this.currentLesson && this.currentLesson.trnLsnVideo)
        return this.$smp.documentURL("TrnLesson", "trnLsnVideo", this.currentLesson.row_id, this.currentLesson.trnLsnVideo);
      else
        return false;
    },
    hasImages: function(){
      return this.currentLessonImages.length > 0;
    },
    hasCurrentLesson: function(){
      return this.currentLesson;
    }
  },
  methods: {
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
    let lesson = this.getLessonFromPath(lessonPath);
    
    if(!lesson)
      this.$router.push('/404');
    else
      this.$store.dispatch("loadLesson", {
        smp: this.$smp,
        lessonId: lesson.row_id
      });
  },
  async beforeDestroy(){
    this.$store.commit('UNLOAD_LESSON');
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
  //padding: 0.5em;


}

.grid-item-content{
  grid-column: 1;
  grid-row: 1 / 3;
  padding: 1em;
}

.grid-item-media{
  grid-column: 2;
  grid-row: 1;
  border-radius: $media-containers;
  box-shadow: 0px 0px 9px 2px rgba(204,204,204,1);
}

.grid-item-video{
  grid-column: 2;
  grid-row: 2;
  border-radius: $media-containers;
  box-shadow: 0px 0px 9px 2px rgba(204,204,204,1);
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

/* ----- LESSON LESSON ----- */
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
