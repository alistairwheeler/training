<template>
    <div class="app">
        <!--<v-navigation-drawer app clipped dark class="navbg" v-model="this.drawerOpen">

            &lt;!&ndash;<v-treeview
                    v-if="this.treeAsVuetifyTree"
                    :items="this.treeAsVuetifyTree"
                    return-object
                    item-key="path"
                    activatable
                    color="white"
                    
                    @update:active="navigateToLesson"

                    open-all
                    open-on-click
                    @update:open="openUpdated"

                    shaped
                    dense >

                <template v-slot:prepend="{ item }">
                    <div class="tree-image">
                        <v-icon>
                            {{ item.type === "category" ? 'mdi-book-open-page-variant' : 'mdi-file-document-outline' }}
                        </v-icon>
                    </div>
                </template>
                <template v-slot:label="{ item }" >
                        <span v-if="item.name" class="tree-element__label"> {{item.name}} </span>
                </template>
            </v-treeview>&ndash;&gt;

            <div class="tree">
                <TreeViewNode v-for="motherCat in this.tree" :key="motherCat.trnCatPath" :node="motherCat" :depth="0"></TreeViewNode>
            </div>

        </v-navigation-drawer>
        <v-app-bar app dark class="app-bar-bg" clipped-left flat>
            <v-app-bar-nav-icon @click="openOrCloseDrawer"></v-app-bar-nav-icon>

            <v-toolbar-title id="toolbar-title" class="simplicite-logo" @click="navigateHome()"></v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-btn id="previous-button" v-show="checkIfRouteIsLesson()" fab icon @click="navigateToPreviousLesson()">
                <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn id="next-button" v-show="checkIfRouteIsLesson()" fab icon @click="navigateToNextLesson()">
                <v-icon>mdi-skip-next</v-icon>
            </v-btn>

            <v-btn fab icon class="btn-link" href="http://community.simplicite.io" target="_blank">
                <v-icon>mdi-forum</v-icon>
            </v-btn>

            <v-btn fab icon class="btn-link" href="https://github.com/simplicitesoftware" target="_blank">
                <v-icon>mdi-git</v-icon>
            </v-btn>

            &lt;!&ndash; <v-btn fab icon class="btn-link" href="https://hub.docker.com/u/simplicite/">
                <v-icon>mdi-docker</v-icon>
            </v-btn> &ndash;&gt;

            &lt;!&ndash;            <v-toolbar-items>
                            <v-btn text to="/courses">Cours</v-btn>
                        </v-toolbar-items>&ndash;&gt;

        </v-app-bar>-->

        <div id="top-menu">

            <div class="unicode-symbol" @click="switchMenu">&#9776;</div>

            <div class="unicode-symbol reverse" @click="navigateToPreviousLesson()">
                <span>&#9658;</span>
                <span class="unicode-symbol">&#10074; </span>
            </div>

            <div class="unicode-symbol" @click="navigateToNextLesson()">
                <span>&#9658;</span>
                <span>&#10074;</span>
            </div>


            <v-btn id="previous-button" v-show="checkIfRouteIsLesson()" fab icon
                   @click="navigateToPreviousLesson()">
                <v-icon>mdi-skip-previous</v-icon>
            </v-btn>

            <v-btn id="next-button" v-show="checkIfRouteIsLesson()" fab icon @click="navigateToNextLesson()">
                <v-icon>mdi-skip-next</v-icon>
            </v-btn>

            <v-btn fab icon class="btn-link" href="http://community.simplicite.io" target="_blank">
                <v-icon>mdi-forum</v-icon>
            </v-btn>

            <v-btn fab icon class="btn-link" href="https://github.com/simplicitesoftware" target="_blank">
                <v-icon>mdi-git</v-icon>
            </v-btn>

        </div>
        <div id="main-content">
            <div id="side-menu">
                <TreeViewNode v-for="motherCat in this.tree"
                              :key="motherCat.trnCatPath"
                              :node="motherCat"
                              :depth="0"/>
            </div>
            <router-view id="content" :key="$route.fullPath" v-if="$store.state.treeLoaded"/>
        </div>

        <!--<header class="top-menu">
            <div class="burger-button" @click="openSideMenu">&#9776;</div>
            <div class="controls">
            </div>
        </header>-->
        <!--<div class="content-wrapper">
            <div id="side-menu" class="side-menu visible">
                <div class="tree">
                    <TreeViewNode v-for="motherCat in this.tree"
                                  :key="motherCat.trnCatPath"
                                  :node="motherCat"
                                  :depth="0"/>
                </div>
            </div>
            <router-view id="content" class="content" :key="$route.fullPath" v-if="$store.state.treeLoaded"/>

            &lt;!&ndash; This makes the page reload when the url changes(check api doc for more info) &ndash;&gt;
            &lt;!&ndash;<v-snackbar id="snackbar" v-model="snackBar" :timeout="snbTimeOut">
                <span id="snb-text"> {{snbText}} </span>
                <v-btn color="#F08A7B" text @click="snackBar = false">FERMER</v-btn>
            </v-snackbar>&ndash;&gt;
        </div>-->
        <!-- Sizes your content based upon application components -->

    </div>
</template>

<script>
    /* eslint-disable no-console */

    import {mapGetters, mapState} from "vuex";
    import {CATEGORY, LESSON} from "./Helper";
    import TreeViewNode from "./components/TreeViewNode";

    export default {
        name: 'App',
        components: {
            TreeViewNode
        },
        data: () => ({
            snackBar: false,
            snbTimeOut: 1500,
            snbText: '',
            active: [],
        }),
        computed: {
            ...mapGetters(['getLessonFromPath']),
            ...mapState(['tree', 'treeAsVuetifyTree', 'currentLesson', 'drawerOpen'])
        },
        methods: {
            switchMenu() {
                document.getElementById("side-menu").classList.toggle("open");
            },
            openUpdated(openItems) {
                console.log("openUpdated")
                console.log(openItems)
            },
            checkIfRouteIsLesson() {
                return this.$router.currentRoute.path.split("/lessonItem/").length > 1;
            },
            navigateToLesson(activeItems) {
                let item = activeItems[0];
                console.log(item);
                if (item.type === CATEGORY) {
                    console.log(item.children.length);
                    console.log("ITEM IS A CATEGORY, can't navigate there if you want the tree to be foldable")
                    if (item.children.length <= 0) {
                        this.$router.push('/404');
                        //this.showMessage("Cette catégorie est en construction, Revenez bientôt !")
                    }
                    //this.$router.push('/courses/'+ item.path).catch(() => console.log("Navigation Duplicated"))
                } else if (item.type === LESSON) {
                    this.$router.push('/lessonItem' + item.path).catch(() => console.log("Navigation Duplicated"))
                } else {
                    console.error("Error with the item type - not matching category or contentItem")
                }
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
            openOrCloseDrawer() {
                let choice = !this.drawerOpen;
                this.$store.commit('UPDATE_DRAWER_OPEN', choice);
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
    }

    .app {
        height: 100%;
        display: flex;
        flex-direction: column;

        #top-menu {
            width: 100%;
            display: flex;
            flex-flow: row;
            align-items: center;
            //justify-content: flex-end;
            padding: 8px;
            background: linear-gradient(to right, $color-primary 40%, $color-secondary);
            color: white;

            .unicode-symbol {
                font-size: $burger-size;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        #main-content {
            display: flex;
            flex-direction: row;
            width: 100%;
            flex-grow: 1; //So the main content extends to the bottom of the page
            position: relative;

            #side-menu {
                //background: linear-gradient($color-primary 40%, $color-secondary);
                background: #2b2b2b;
                width: 0px;
                position: absolute;
                z-index: 1000;
                top: 0;
                bottom: 0;
                overflow: hidden;
                transition: 0.25s;

                &.open {
                    width: 250px;
                }
            }

            #content {
                width: 100%;
                transition: 0.25s;
                position: relative;
                top: 0;
                bottom: 0;
            }
        }
    }


    .content-wrapper {
        .side-menu {
            overflow: hidden;
            height: 100%;
            width: 0;
            position: fixed;
            z-index: 1;
            top: 0;
            left: 0;
            background: linear-gradient($color-primary, $color-secondary);
            transition: 0.5s; /* 0.5 second transition effect to slide in the sidebar */
        }


    }

    .simplicite-logo {
        background-image: url("../public/Logo_Simplicite_Noir.png");
        background-size: contain;
        z-index: 200;
        width: 20%;
        height: 70%;
        margin: 5px;
        filter: invert(100%);

        &:hover {
            cursor: pointer;
        }
    }

    .app-bar-bg {
        background: linear-gradient(to right, $color-primary 40%, $color-secondary);
    }

    .btn-link:hover {
        text-decoration: none;
    }

    #snb-text {
        text-transform: uppercase;
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

    #previous-button, #next-button {
        outline: none;
    }

    .reverse {
        transform: rotate(180deg);
    }
</style>
