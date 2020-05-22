<template>
  <div class="tree">
    <p :style="indent" @click="nodeClicked(node)" class="tree__root-label"
       :class="[currentLesson.trnLsnPath && currentLesson.trnLsnPath === node.trnLsnPath ? 'active' : '']">
      <i v-if="node.trnCatPath" class="material-icons">folder</i>
      <i v-else class="material-icons">menu_book</i>
      {{node.trnCatTitle || node.trnLsnTitle}}
    </p>

    <div v-if="showChildren" class="tree__subtree">
      <TreeViewNode v-for="(subCategory, index) in node.categories" v-bind:key="index" :node="subCategory"
                    :depth="depth+1"/>
      <TreeViewNode v-for="(lesson, index) in node.lessons" v-bind:key="index" :node="lesson" :depth="depth+1"/>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex';

  export default {
    props: {
      node: {
        type: Object,
        required: true,
        default: () => ({}),
        note: 'The node object containing the node\'s information and children nodes',
      },
      depth: {
        type: Number,
        required: true,
        default: 0,
        note: 'The depth of the node, to create the space before the node',
      },
    },
    name: "TreeViewNode",
    data: () => ({
      showChildren: true,
    }),
    computed: {
      ...mapState(['currentLesson']),
      indent() {
        if (!this.depth) return {'padding-left': `10px`};
        return {'padding-left': `${this.depth * 20}px`}
      },
    },
    methods: {
      nodeClicked(node) {
        if (node.trnCatPath) this.showChildren = !this.showChildren;
        else this.$router.push('/lesson' + node.trnLsnPath).catch(err => console.error(err))
      },
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../assets/sass/variables"
  @import "../../assets/sass/mixins"

  .tree
    //Really important for global rendering. Otherwise, when the side menu is collapsed, the height of the menu
    //gets bigger than the page because the words in the treeview wrap
    overflow: hidden
    white-space: nowrap
    margin: $tree-margin-node

  .tree__root-label
    box-sizing: border-box
    width: 100%
    font-size: map-get($title-sizes, xx-small)
    font-weight: lighter
    display: flex
    flex-direction: row
    align-items: center
    padding: $tree-padding-node
    margin: 0
    @include rounded-right-corners($tree-border-radius, $tree-border-radius)

    &:hover
      background-color: $color-tree-hover
      cursor: pointer

    &.active
      background-color: $color-tree-hover

    i
      margin-right: map-get($margins, x-small)
</style>
