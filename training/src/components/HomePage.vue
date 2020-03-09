<template>
        <div class="home-page-wrapper">
            <section class="branding">
            <img class="branding__logo" alt="Simplicité Software Logo" src="../../public/Logo_Simplicite_Noir.png"></section>
            <ul class="advantages">
                <li class="card orange"><h2 class="card__title">Bienvenue au Training Center</h2>
                    <p class="card__body">C'est ici que vous trouverez les ressources pour apprendre à vous servir de
                        Simplicité, et des applications que vous créerez avec. </p>
                    <div class="card__button">
                        <p>Learn more</p>
                        <i class="material-icons">arrow_forward</i>
                    </div>
                </li>
                <li class="card blue"><h2 class="card__title">Découvrez les profils utilisateurs de vos applications </h2>
                    <p class="card__body">
                        Découvrez les possibilités offertes par Simplicité à tous les utilisateurs
                        d'une application: Développeur, Exploitant, utilisateur
                    </p>
                    <div class="card__button">
                        <p>Learn more</p>
                        <i class="material-icons">arrow_forward</i>
                    </div>
                </li>
                <li class="card green"><h2 class="card__title">Certifications</h2>
                    <p class="card__body">
                        Click here to attempt one of our Simplicité certifications, to garanty your
                        expertise in building projects with the Simplicité platform</p>
                    <div class="card__button">
                        <p>Learn more</p>
                        <i class="material-icons">arrow_forward</i>
                    </div>
                </li>
            </ul>
            <!--<div class="row-1">
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
            </nav>-->
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

    .home-page-wrapper {
        /*@include flex-column-nowrap;
        align-items: center;*/
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .branding {
        width: $branding-width;
        &__logo {
            max-width: 100%;
        }
    }

    .advantages {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 98%-$branding-width;
        margin: 0;
    }

    .card {
        padding: map-get($paddings, large);
        border-radius: map-get($radius, regular);

        @include fillParent(100%, 30%);
        color: white;
        border: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &:hover {
            cursor: pointer;
        }

        &__title {
            margin: 0;
        }

        &__button {
            align-self: flex-end;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: map-get($paddings, small);
            border-radius: map_get($radius, regular);

            &:hover {
                background-color: $color-tree-hover;
            }

            p {
                padding-right: map-get($paddings, medium);
                margin: 0;
            }
        }

        &.orange {
            background-color: rgb(255,62,0);
        }
        &.blue {
            background-color: cornflowerblue;
        }
        &.green {
            background-color: forestgreen;
        }
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
            font-size: map-get($title-sizes, x-large)+1rem;
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
                    border-radius: map-get($radius, regular);;
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

