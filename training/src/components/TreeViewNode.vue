<template>
    <div>
        <div :style="indent" class="label-wrapper">
            <span v-if="node.trnCatTitle" class="node__label" @click="handleClick(node)">{{node.trnCatTitle}}</span>
            <span v-else
                v-bind:class="[this.currentLesson.trnLsnPath === node.trnLsnPath ? 'active' : '', 'node__label']"
                @click="handleClick(node)">{{node.trnLsnTitle}}
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
                    this.$router.push('/lessonItem' + node.trnLsnPath).catch(err => console.error(err))
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/sass/utils/variables";
    @import "../assets/sass/utils/mixins";


    .label-wrapper {
        color: white;

        .node__label {
            font-size: 1.3rem;
            display: block;
            @include rounded-right-corners;
            padding: 8px;
            margin: 0;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
                cursor: pointer;
            }

            &.active:hover {
                background-color: $color-active;
            }
        }

    }

    .active {
        background-color: $color-active;
    }

</style>
