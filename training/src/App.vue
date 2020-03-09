<template>
    <div class="app">

        <div id="top-menu">
            <div class="hamburger open" @click="toggleMenu">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="simplicite-logo" @click="navigateHome"></div>
            <div class="controls">
                <i id="previous-button" class="material-icons control" @click="navigateToPreviousLesson()"
                   v-show="checkIfRouteIsLesson()">skip_previous</i>
                <i id="next-button" class="material-icons control" @click="navigateToNextLesson()"
                   v-show="checkIfRouteIsLesson()">skip_next</i>
                <a href="http://community.simplicite.io" target="_blank">
                    <i id="forum" class="material-icons control">forum</i>
                </a>
                <a href="https://github.com/simplicitesoftware" target="_blank">
                    <i id="github" class="material-icons control">code</i>
                </a>
            </div>
        </div>

        <div id="main-content">
            <aside id="aside" class="side-menu">
                <TreeViewNode v-for="motherCat in this.tree" :key="motherCat.trnCatPath" :node="motherCat" :depth="0"/>
            </aside>

            <main id="main">
                <router-view id="content" :key="$route.fullPath" v-if="this.treeLoaded"/>
            </main>
<!--            <div id="side-menu" class="open">
                <TreeViewNode v-for="motherCat in this.tree" :key="motherCat.trnCatPath" :node="motherCat" :depth="0"/>
            </div>
            <router-view id="content" :key="$route.fullPath" v-if="this.treeLoaded"/>-->
        </div>
        <div class="overlay" @click="disableOverlay">overlay</div>
        <div class="popup">hello</div>
    </div>
</template>

<script>
    /* eslint-disable no-console */

    import {mapGetters, mapState} from "vuex";
    import TreeViewNode from "./components/TreeViewNode";

    export default {
        name: 'App',
        components: {
            TreeViewNode
        },
        computed: {
            ...mapGetters(['getLessonFromPath']),
            ...mapState(['tree', 'treeLoaded', 'treeAsVuetifyTree', 'currentLesson', 'drawerOpen'])
        },
        methods: {
            disableOverlay() {
                document.getElementsByClassName("overlay")[0].style.zIndex = '-1000';
            },
            toggleMenu() {
                /*document.getElementById("side-menu").classList.toggle("open");

                */

                document.getElementById("aside").classList.toggle("open");
                document.getElementsByClassName("hamburger")[0].classList.toggle("open");

            },
            checkIfRouteIsLesson() {
                return this.$router.currentRoute.path.split("/lessonItem/").length > 1;
            },
            navigateToNextLesson() {
                let nextPath = this.getLessonFromPath(this.currentLesson.trnLsnPath).trnLsnNext;
                console.log(`nextPath : ${nextPath}`);
                if (nextPath !== undefined && nextPath !== "null") {
                    let path = nextPath.toString().substring(1);
                    this.$router.push('/lessonItem/' + path).catch(err => console.error(err))
                } else {
                    this.shakeElement("next-button");
                    this.showMessage("Vous êtes à la dernière leçon de cette catégorie")
                }
            },
            navigateToPreviousLesson() {
                let previousPath = this.getLessonFromPath(this.currentLesson.trnLsnPath).trnLsnPrevious;
                console.log(`previousPath : ${previousPath}`);
                if (previousPath !== undefined && previousPath !== "null") {
                    let path = previousPath.toString().substring(1);
                    this.$router.push('/lessonItem/' + path)
                } else {
                    this.shakeElement("previous-button");
                    this.showMessage('Vous êtes à la première leçon de cette catégorie')
                }
            },
            navigateHome() {
                this.$router.push('/home')
                    .catch(() => console.log('Navigation Duplicated'));
            },
            shakeElement(elementId) {
                document.getElementById(elementId).classList.add("shaked");
                setTimeout(() => document.getElementById(elementId).classList.remove('shaked'), 150);

            },
            showMessage(message) {
                this.snbText = message;
                this.snackBar = true;
            },
        },
        async beforeCreate() {
            this.$smp.login(() => {
                console.log("LOGGED IN")
            });
        },
        async created() {
            this.$store.dispatch('fetchTree', {smp: this.$smp});
        },
    };
</script>

<style lang="scss">

    @import "assets/sass/utils/variables";
    @import "assets/sass/utils/mixins";

    * {
        @include no-padding-margin;
        list-style-type: none;
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
                    margin-left: 20px;
                    padding: 10px;
                    border-radius: 30px;

                    &:hover {
                        background-color: rgba(255, 255, 255, 0.1);
                        cursor: pointer;
                    }
                }
            }
        }

        #main-content {
            flex: 1 1;
            background-color: #00bcd4;
            display: flex;
            flex-direction: row;
            width: 100%;
            flex-grow: 1; //So the main content extends to the bottom of the page
            position: relative;

            aside {
                display: block;
                width: 0px;
                height: 100%;
                background-color: #399953;
                transition: $duration-drawer-collapse ease-in-out;

                &.open {
                    background-color: grey;
                    width: 300px;
                }
            }

            main {
                display: block;
                width: 100%;
                margin: 10px;
                background-color: #EF6565;
            }

            #side-menu {
                background: linear-gradient($color-primary 40%, $color-secondary);
                width: 0px;
                position: absolute;
                z-index: 1000;
                top: 0;
                bottom: 0;
                overflow: hidden;
                transition: $duration-drawer-collapse ease-in-out;
                color: rgba(0,0,0,0);
                white-space: nowrap;

                &.open {
                   width: 250px;
                   color: rgba(white, 1);
                }

            }
        }
    }

    a {
        color: white;
        &:visited {
            color: white;
            text-decoration: none;
        }
    }

    .simplicite-logo {
        background-image: url("../public/Logo_Simplicite_Noir.png");
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 200;
        width: 20%;
        height: $header-height;
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

    .popup {
        position: absolute;
        width: 40%;
        height: 20%;
        border-radius: $regular-radius;
        background-color: #4fc3f7;
        left: 50%-20%;
        top: 50%-10%;
        z-index: 1000;
    }

    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0, 0.2);
        z-index: 500;
    }
</style>
