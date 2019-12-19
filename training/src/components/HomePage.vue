<template>
    <div id="homepage-container">
        <div id="outer-div">
            <div class="row-1">
                <div id="video-wrapper">
                    <iframe src="https://player.vimeo.com/video/359243007"
                            width="712" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
                    </iframe>
                </div>
                <div id="heading">
                    <h1 class="heading__title">Simplicite Software Training Platform</h1>
                    <p class="heading__promotion">
                        Learn to master the Simplicite platform to help your company build <span class="green-text"> powerful applications</span>, at <span class="green-text"> lightning speed</span></p>

                       <p class="heading__promotion"> This training will help you understand the basics of how
                        our platform works and teach you the <span class="green-text"> good practices</span> to become a great application designer </p>

                    <v-btn class="try-button" x-large outlined link color="white" @click="redirectTo('/courses')">Try It </v-btn>

                </div>
            </div>
            <nav>
                <ul class="nav-links">
                    <li>
                        <v-btn x-large class="text-white" link color="#272635" @click="redirectTo('https://simplicite.fr/')">Discover our offers </v-btn>
                    </li>
                    <li>
                        <v-btn x-large class="text-white" link color="#272635" @click="redirectTo('https://docs.simplicite.io/')"> Read the Documentation</v-btn>
                    </li>
                    <li>
                        <v-btn x-large class="text-white" link color="#272635" @click="redirectTo('https://simplicite.fr/cas-clients/')">Watch Examples </v-btn>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        methods: {
            redirectTo(url) {
                window.location.href = url;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #homepage-container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .try-button {
        align-self: center;
        outline: none;
        margin-bottom: 15px;
    }

    #outer-div {
        display: flex;
        flex-flow: column nowrap;
       /* background-color: pink;
       */
        margin-top: 5vh;
    }

    .row-1 {
        display: flex;
        flex-flow: row;

    }

    #video-wrapper, #heading {
        width: 50%;
    }
    #video-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
       /* background-color: cornflowerblue;

        */
    }
    #heading {
        display: flex;
        flex-direction: column;
        color: #272635;;
       /* background-color: mediumaquamarine;

        */
    }
    .heading__title {
        font-size: 4rem;
    }

    .heading__promotion {
        font-size: 1.5rem;
    }

    nav {
        margin-top: 60px;
        width: 60%;
        align-self: center;
    }
    .nav-links {
        display: flex;
        flex-flow: row;justify-content: space-around;
    }

    .green-text {
        color: #5edbb6;
    }
</style>

