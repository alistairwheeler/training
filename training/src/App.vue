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
    computed: {
      ...mapState(['tree', 'isDrawerOpen']),
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
</style>

