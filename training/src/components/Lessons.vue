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

            <ItemList itemType="lessons" :course-id="courseID"></ItemList>

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
        }),
        methods: {
            redirectToLesson(lessonId) {
                this.$router.push('/lessonItem/' + lessonId);
            },
        },
        async created() {
            //If the user wants the lessons from a specific course
            if (this.$route.params.courseId) {
                this.courseID = parseInt(this.$route.params.courseId);
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

    #lesson-list {
        display: flex;
        flex-flow: row wrap;
        box-sizing: border-box;
    }

    .item-prev {
        width: 33%;
        height: 18vw;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin-bottom: 24px;
        transform: scale(1);
        transition: transform 200ms;
    }

    .item-prev:hover {
        transform: scale(1.05);
        transition: transform 200ms;
    }

    .item-prev a {
        width: 100%;
        height: 100%;
        display: flex; /*Pas besoin de préciser la flex direction pcq le lien n'a qu'un enfant qui est .content-wrapper*/
        padding: 16px;
        text-decoration: none;
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;

    }

    .image-wrapper {
        width: 100%;
        height: 100%;

        box-sizing: border-box;
        margin-bottom: 8px;
    }

    .lesson-prev__image {
        width: 100%;
        height: 100%;
    }

    .information-wrapper {
        height: 30%;
    }

    .lesson-prev__section-name {
        font-weight: normal;
        font-size: 1.5rem;
    }

    .item-prev__name {
        font-size: 1.9rem;
        color: black;
    }

    .redirect-button {
        align-self: center;
    }
</style>
