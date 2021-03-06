<template>
  <header id="top-menu">
    <div class="menu-icon" @click="toggleMenu">
      <i class="material-icons menu-icon__image">menu</i>
    </div>
    <div class="logo" @click="goToHome"></div>
    <SearchBar ref="searchbaritem" class="search-bar" v-show="searchbarVisible"/>
    <nav class="header-buttons">
      <i id="previous-button" class="material-icons header-buttons__button" @click="arrowNavigationClicked(-1)"
         v-show="navigationArrowVisible">skip_previous</i>
      <i id="next-button" class="material-icons header-buttons__button" @click="arrowNavigationClicked(1)"
         v-show="navigationArrowVisible">skip_next</i>
      <a href="http://community.simplicite.io" target="_blank">
        <i id="forum" class="material-icons header-buttons__button">forum</i>
      </a>
      <a href="https://github.com/simplicitesoftware" target="_blank">
        <i id="github" class="material-icons header-buttons__button">code</i>
      </a>
    </nav>
  </header>
</template>

<script>
  import {mapGetters, mapState} from "vuex";
  import SearchBar from "./SearchBar";

  export default {
    name: "Header",
    data: () => ({
      searchbarVisible:true,
      navigationArrowVisible: false,
    }),
    components: {SearchBar},
    computed: {
      ...mapState({
        lesson: state => state.lesson.lesson,
        isDrawerOpen: state => state.ui.isDrawerOpen
      }),
      ...mapGetters({
        getLessonFromPath: 'tree/getLessonFromPath'
      }),
    },
    methods: {
      goToHome() {
        this.$router.push('/').catch(() => console.log('Navigation Duplicated'))
      },
      arrowNavigationClicked(direction){
        let path = '';
        if (direction === -1) path = this.getLessonFromPath(this.lesson.trnLsnFrontPath).trnLsnPrevious;
        if (direction === 1) path = this.getLessonFromPath(this.lesson.trnLsnFrontPath).trnLsnNext;
        if (path)
          this.$router.push('/lesson/' + path.toString().substring(1)).catch(err => console.error(err));
        else if (direction === -1) this.shakeElement("previous-button");
        else if (direction === 1) this.shakeElement("next-button");
      },
      toggleMenu() {
        this.$store.dispatch('ui/toggleDrawer');
      },
      shakeElement(elementId) {
        document.getElementById(elementId).classList.add("shaked");
        setTimeout(() => document.getElementById(elementId).classList.remove('shaked'), 150);
      },
    },
    created() {
      if (this.$router.currentRoute.name === 'Lesson') this.navigationArrowVisible = true
    },
    watch:{
      $route (to){
        this.navigationArrowVisible = to.name === 'Lesson';
      }
    },
  }
</script>

<style scoped lang="sass">
@import "../../assets/sass/variables"
@import "../../assets/sass/mixins"

header
  height: $header-height
  box-sizing: border-box
  width: 100%
  display: flex
  flex-flow: row
  flex: 0 1 0
  align-items: center
  padding: $header-padding
  background: linear-gradient(to right, $color-primary 40%, $color-secondary)
  color: white
  .logo
    background-image: url("../../../public/Logo_Simplicite_Noir.png")
    background-repeat: no-repeat
    background-size: contain
    z-index: 200
    width: $header-logo-width
    height: $header-logo-height
    margin: 5px 5px 5px 16px
    filter: invert(100%)
    &:hover
      cursor: pointer

  .menu-icon
    padding: $header-menu-icon-padding
    border-radius: 50px
    cursor: pointer
    display: flex
    align-items: center
    user-select: none
    &:hover
      background-color: transparentize(white, 0.9)
    &__image
      font-size: $header-menu-icon-size

  .header-buttons
    margin-left: auto
    display: flex
    align-items: center
    &__button
      margin-left: map-get($margins, small)
      padding: map-get($paddings, medium)
      border-radius: map-get($radius, x-large)
      color: white
      &:hover
        background-color: rgba(255, 255, 255, 0.1)
        cursor: pointer

  .shaked
    animation: headshake 100ms cubic-bezier(.4, .1, .6, .9)
    animation-iteration-count: 2

  .search-bar
    width: 50%

  @keyframes headshake
    0%
      background-color: $color-accent
      border: solid $color-accent
    25%
      transform: translateX(10%)
    75%
      transform: translateX(-10%)
</style>
