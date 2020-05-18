<template>
    <div class="app">

        <div id="top-menu">
            <div id="hamburger" class="hamburger open" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="simplicite-logo" @click="goToHome"></div>
            <div class="controls">
                <i id="previous-button" class="material-icons control" @click="goToPreviousLesson()"
                   v-show="checkIfLessonDisplayed()">skip_previous</i>
                <i id="next-button" class="material-icons control" @click="goToNextLesson()"
                   v-show="checkIfLessonDisplayed()">skip_next</i>
                <a href="http://community.simplicite.io" target="_blank">
                    <i id="forum" class="material-icons control">forum</i>
                </a>
                <a href="https://github.com/simplicitesoftware" target="_blank">
                    <i id="github" class="material-icons control">code</i>
                </a>
            </div>
        </div>

        <div id="main-section">
            <aside id="aside" class="side-menu open">
                <TreeViewNode v-for="motherCat in this.tree" :key="motherCat.trnCatPath" :node="motherCat" :depth="0"/>
            </aside>

            <main id="main">
                <router-view id="router" :key="$route.fullPath" v-if="this.tree.length > 1"/>
            </main>
        </div>
        <div class="popup" :class="{ active: this.popup }">
            <div class="overlay" @click="togglePopUp"></div>
            <img class="popup__image" :src="currentPopUpImage"/>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import {mapGetters, mapState} from "vuex";
    import TreeViewNode from "./components/UI/TreeViewNode";

    export default {
        name: 'App',
        components: {
            TreeViewNode,
        },
        computed: {
            ...mapGetters(['getLessonFromPath']),
            ...mapState(['tree', 'currentLesson', 'drawerOpen', 'currentPopUpImage', 'popup'])
        },
        methods: {
            goToNextLesson() {
                const nextPath = this.getLessonFromPath(this.currentLesson.trnLsnPath).trnLsnNext;
                console.log(nextPath)
                if (nextPath !== null && nextPath !== undefined && nextPath !== "" && nextPath !== "null")
                    this.$router.push('/lessonItem/' + nextPath.toString().substring(1)).catch(err => console.error(err));
                 else
                    this.shakeElement("next-button");

            },
            goToPreviousLesson() {
                const previousPath = this.getLessonFromPath(this.currentLesson.trnLsnPath).trnLsnPrevious;
                console.log(previousPath)
                if (previousPath !== "" && previousPath !== undefined && previousPath !== "null" && previousPath !== null)
                    this.$router.push('/lessonItem/' + previousPath.toString().substring(1));
                else
                    this.shakeElement("previous-button");
            },
            goToHome() {
                this.$router.push('/').catch(() => console.log('Navigation Duplicated'));
            },
            checkIfLessonDisplayed() {
                return this.$router.currentRoute.path.split("/lessonItem/").length > 1;
            },
            toggleMenu() {
                document.getElementById("aside").classList.toggle("open");
                document.getElementById("hamburger").classList.toggle("open");
            },
            shakeElement(elementId) {
                document.getElementById(elementId).classList.add("shaked");
                setTimeout(() => document.getElementById(elementId).classList.remove('shaked'), 150);
            },

            togglePopUp() {
                document.getElementsByClassName("popup")[0].classList.toggle("active");
                this.$store.commit('UPDATE_POP_UP_STATE', false);
            },
        },

        async beforeCreate() {
            await this.$smp.login();
            console.log('LOGGED IN');
        },

        async created() {
            await this.$store.dispatch('fetchTree', {smp: this.$smp});
        },
    };
</script>

<style lang="scss">

    @import "assets/sass/utils/variables";
    @import "assets/sass/utils/mixins";

    .image {
        width: 400px;
        max-width: 100%;
    }

    * {
        outline: 0;
        font-family: 'Source Sans Pro', sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    .app {
        height: 100%;
        display: flex;
        flex-direction: column;

        #top-menu {
            width: 100%;
            display: flex;
            flex-flow: row;
            flex: 0 1 0;
            align-items: center;
            padding: 8px;
            background: linear-gradient(to right, $color-primary 40%, $color-secondary);
            color: white;

            .hamburger {
                width: $burger-width;
                height: $burger-height;
                position: relative;
                transition: .5s ease-in-out;
                cursor: pointer;

                span {
                    display: block;
                    position: absolute;
                    height: 6px;
                    width: 100%;
                    background: white;
                    border-radius: 9px;
                    left: 0;
                    //transform: rotate(0deg);
                    transition: $duration-drawer-collapse ease-in-out;

                    &:nth-child(1) {
                        top: 0px;
                    }

                    &:nth-child(2) {
                        top: 12px;
                    }

                    &:nth-child(3) {
                        top: 24px;
                    }
                }

                &.open {
                    span:nth-child(1) {
                        top: 12px;
                        transform: rotate(135deg);
                    }

                    span:nth-child(2) {
                        opacity: 0;
                        left: -60px;
                    }

                    span:nth-child(3) {
                        top: 12px;
                        transform: rotate(-135deg);
                    }
                }
            }

            .controls {
                margin-left: auto;
                display: flex;
                align-items: center;

                .control {
                    margin-left: map-get($margins, small);
                    padding: map-get($paddings, medium);
                    border-radius: map-get($radius, x-large);
                    color: white;

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                        cursor: pointer;
                    }
                }
            }

            .simplicite-logo {
                background-image: url("../public/Logo_Simplicite_Noir.png");
                background-repeat: no-repeat;
                background-size: contain;
                z-index: 200;
                width: 20%;
                height: $logo-height;
                margin: 5px 5px 5px 16px;
                filter: invert(100%);

                &:hover {
                    cursor: pointer;
                }
            }

            .shaked {
                animation: headshake 100ms cubic-bezier(.4, .1, .6, .9);
                animation-iteration-count: 2;
            }

            @keyframes headshake {
                0% {
                    background-color: $color-accent;
                    border: solid $color-accent;
                }
                25% {
                    transform: translateX(10%);
                }
                75% {
                    transform: translateX(-10%);
                }
            }

        }

        #main-section {
            flex: 1 1; //So the main content extends to the bottom of the page
            display: flex;
            flex-direction: row;
            width: 100%;
            position: relative;

            aside {
                display: block;
                width: 0px;
                height: 100%;
                color: white;
                background: linear-gradient($color-primary 40%, $color-secondary);
                transition: $duration-drawer-collapse ease-in-out;

                &.open {
                    width: $drawer-width;
                }
            }

            main {
                display: block;
                width: 100%;
                padding: map-get($paddings, medium);

                #router {
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

    a {
        color: black;

        &:visited {
            color: black;
            text-decoration: none;
        }
    }

    .popup {
        position: absolute;
        z-index: -10000;
        visibility: hidden;
        width: 100%;
        height: 100%;

        &.active {
            z-index: 1000;
            visibility: visible;
        }

        .overlay {
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.4);

            &:hover {
                cursor: pointer;
            }
        }

        &__image {
            border-radius: map-get($radius, regular);
            max-width: 80%;
            max-height: 80%;
            position: absolute;
            top: 10%;
            left: 15%;
        }
    }
</style>

