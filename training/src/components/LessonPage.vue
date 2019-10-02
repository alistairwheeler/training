<template>
    <div id="container">
        <div id="textual-content" class="col-6" @click="fetchPlaceHolderData">
            <h1 class="lesson-title">Lesson 1 : What is Simplicité ? </h1>
            <div id="learning-outcomes">
                <h2 class="sub-part-title">Learning Outcomes : </h2>
                <ul id="lo-list">
                    <li class="lo-item">Understanding the Concept of Simplicité Platform</li>
                    <li class="lo-item">Determining if Simplicité is made for you and your team</li>
                </ul>
            </div>

            <div id="general-concepts">
                <h2 class="sub-part-title">General Concepts : </h2>
                <h3 class="gen-concept-subtitle">What is Simplicité® made for ?</h3>
                <p>The Simplicité® platform offers you a wide range of generic mechanisms to dynamically run your
                    business models.
                    The configuration is data centric meaning that any business application configuration starts with
                    the configuration of
                    a logical data model. Then, on top of this data model, custom behaviors can be added: </p>
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
    import axios from 'axios';

    export default {
        name: 'LessonPage',
        props: {},
        data() {
            return {
                joke: '',
            }
        },
        methods: {
            async fetchPlaceHolderData(){
                let config = {
                    headers: {
                        'Accept': 'application/json'
                    }
                };
               const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1', config);
               console.log(response.data);
            }
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #container {
        display: flex;
    }

    #wrapper > div {
        height: 100%;
    }

    #textual-content {
        background-color: aliceblue;
        overflow: hidden;
    }

    #visual-content {
        position: fixed;
        right: 0;
        display: flex;
        flex-direction: column;
        background-color: beige;
        height: 100%;
    }

    #video-container {
        background-color: darkred;
        height: 40%;
        display: flex;
        align-items: center;
    }

    #pdf-container {
        justify-content: center;
        height: 45%;
        background-color: aqua;
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
