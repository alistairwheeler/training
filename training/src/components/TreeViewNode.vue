<template>
    <div class="node" v-bind:class="{ active: isActive}">
        <h3 class="node__text" :style="indent" @click="toggleChildren(node)" v-if="node.trnCatTitle">
            {{node.trnCatTitle}}</h3>
        <h3 class="node__text" :style="indent" @click="toggleChildren(node)" v-else>{{node.trnLsnTitle}}</h3>
        <div v-if="showChildren">
            <TreeViewNode v-for="subCat in node.categories" v-bind:key="subCat.trnCatPath" :node="subCat"
                          :depth="depth+1"/>
            <TreeViewNode v-for="subCat in node.lessons" v-bind:key="subCat.trnLsnPath" :node="subCat"
                          :depth="depth+1"/>
            <!--<TreeViewLesson v-if="showChildren" :lessons="node.lessons" :depth="depth+1"/>-->
        </div>
    </div>


</template>

<script>

    import {mapGetters} from "vuex";

    export default {
        props: ['node', 'depth'],
        name: "TreeViewNode",

        data: () => ({
            showChildren: true,
            isActive: false,
        }),
        created() {
            if (this.currentLesson.trnLsnPath)
                this.isActive = this.node.trnLsnPath !== undefined && this.node.trnLsnPath === this.currentLesson.trnLsnPath;
            else
                this.isActive = false

            if (this.currentLesson.trnLsnPath)
                this.showChildren = this.currentLesson.trnLsnPath.includes(this.node.trnLsnPath) || this.currentLesson.trnLsnPath.includes(this.node.trnCatPath);
            else
                this.showChildren = false
        },
        computed: {
            indent() {
                return {transform: `translate(${this.depth * 50}px)`}
            },
            ...mapGetters([
                'currentLesson',
                'tree',
            ])
        },
        methods: {
            toggleChildren(node) {
                if (node.trnCatPath)
                    this.showChildren = !this.showChildren;
                else
                    this.$router.push('/lessonItem' + node.trnLsnPath).catch(err => console.error(err))
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/sass/utils/variables";

    .node {
        border-bottom-right-radius: $radius-tree-element;
        border-top-right-radius: $radius-tree-element;
    }

    .node__text {

        &:hover {
            border-bottom-right-radius: $radius-tree-element;
            border-top-right-radius: $radius-tree-element;
            background-color: rgba(255, 255, 255, 0.1);
            cursor: pointer;
        }
    }

    .active {
        background-color: red;
    }
</style>
