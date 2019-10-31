<template>
    <div id="homepage-container">
        <!--<div id="headline">
            <v-carousel id="carousel" height="30vh" cycle interval="4000" hide-delimiters show-arrows-on-hover>
                <v-carousel-item v-for="(slide, i) in slides" :key="i" >
                    <v-img :src="slides[i].pictureUrl" alt="carousel image"> </v-img>
                </v-carousel-item>
            </v-carousel>

            <div class="additional-information">
                <div class="additional-information-wrapper">
                    <h2 class="additional-information-title text-white ">Welcome To</h2>
                    <h2 class="font-weight-bold text-white">Simplicité's Learning Center</h2>
                </div>
            </div>
        </div>

        <div id="content-wrapper">
            <div id="text-wrapper">
                <div id="courses-wrapper">
                    <v-card>
                        <v-card-text>Follow our courses</v-card-text>
                    </v-card>
                </div>
                <div id="documentation-wrapper">
                    <h1 class="section-title">find our documentation for developpers : </h1>
                </div>
            </div>
        </div>-->
        <div id="outer-div">
            <div class="row-1">
                <div id="video-wrapper">
                    <iframe src="https://player.vimeo.com/video/359243007"
                            width="712" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
                    </iframe>
                </div>
                <div id="text-container">
                    <h1 class="promotion-title">Simplicite Software Training Platform</h1>
                    <p class="promotion-text">
                        Learn to master the Simplicite platform to help your
                        company build powerful applications, at lightning speed.</p>

                       <p class="promotion-text"> This training will help you understand the basics of how
                        our platform works and teach you the good practices to
                        become a great application designer </p>

                    <v-btn class="try-button" x-large outlined link color="white" @click="redirectTo('/courses')">Try It </v-btn>

                </div>
            </div>
            <nav>
                <ul class="nav-links">
                    <li class="nav-item">
                        <v-btn x-large class="text-white" link color="#387ED1" @click="redirectTo('https://simplicite.fr/')">Discover our offers </v-btn>
                    </li>
                    <li>
                        <v-btn x-large class="text-white" link color="#387ED1" @click="redirectTo('https://docs.simplicite.io/')"> Read the Documentation</v-btn>
                    </li>
                    <li>
                        <v-btn x-large class="text-white" link color="#387ED1" @click="redirectTo('https://simplicite.fr/cas-clients/')">Watch Examples </v-btn>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        props: {},
        data: () => ({
                slides: [
                    {
                        name: 'first',
                        pictureUrl:'https://picsum.photos/510/300?random',
                    },
                    {
                        name: 'second',
                        pictureUrl:'https://picsum.photos/510/300?random',
                    },
                    {
                        name: 'third',
                        pictureUrl:'https://picsum.photos/510/300?random',
                    },
                    {
                        name: 'fourth',
                        pictureUrl:'https://picsum.photos/510/300?random',
                    },
                ],
        }),
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
       background-color: #168CFF;

    }

    #video-wrapper, #text-container {
        width: 50%;
    }
    #video-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
       /* background-color: cornflowerblue;

        */
    }
    #text-container {
        display: flex;
        flex-direction: column;
        color: white;
       /* background-color: mediumaquamarine;

        */
    }
    .promotion-title {
        font-size: 6em;
    }

    .promotion-text {
        font-size: 1.5em;
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
</style>

