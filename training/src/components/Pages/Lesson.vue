<template>
  <div class="lesson">
    <div class="grid-lesson">
      <div id="lesson-content" class="grid-item grid-item-content">
        <div v-if="this.currentLesson.row_id" class="occupy100percent">
          <ul class="breadcrumb">
            <li class="breadcrumb__item" v-for="(breadCrumbItem, index) in this.breadCrumbItems" :key="index"
                @click="breadCrumbItemClicked(breadCrumbItem.path, index, breadCrumbItems.length)">
              <span>{{breadCrumbItem.title}}</span>
              <span class="breadcrumb__divider" v-if="index !== breadCrumbItems.length-1">></span>
            </li>
          </ul>
          <!-- <button id="toggle-scroll" class="toggle-scroll" @click="toggleScroll">Desactiver le scroll des slides</button>-->

          <div class="lesson_content" v-highlightjs @click.prevent="handleClickOnLessonContent"
               v-if="currentLesson.trnLsnHtmlContent"
               v-html="currentLesson.trnLsnHtmlContent"></div>
          <EmptyContent v-else/>
        </div>
        <Spinner v-else/>
      </div>

      <div class="grid-item grid-item-media">
        <Slider v-if="currentLessonImages.length" :slides="currentLessonImages" ref="slider"/>
        <EmptyContent v-else/>
      </div>
      <div class="grid-item grid-item-video">
        <div v-if="this.currentLesson" class="occupy100percent">
          <!-- Do NOT prelead anything to keep app snappy -->
          <video controls muted :src="videoUrl" preload="none" poster="../../../public/media.svg"
                 class="occupy100percent" style="object-fit: contain" v-if="videoUrl">
            Sorry, your browser doesn't support embedded videos.
          </video>
          <EmptyContent v-else/>
        </div>
        <Spinner v-else/>
      </div>
    </div>
  </div>
</template>

<script>
  /* eslint-disable no-console,no-unused-vars,no-undef */
  import Spinner from "../UI/Spinner";
  import EmptyContent from "../UI/EmptyContent";
  import {mapGetters, mapState} from "vuex";
  import Slider from "../UI/Slider";

  export default {
    name: "LessonItem",
    components: {Slider, Spinner, EmptyContent},
    data: () => ({
      urlList: [],
      lesson: false,
      scrollEnabled: true,
      alreadyScrolledImages: [],
    }),
    computed: {
      ...mapState(['tree', 'currentLesson', 'currentLessonImages']),
      ...mapGetters(["breadCrumbItems", "getLessonFromPath"]),
      videoUrl: function () {
        if (this.currentLesson && this.currentLesson.trnLsnVideo)
          return this.$smp.documentURL("TrnLesson", "trnLsnVideo", this.currentLesson.row_id, this.currentLesson.trnLsnVideo);
        else
          return false;
      },
    },
    methods: {
      handleClickOnLessonContent(event) {
        if (event && event.target && event.target.tagName === "A" && event.target.hasAttribute("href") && event.target.getAttribute("href").indexOf("#IMG_CLICK_") !== -1) {
          let imageName = event.target.getAttribute("href").split("#IMG_CLICK_")[1];
          this.$refs.slider.goTo(imageName);
        }
      },
      toggleScroll() {
        this.scrollEnabled = !this.scrollEnabled;
        document.getElementById("toggle-scroll").classList.toggle("off");
        if (this.scrollEnabled) {
          console.log("Scroll is enabled");
          document.getElementById("toggle-scroll").innerText = "Désactiver le scroll des slides"
        } else {
          document.getElementById("toggle-scroll").innerText = "Réactiver le scroll des slides";
          console.log("scroll is NOT enabled")
        }
      },
      addScrollListeners() {
        let potentialImages = [];
        document.getElementById("lesson-content").addEventListener('scroll', (e) => {
          let imageName = null;
          let links = e.target.querySelectorAll("a");
          /* How this feature works : we go through all the a tags of the lesson-content element with #IMG_SCROLL_ & if their lower boundary is
          at a certain fixed point, we tell the slider to go to this image
           */
          for (let i = 0; i < links.length; i++) {
            if (links[i].hasAttribute("href") && links[i].getAttribute("href").includes("#IMG_SCROLL_")) {
              if (links[i].getBoundingClientRect().bottom < e.target.getBoundingClientRect().bottom) {
                imageName = links[i].getAttribute("href").split("#IMG_SCROLL_")[1];
                if (imageName && !this.alreadyScrolledImages.includes(imageName)) { // We add the imageName to the list
                  potentialImages.push(imageName);
                  this.alreadyScrolledImages.push(imageName);
                }
              }
            }
          }
          // On affiche la dernière image dans le carousel
          if (potentialImages.length && this.scrollEnabled) this.$refs.slider.goTo(potentialImages[potentialImages.length - 1]);
        });
      }
    },
    async created() {
      let splitted = this.$router.currentRoute.path.split("lesson");
      let lessonPath = splitted[1] ? splitted[1] : "";
      let lesson = this.getLessonFromPath(lessonPath);
      if (!lesson)
        await this.$router.push('/404');
      else
        await this.$store.dispatch("loadLesson", {
          smp: this.$smp,
          lessonId: lesson.row_id
        });
    },
    mounted() {
      this.addScrollListeners();
    },
    async beforeDestroy() {
      this.$store.commit('UNLOAD_LESSON');
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
@import "../../assets/sass/utils/variables"
@import "../../assets/sass/utils/mixins"
.lesson
  position: relative

.breadcrumb
  border-bottom: $regular-thickness solid $light-grey
  background-color: white
  padding-bottom: 1em
  &__item
    text-transform: uppercase
    &:hover
      cursor: pointer
  &__divider
    margin: 0 $breadcrumb-margin 0 $breadcrumb-margin
    text-transform: uppercase

.grid-lesson
  position: absolute
  width: 100%
  height: 100%
  display: grid
  grid-template-columns: repeat(2, 50%)
  grid-template-rows: repeat(2, 50%)

.grid-item
  margin: 1em
  //padding: 0.5em
  background: white
  border-radius: map-get($radius, regular)
  @include box-shadow
  overflow: auto

.grid-item-content
  grid-column: 1
  grid-row: 1 / 3
  padding: 1em

.grid-item-media
  grid-column: 2
  grid-row: 1

.grid-item-video
  grid-column: 2
  grid-row: 2

.occupy100percent
  height: 100%
  width: 100%

video
  height: 100%
  width: 100%

/* ----- LESSON LESSON ----- */
.lesson-title
  color: $color-primary
  font-size: map-get($title-sizes, x-large) + 1rem
  font-weight: bold
  margin-top: map-get($margins, medium)

.lesson_content
  @include flex-column-nowrap
  overflow: hidden
  /* ::v-deep is used instead of >>> because we are using sass (with scss syntax). it is a deep selector to apply styles to the v-html content*/
  & ::v-deep .hljs.clean
    display: inline
    padding: 3px

  & ::v-deep h1
    font-size: map-get($title-sizes, x-large)

  & ::v-deep h2
    font-size: map-get($title-sizes, large)
    font-weight: bold
    color: $color-secondary

  & ::v-deep h3
    font-size: map-get($title-sizes, medium)
    font-weight: bold
    color: $color-secondary

  & ::v-deep h4
    font-size: map-get($title-sizes, small)
    color: $color-secondary

  & ::v-deep h5
    font-size: map-get($title-sizes, x-small)
    color: $color-secondary

  & ::v-deep h6
    font-size: map-get($title-sizes, x-small) - 0.1rem
    color: $color-secondary

  & ::v-deep p
    text-align: justify

  & ::v-deep .info,
  & ::v-deep .success,
  & ::v-deep .warning,
  & ::v-deep .error
    border-radius: map-get($radius, regular)
    padding: map-get($paddings, x-small)
    margin: map-get($margins, x-small)

  & ::v-deep .info
    background-color: $color-information !important

  & ::v-deep .success
    background-color: $color-success !important

  & ::v-deep .warning
    background-color: $color-warning !important

  & ::v-deep .error
    background-color: $color-error !important

  & ::v-deep blockquote > p::before
    content: '" '

  & ::v-deep blockquote > p::after
    content: ' "'

  & ::v-deep blockquote > p
    font-style: italic

  & ::v-deep strong
    text-decoration: underline

  & ::v-deep ol
    list-style-type: decimal
    padding-left: 25px //ol and ul require a certain amount of padding to display the style-type
    //The use of the reset style in app is still to keep though, because it doesn't provoke other issues

  & ::v-deep ul
    list-style-type: disc
    padding-left: 25px

  & ::v-deep img
    margin-left: $content-padding


.toggle-scroll
  border-radius: map-get($radius, x-large)
  padding: map-get($paddings, medium)
  background-color: white
  font-weight: bold
  color: green
  border: solid 2px $color-accent
  outline: none
  &.off
    border-color: red
    color: red
</style>
