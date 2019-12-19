<template>
    <div id="homepage-container">
        <div id="outer-div">
            <div class="row-1">
                <div id="video-wrapper">
                    <iframe src="https://player.vimeo.com/video/359243007"
                            width="712" height="400" frameborder="0" allow="autoplay; fullscreen" allowfullscreen>
                    </iframe>
                </div>
                <div class="heading">
                    <h1 class="heading__title">Simplicite Software Training Platform</h1>
                    <p class="heading__promotion">
                        Learn to master the Simplicite platform to help your company build <span class="highlighted"> powerful applications</span>, at <span class="highlighted"> lightning speed</span></p>

                       <p class="heading__promotion"> This training will help you understand the basics of how
                        our platform works and teach you the <span class="highlighted"> good practices</span> to become a great application designer </p>

                </div>
            </div>
            <nav>
                <ul class="__links">
                    <li>
                        <v-btn x-large class="text-white" link color="primary" @click="redirectTo('https://simplicite.fr/')">Discover our offers </v-btn>
                    </li>
                    <li>
                        <v-btn x-large class="text-white" link color="primary" @click="redirectTo('https://docs.simplicite.io/')"> Read the Documentation</v-btn>
                    </li>
                    <li>
                        <v-btn x-large class="text-white" link color="primary" @click="redirectTo('https://simplicite.fr/cas-clients/')">Watch Examples </v-btn>
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
<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";
    @import "../assets/sass/utils/mixins";

    #homepage-container {
        @include flex-column-nowrap;
        align-items: center;
    }

    #outer-div {
        @include flex-column-nowrap;
        margin-top: 5vh;
    }

    .row-1 {
        display: flex;
        flex-flow: row;
    }

    #video-wrapper, #heading {
        width: $homepage-dividing-width;
    }

    #video-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .heading {
        display: flex;
        flex-direction: column;
        color: $color-secondary;

        &__title {
            font-size: $h1-size+1rem;
        }

        &__promotion {
            font-size: 1.5rem;
            color: $light-black;
        }
    }

    nav {
        margin-top: $content-padding;
        width: 60%;
        align-self: center;

        .__links {
            display: flex;
            flex-flow: row;
            justify-content: space-around;
        }
    }

    .highlighted {
        color: $color-secondary;
    }
</style>

