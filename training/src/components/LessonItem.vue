<template>
    <div id="lesson-item-wrapper">
        <div id="textual-content" class="col-6">
            <h1 id="lesson-title" class="lesson-title smp-purple" v-html="displayedLesson.title"></h1>
            <div id="learning-outcomes">
                <h2 class="sub-part-title smp-coral">Learning Outcomes</h2>
                <div id="learning-outcomes-wrapper" v-html="displayedLesson.learningOutcomes"></div>
            </div>

            <div id="general-concepts">
                <h2 class="sub-part-title smp-coral">General Concepts : </h2>
                <div id="concepts-wrapper" v-html="displayedLesson.genConcepts"></div>

            </div>

            <div id="exercise" @click="changeCurrentId()">
                <h2 class="sub-part-title smp-coral">Exercise : </h2>
                <div id="exercise-wrapper" v-html="displayedLesson.exercise"></div>
            </div>
            <button @click="goToStupid">Go To Stupid</button>
        </div>

        <div id="support-content" class="col-6">
            <div id="pdf-container">
                <embed :src="displayedLesson.pdfUrl" type="application/pdf" width="100%" height="100%">
            </div>

            <div id="video-container">
                <iframe width="100%" height="100%" :src="displayedLesson.videoUrl"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
            </div>
        </div>

    </div>

</template>

<script>
    /* eslint-disable no-console,no-unused-vars,no-undef */

    import {Lesson} from "../Models/Lesson";

    export default {
        name: 'LessonItem',
        data: function() {
            return {
                displayedLesson: {},
                currentLessonId: 1,
                nextLessonId: 1,
                previousLessonId: 2,
            }
        },
        methods: {
            async getLesson(lessonId) {
                return new Promise((resolve, reject) => {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.get((response) => {
                        if (response)
                            resolve(response);
                        else
                            reject("Could not load the lesson");
                    }, lessonId)
                })
            },
            async getNextLessonId() {
                //Fetch the next lesson from the same course
                let nextLessonId = 2;
                //Then load it :
                let lesson = await this.getLesson(nextLessonId);
                this.displayedLesson = Lesson.formatFromBackEnd(lesson)
            },
            async getPreviousLessonId(currentLessonId) {
                // Fetch the previous lesson ID from the same course
                let previousLessonId = 0;
                //Then load it :
                let lesson = await this.getLesson(previousLessonId);
                this.displayedLesson = Lesson.formatFromBackEnd(lesson);
            },
            changeCurrentId(){
                this.currentLessonId++;
                this.$store.commit('updateCurrentLessonId', this.currentLessonId)
                console.log(this.currentLessonId, this.$store.state.currentLessonId)
            },
            goToStupid(){
                this.$router.push('/Stupid')
            }
        },
        async created() {
            console.log("LessonItem CREATED");
            let lesson = await this.getLesson(this.$route.params.lessonId);
            this.displayedLesson = Lesson.formatFromBackEnd(lesson);
            console.log("lesson has finished fetched")
        },
        async mounted() {
            console.log("LessonItem MOUNTED");
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    /*PAGE */
    #lesson-item-wrapper {
        display: flex;
    }

    #learning-outcomes, #general-concepts, #exercise {
        display: flex;
        flex-flow: column nowrap;
    }

    #textual-content {
        display: flex;
        flex-flow: column nowrap;
        overflow: hidden;
    }

    #support-content {
        position: fixed;
        right: 0;
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    #video-container {
        height: 40%;
        display: flex;
        align-items: center;
    }

    #pdf-container {
        justify-content: center;
        height: 45%;
        margin-bottom: 3%;
    }

    .lesson-title {
        font-size: 2em;
    }

    .sub-part-title {
        font-size: 2em;
    }

    .gen-concept-subtitle {
        font-size: 0.8em;
    }

    .step-title {
        color: black;
        font-size: 1em;
    }

    .sl-number {
        font-size: 1em;
        color: black;
    }


</style>

