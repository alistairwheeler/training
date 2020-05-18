<template>
  <div class="node-wrapper">
    <div :style="indent" class="label-wrapper">
            <span v-if="node.trnCatTitle" class="node__label category" @click="handleClick(node)">
                <i class="material-icons">folder</i>
                {{node.trnCatTitle}}
            </span>
      <span v-else
            v-bind:class="[this.currentLesson.trnLsnPath === node.trnLsnPath ? 'active' : '', 'node__label']"
            @click="handleClick(node)">
                <i class="material-icons">menu_book</i>
                {{node.trnLsnTitle}}
            </span>
    </div>

    <div v-if="showChildren">
      <TreeViewNode v-for="subCat in node.categories" v-bind:key="subCat.trnCatPath" :node="subCat"
                    :depth="depth+1"/>
      <TreeViewNode v-for="lesson in node.lessons" v-bind:key="lesson.trnLsnPath" :node="lesson"
                    :depth="depth+1"/>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex';

  export default {
    props: ['node', 'depth'],
    name: "TreeViewNode",
    data: () => ({
      showChildren: true,
    }),
    computed: {
      indent() {
        return {transform: `translate(${this.depth * 20}px)`}
      },
      ...mapState(['currentLesson']),
    },
    methods: {
      handleClick(node) {
        if (node.trnCatPath)
          this.showChildren = !this.showChildren;
        else
          this.$router.push('/lesson' + node.trnLsnPath).catch(err => console.error(err))
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/sass/utils/variables";
  @import "../../assets/sass/utils/mixins";


  .node-wrapper {
    //Really important for global rendering. Otherwise, when the side menu is collapsed, the height of the menu
    //gets bigger than the page because the words in the treeview wrap
    overflow: hidden;
    white-space: nowrap;
  }

  .label-wrapper {
    overflow: hidden;

    .node__label {
      font-size: map-get($title-sizes, xx-small);
      display: flex;
      flex-direction: row;
      align-items: center;
      @include rounded-left-corners;
      padding: 8px;
      margin: 0;

      i {
        margin-right: map-get($margins, x-small);
      }

      &:hover {
        background-color: $color-tree-hover;
        cursor: pointer;
      }

      &.active {
        background-color: $color-tree-hover;
        color: white;

        i {
          color: #4D515C;
        }

      }

      &.active:hover {
        background-color: $color-tree-hover;
      }
    }
  }

</style>
