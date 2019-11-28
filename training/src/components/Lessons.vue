<template>
    <div id="lessons-wrapper">
        <div id="wrapper">
            <h1 id="page-title" class="smp-blue">Toutes les leçons disponibles :</h1>

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
                console.log("courseId : " +this.$route.params.courseId );
                this.courseID = parseInt(this.$route.params.courseId);
            } else if(this.$route.params.sectionId){
                console.log("sectionId : " +this.$route.params.sectionId );
                this.lessonsOrSections='sections';
                this.courseID = parseInt(this.$route.params.sectionId);
            } else { //If the user is wants to look at all the lessons
                this.courseID = 0;
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #lessons-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #wrapper {
        width: 80%;
        display: flex;
        flex-direction: column;
    }

    h1 {
        margin-top: 20px;
    }

    .item-prev a {
        width: 100%;
        height: 100%;
        display: flex; /*Pas besoin de préciser la flex direction pcq le lien n'a qu'un enfant qui est .content-wrapper*/
        padding: 16px;
        text-decoration: none;
    }


    .redirect-button {
        align-self: center;
    }
</style>
