<template>
    <div id="lessons-wrapper">
        <div id="wrapper">
            <h1 id="page-title">Toutes les leçons disponibles :</h1>

            <v-btn v-if="emptyList"
                   class="redirect-button ma-2"
                   outlined
                   color="#387ED1"
                   @click="this.$router.push('/courses')">
                Return to courses
            </v-btn>

            <ItemList :itemType="lessonsOrSections" :course-id="courseID"></ItemList>

        </div>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars,no-console */

    import ItemList from "./ItemList";

    export default {
        name: 'Lessons',
        components: {ItemList},
        data: () => ({
            displayedLessons: [],
            courseID: 0,
            emptyList: false,
            lessonsOrSections: 'lessons',
        }),
        methods: {
            redirectToLesson(lessonId) {
                this.$router.push('/lessonItem/' + lessonId);
            },
        },
        async created() {

            //If the user wants the lessons from a specific course
            if (this.$route.params.courseId) {
                //console.log("courseId : " +this.$route.params.courseId );
                this.courseID = parseInt(this.$route.params.courseId);
            } else if (this.$route.params.sectionId) {
                //console.log("sectionId : " +this.$route.params.sectionId );
                this.lessonsOrSections = 'sections';
                this.courseID = parseInt(this.$route.params.sectionId);
            } else { //If the user is wants to look at all the lessons
                this.courseID = 0;
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";
    @import "../assets/sass/utils/mixins";

    #lessons-wrapper {
        @include flex-column-nowrap;
        align-items: center;
    }

    #wrapper {
        @include flex-column-nowrap;
        width: 80%;
    }

    h1 {
        margin-top: 20px;
        color: $color-secondary;
    }

    .redirect-button {
        align-self: center;
    }
</style>
