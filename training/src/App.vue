<template>
  <div class="app">
    <Header/>
    <main>
      <nav class="navigation-drawer" :class="[isDrawerOpen ? 'open' : '']">
        <TreeViewNode v-for="motherCategory in tree" :key="motherCategory.trnCatPath" :node="motherCategory" :depth="0"/>
      </nav>
      <div class="page-content">
        <router-view class="page-content__router-view" :key="$route.fullPath" v-if="tree.length"/>
      </div>
    </main>
  <transition name="light-box">
    <div class="light-box" v-show="isLightBoxVisible" :class="[isLightBoxVisible ? 'visible' : '']">
      <div class="light-box__overlay" @click="$store.dispatch('hideLightBox')"></div>
      <img class="light-box__image" :src="lightBoxImageSrc" alt="light-box image"/>
    </div>
  </transition>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import TreeViewNode from "./components/UI/TreeViewNode";
  import Header from "./components/UI/Header";

  export default {
    name: 'App',
    components: {Header, TreeViewNode},
    computed: {
      ...mapState(['tree', 'isDrawerOpen', 'lightBoxImageSrc', 'isLightBoxVisible']),
    },
    async beforeCreate() {
      await this.$smp.login();
      console.log('LOGGED IN');
    },
    async created() {
      await this.$store.dispatch('fetchTree', {smp: this.$smp});
    },
  };
</script>

<style lang="sass">
@import "assets/sass/variables"
@import "assets/sass/mixins"

*
  font-family: 'Source Sans Pro', sans-serif
  box-sizing: border-box
  margin: 0
  padding: 0
  outline: none

.app
  height: 100%
  display: flex
  flex-direction: column
  main
    flex: 1 1 // So the main content extends to the bottom of the page
    display: flex
    flex-direction: row
    width: 100%
    position: relative
    .navigation-drawer
      display: block
      width: 0
      height: 100%
      color: white
      background: linear-gradient($color-primary 40%, $color-secondary)
      transition: $duration-drawer-collapse ease-in-out
      &.open
        width: $drawer-width

    .page-content
      width: 100%
      &__router-view
        width: 100%
        height: 100%
        padding: map-get($paddings, medium)

.light-box
  position: absolute
  width: 100%
  height: 100%
  z-index: 10000
  &__overlay
    width: 100%
    height: 100%
    background-color: $light-box-overlay-background
    &:hover
      cursor: pointer
  &__image
    border-radius: map-get($radius, regular)
    max-width: 80%
    max-height: 80%
    position: absolute
    top: 10%
    left: 15%

.light-box-enter-active
  animation: lightBoxIn $light-box-duration-apparition
.light-box-enter-leave
  animation: lightBoxOut $light-box-duration-apparition
@keyframes lightBoxIn
  from
    opacity: 0
  to
    opacity: 1
@keyframes lightBoxOut
  from
    opacity: 1
  to
    opacity: 0
</style>

