<template>
    <div>
            <span @click="navigateToLesson(lesson.trnLsnPath)" :style="indent" v-for="lesson in lessons" v-bind:key="lesson.trnLsnPath" class="lesson" >
                {{lesson.trnLsnTitle}}
            </span>
    </div>
</template>

<script>
    export default {
        props: [ 'lessons', 'depth' ],
        name: "TreeViewLesson",
        computed: {
            indent() {
                return { transform: `translate(${this.depth * 50}px)` }
            }
        },
        methods: {
            navigateToLesson(path) {
                this.$router.push('/lessonItem' + path).catch(err => console.error(err))
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/sass/utils/variables";

    .lesson {
        display: block;
        font-size: 1.3rem;
        height: 100%;
        border-bottom-right-radius: $radius-tree-element;
        border-top-right-radius: $radius-tree-element;

        &:hover {
            border-bottom-right-radius: $radius-tree-element;
            border-top-right-radius: $radius-tree-element;
            background-color: rgba(255, 255, 255, 0.1);
            cursor: pointer;
         }
    }
</style>
