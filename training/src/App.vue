<template>
  <div class="app">
    <Header/>

    <main>
      <nav class="navigation-drawer" :class="[isDrawerOpen ? 'open' : '']">
        <TreeViewNode v-for="motherCategory in tree" :key="motherCategory.trnCatPath" :node="motherCategory" :depth="0"/>
      </nav>
      <div class="page-content">
        <router-view class="page-content__router-view" :key="$route.fullPath" v-if="tree.length > 1"/>
      </div>
    </main>

    <div class="popup" :class="[isPopupVisible ? 'visible' : '']">
      <div class="popup__overlay" @click="disablePopUpImage"></div>
      <img class="popup__image" :src="currentPopupImageSrc" alt="popup image"/>
    </div>
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
      ...mapState(['tree', 'isDrawerOpen', 'currentPopupImageSrc', 'isPopupVisible']),
    },
    methods: {
      disablePopUpImage() {
        this.$store.commit('UPDATE_POP_UP_STATE', false);
      },
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

<style lang="scss">
  @import "assets/sass/utils/variables";
  @import "assets/sass/utils/mixins";

  * {
    font-family: 'Source Sans Pro', sans-serif;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
  }

  .app {
    height: 100%;
    display: flex;
    flex-direction: column;

    main {
      flex: 1 1; // So the main content extends to the bottom of the page
      display: flex;
      flex-direction: row;
      width: 100%;
      position: relative;

      .navigation-drawer {
        display: block;
        width: 0;
        height: 100%;
        color: white;
        background: linear-gradient($color-primary 40%, $color-secondary);
        transition: $duration-drawer-collapse ease-in-out;

        &.open {
          width: $drawer-width;
        }
      }

      .page-content {
        width: 100%;

        &__router-view {
          width: 100%;
          height: 100%;
          padding: map-get($paddings, medium);
        }
      }
    }
  }

  .popup {
    position: absolute;
    z-index: -10000;
    visibility: hidden;
    width: 100%;
    height: 100%;

    &.visible {
      z-index: 1000;
      visibility: visible;
    }

    &__overlay {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);

      &:hover {
        cursor: pointer;
      }
    }

    &__image {
      border-radius: map-get($radius, regular);
      max-width: 80%;
      max-height: 80%;
      position: absolute;
      top: 10%;
      left: 15%;
    }
  }
</style>

