<template>
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
                        Learn to master the Simplicite platform to help your company build <span class="highlighted"> powerful applications</span>,
                        at <span class="highlighted"> lightning speed</span></p>

                    <p class="heading__promotion"> This training will help you understand the basics of how
                        our platform works and teach you the <span class="highlighted"> good practices</span> to become
                        a great application designer </p>

                </div>
            </div>
            <nav>
                <ul class="nav-links">
                    <li><a href="https://simplicite.fr/" target="_blank">Discover our offers</a></li>
                    <li><a href="https://docs.simplicite.io/" target="_blank">Read the Documentation</a></li>
                    <li><a href="https://simplicite.fr/cas-clients/" target="_blank">Watch Examples</a></li>
                </ul>
            </nav>
        </div>
</template>

<script>

    export default {
        name: 'HomePage',
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";
    @import "../assets/sass/utils/mixins";

    #outer-div {
        @include flex-column-nowrap;
        align-items: center;
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
        margin: 3vh;
        display: flex;
        flex-direction: column;
        color: $color-secondary;

        &__title {
            font-size: nth($title-size, 1)+1rem;
        }

        &__promotion {
            font-size: 1.5rem;
            color: black;
        }
    }

    nav {
        width: 80%;
        align-self: center;

        .nav-links {
            display: flex;
            flex-flow: row;
            justify-content: space-around;
            box-sizing: border-box;

            li {
                a {
                    padding: 10px;
                    color: $color-primary;
                    font-size: 15px;
                    display: block;
                    border-radius: $regular-radius;
                    border: solid 1px $color-primary;

                    &:hover {
                        text-decoration: none;
                        background-color: lighten($color-primary, 60%);
                    }
                }
            }
        }
    }

    .highlighted {
        color: $color-secondary;
    }
</style>

