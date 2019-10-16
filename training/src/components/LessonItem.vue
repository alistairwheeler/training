<template>
    <div id="course-list-wrapper">
        <div id="textual-content" class="col-6"  >
            <h1 id="lesson-title" class="lesson-title smp-blue" v-html="displayedLesson.title"></h1>
            <span>{{displayedLesson.row_id}}</span>
            <span>{{displayedLesson.courseName}}</span>
            <span>{{displayedLesson.courseId}}</span>
            <div id="learning-outcomes" >
               <h2 class="sub-part-title smp-coral">Learning Outcomes</h2>
                <div id="learning-outcomes-wrapper" v-html="displayedLesson.learningOutcomes"></div>
            </div>

            <div id="general-concepts">
                <h2 class="sub-part-title smp-coral">General Concepts : </h2>
                <div id="concepts-wrapper" v-html="displayedLesson.genConcepts"></div>

            </div>

            <div id="exercise">
                <h2 class="sub-part-title smp-coral">Exercise : </h2>
                <div id="exercise-wrapper" v-html="displayedLesson.exercise"></div>

            </div>
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

    class Lesson {
        constructor(row_id, title, genConcepts, learningOutcomes, exercise, pdfUrl, videoUrl, courseId, courseName ){
            this.row_id = row_id;
            this.title = title;
            this.genConcepts = genConcepts;
            this.learningOutcomes = learningOutcomes;
            this.exercise = exercise;
            this.pdfUrl = pdfUrl; this.videoUrl = videoUrl;
            this.courseId = courseId;
            this.courseName = courseName;
        }

        static formatFromBackEnd(smpLesson){
            return new Lesson(
                smpLesson.row_id,
                smpLesson.lrnLsnTitle,
                smpLesson.lrnLsnConcepts,
                smpLesson.lrnLsnLearningOutcomes,
                smpLesson.lrnLsnExercice,
                smpLesson.lrnLsnSlides,
                smpLesson.lrnLsnVideo,
                smpLesson.lrnLsnPrtId,
                smpLesson.lrnLsnPrtId__lrnPrtTitle,
            );
        }
    }

    export default {
        name: 'LessonPage',
        props: {},
        data() {
            return {/*
                lessonId: 0,
                courseId: '',
                courseName: '',
                lessonTitle: '',
                concepts:'',
                exercise:'',
                learningOutcomes:'',
                videoUrl:'',
                pdfAddress: '',*/
                displayedLesson: {},
             }
        },
        methods: {
            async getLesson(lessonId){
                return new Promise((resolve, reject)=> {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.get((response)=> {
                        if (response)
                            resolve(response);
                        else
                            reject("Could not load the lesson");
                    }, lessonId)
                })
            },
        },
        async mounted() {
              //  let result = this.getLessonData(this.$route.params.lessonId);
            let lesson = await this.getLesson(this.$route.params.lessonId);
            this.displayedLesson = Lesson.formatFromBackEnd(lesson);
        }

    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    /*PAGE */
    #course-list-wrapper {
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

