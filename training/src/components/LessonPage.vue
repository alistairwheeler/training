<template>
    <div id="page-wrapper">
        <div id="textual-content" class="col-6"  >
            <h1 id="lesson-title" class="lesson-title"> {{lessonTitle}}</h1>
            <div id="learning-outcomes">

               <h2 class="sub-part-title">Learning Outcomes :</h2>
               <ul id="lo-list">
                    <li class="lo-item">Understanding the Concept of Simplicité Platform</li>
                    <li class="lo-item">Determining if Simplicité is made for you and your team</li>
                </ul>
            </div>

            <div id="general-concepts">
                <h2 class="sub-part-title">General Concepts : </h2>
                <h3 class="gen-concept-subtitle">What is Simplicité® made for ?</h3>
                <p>{{lessonConcepts}}</p>
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
                </ul>
            </div>

            <div id="how-to">
                <h2 class="sub-part-title">Your turn Now ! </h2>
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
                </ol>
            </div>
        </div>

        <div id="visual-content" class="col-6">
            <div id="pdf-container">
                <embed :src="pdfAddress" type="application/pdf" width="100%" height="100%">
            </div>
            <div id="video-container">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/GQaC561iSUo"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
            </div>
        </div>

    </div>

</template>

<script>
    /* eslint-disable no-console */


    export default {
        name: 'LessonPage',
        props: {},
        data() {
            return {
                pdfAddress: 'http://www.africau.edu/images/default/sample.pdf',
                displayedLesson: {
                    title: 'placeHolder',
                    concepts:'placeHolder',
                    exercice: 'placeHolder'
                },
                lessonTitle: '',
                lessonConcepts:'concept',
                lessonExercice:'exercice',
            }
        },
        methods: {
            writeLessonIntoPage(title, concepts, exercice){
                this.lessonTitle = title;
                this.lessonConcepts = concepts;
                this.lessonExercice = exercice;
            },
            getLessonContent() {
                let rowId = 1;
                let app = new Simplicite.Ajax('https://maxime.dev.simplicite.io', 'api', 'designer', 'simplicite');
                let lessonObject = app.getBusinessObject("LrnLesson");
                lessonObject.get(function(response){
                    console.log(response)
                    let result = {
                        title: response.lrnLsnTitle,
                        concepts: response.lrnLsnConcepts,
                    }
                    console.log("Result = "+result.title)
                    //return result;
                }, rowId);
                //console.log("Result = "+result.title) ==> ne peut pas etre vu pcq result n'est pas visible hors du scope de la foonction get
            },
        },
        mounted() {
            let result = this.getLessonContent();
            console.log('Result title = '+result.title);
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #page-wrapper {
        display: flex;
    }

    #wrapper > div {
        height: 100%;
    }

    #textual-content {
        /*background-color: aliceblue;*/
        overflow: hidden;
    }

    #learning-outcomes {

    }

    #visual-content {
        position: fixed;
        right: 0;
        display: flex;
        flex-direction: column;
       /* background-color: beige; */
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
        color: #514FBF;
    }

    .sub-part-title {
        font-size: 1.5em;
        color: black;
    }

    .gen-concept-subtitle {
        font-size: 1em;
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
