<template>
    <div id="course-list-wrapper">
        <div id="textual-content" class="col-6"  >
            <h1 id="lesson-title" class="lesson-title" v-html="lessonTitle"></h1>
            <span>{{lessonId}}</span>
            <span>{{courseName}}</span>
            <span>{{courseId}}</span>
            <div id="learning-outcomes" >
               <h2 class="sub-part-title">Learning Outcomes</h2>
                <div id="learning-outcomes-wrapper" v-html="learningOutcomes"></div>
            </div>

            <div id="general-concepts">
                <h2 class="sub-part-title">General Concepts : </h2>
                <div id="concepts-wrapper" v-html="concepts"></div>

            </div>

            <div id="exercise">
                <h2 class="sub-part-title">Exercise : </h2>
                <div id="exercise-wrapper" v-html="exercise"></div>

            </div>
        </div>

        <div id="support-content" class="col-6">
            <div id="pdf-container">
                <embed :src="pdfAddress" type="application/pdf" width="100%" height="100%">
            </div>

            <div id="video-container">
                <iframe width="100%" height="100%" :src="videoUrl"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
            </div>
        </div>

    </div>

</template>

<script>
    /* eslint-disable no-console,no-unused-vars,no-undef */


    export default {
        name: 'LessonPage',
        props: {},
        data() {
            return {
                lessonId: 0,
                courseId: '',
                courseName: '',
                lessonTitle: '',
                concepts:'',
                exercise:'',
                learningOutcomes:'',
                videoUrl:'',
                pdfAddress: '',
             }
        },
        methods: {
            getLessonData(lessonId){
                console.log('getLessonData');
                this.getLessonObject(lessonId)
                    .then((response)=>{
                        this.lessonId = response.row_id;
                        this.courseId = response.lrnLsnPrtId;
                        this.courseName = response.lrnLsnPrtId__lrnPrtTitle;
                        this.lessonTitle = response.lrnLsnTitle;
                        this.concepts = response.lrnLsnConcepts;
                        this.exercise = response.lrnLsnExercice;
                        this.learningOutcomes = response.lrnLsnLearningOutcomes;
                        this.videoUrl = response.lrnLsnVideo;
                        this.pdfAddress = response.lrnLsnSlides;
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            },

            getLessonObject(lessonId){
                console.log('getLessonObject');
                return new Promise((resolve, reject) => {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.get(function(response){
                        console.log(response);
                        resolve(response)
                    }, lessonId)
                })
            },
        },
        mounted() {
            let result = this.getLessonData(this.$route.params.lessonId);
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
        color: #387ED1;
    }

    .sub-part-title {
        font-size: 2em;
        color: #F08A7B ;
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

<!--
                <h3 class="gen-concept-subtitle">What is Simplicité® made for ?</h3>
                <p v-html="concepts"></p>
                <ul>
                    <li>Rights enforcements</li>
                    <li> Contextual constraintss</li>
                    <li>State model workflows</li>
                    <li>Activity workflows</li>
                </ul>
                <h3 class="gen-concept-subtitle">What is Simplicité® made for ?</h3>
                <p>The Simplicité® platform is composed of several components (see this document for details on the
                    platform’s
                    technical architecture)
                    The core component is the business engine which is responsible for running the configured business
                    models.
                    Based on what is processed by the engine, the platform offers various presentation/publication
                    layers:</p>
                <ul>
                    <li>A generic web user interface (UI) and its mobile web variant,</li>
                    <li>A generic webservices stack (WS) exposing JSON/REST and XML/SOAP services,</li>
                    <li>A generic HTTP based I/O integration interface that can be easily invoked from the command line
                        curl tool,
                    </li>
                    <li>A generic Git interface for configuration.</li>
                </ul>-->


<!--<ul id="lo-list">
                    <li class="lo-item">Understanding the Concept of Simplicité Platform</li>
                    <li class="lo-item">Determining if Simplicité is made for you and your team</li>
                </ul>-->

<!--
                <ol>
                    <li class="sl-number">
                        <h4 class="step-title">Create your first Project</h4>
                        <p>Open your instance of Simplicité® and login with your login and password.
                            Go in the design mode </p>
                    </li>
                    <li class="sl-number">
                        <h4 class="step-title">Create a Module</h4>
                        <p>Open your instance of Simplicité® and login with your login and password.
                            Go in the design mode </p>
                    </li>
                </ol>-->
