<template>
  <div class="app">
    <Header/>
    <main>
      <nav class="navigation-drawer" v-show="isDrawerOpen" :class="[ isUserOnLesson ? 'on-lesson' : '']">
        <TreeViewNode v-for="(motherCategory, index) in tree" :key="index" :node="motherCategory" :depth="0"/>
      </nav>
      <div class="page-content">
        <router-view class="page-content__router-view" :key="$route.fullPath" v-if="tree.length"/>
      </div>
    </main>
    <LightBox/>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import Header from "./components/UI/Header";
  import LightBox from "./components/UI/LightBox";
  import TreeViewNode from "./components/UI/TreeViewNode";

  export default {
    name: 'App',
    components: {LightBox, Header, TreeViewNode},
    data: () => ({
      isUserOnLesson: false
    }),
    computed: {
      ...mapState({
        tree: state => state.tree.tree,
        isDrawerOpen: state => state.ui.isDrawerOpen
      })
    },
    async beforeCreate() {
      await this.$smp.login();
      console.log('LOGGED IN');
    },
    async created() {
      if (this.$router.currentRoute.name === 'Lesson') this.isUserOnLesson = true;
      await this.$store.dispatch('tree/fetchTree', {smp: this.$smp});
    },
    watch: {
      $route(to) {
        this.isUserOnLesson = to.name === 'Lesson';
      }
    },
  };
</script>

<style lang="sass">
  @import "assets/sass/variables"

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
        box-sizing: border-box
        min-width: max-content
        height: 100%
        z-index: 1000
        overflow: auto
        display: block
        background: linear-gradient($color-primary 40%, $color-secondary)
        transition: $duration-drawer-collapse ease-in-out

        &.on-lesson
          max-height: 100vh - $header-height

      .page-content
        width: 100%

        &__router-view
          width: 100%
          height: 100%

  .drawer-enter-active
    animation: drawerIn $duration-drawer-collapse

  .drawer-leave-active
    animation: drawerOut $duration-drawer-collapse

  @keyframes drawerIn
    from
      width: 0
    to
      width: $drawer-width

  @keyframes drawerOut
    from
      width: $drawer-width
    to
      width: 0

</style>
