<template>
    <div id="homepage-container">
        <div id="headline">
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
                <h1 class="smp-light-purple">We built this site for you ! </h1>
            </div>
        </div>

        <!--<div class="button-container">
            <v-btn id="header-btn"  color="deep-purple" x-large @click="goToCourses()" >LET'S GO</v-btn>
        </div>-->

    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        props: {},
        data: () => ({
                colors: [
                    'indigo',
                    'warning',
                    'pink darken-2',
                    'red lighten-1',
                    'deep-purple accent-4',
                ],
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
            goToCourses() {
                this.$router.push('/courses')
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

    #headline {
        position: relative;
        width: 100%;
        margin-bottom: 30px;
    }
    .additional-information {
        position: absolute;
        left: 0;
        top: 0;
        width: 30%;
        height: 100%;
        background-color: rgba(255, 198, 60, .9);
        display: flex;
        align-content: center;
        justify-content: center;
    }
    .additional-information-wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: flex-end;
        height: 100%;
        padding: 10px;
    }
    .additional-information-title {
        font-size: 2em;
        text-align: right;
    }

    #content-wrapper {
        width: 80%;
        display: flex;
        flex-flow: column nowrap;
    }

    .button-container {
        align-self: center;
        position: absolute;
        bottom: 20px;
    }

    .homepage-subtitle {
        text-decoration-line: underline;
    }

    .action-btn {
        color: orange;
        font-size: 2em;
    }

</style>

<!--<div>
                <p>Discover Simplicité through the training platform</p>
            </div>-->

<!--<div class="button-container">
    <v-btn id="header-btn"  color="deep-purple" x-large @click="goToCourses()" >LET'S GO</v-btn>
</div>

<div id="site-description-container">
        <h2 class="homepage-subtitle">What's the purpose of this platform ?</h2>
        <p>To help you train in complete autonomy, so you can master Simplicité and build powerful applications
            for your
            company. </p>
        <h2 class="homepage-subtitle">How are we going to achieve it ?</h2>
        <p>Simplicité's team prepared several courses for you to become an expert, learning at your own pace.
            You're also going to practice your new skills with the exercices we created, where you'll be guided
            step by step
            to make sure you understand the platform.</p>
        <div class="button-container">
            <v-btn text class="action-btn" @click="goToCourses()">LET'S GO</v-btn>
        </div>
    </div>
-->
