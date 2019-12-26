<template>
    <v-app class="app">
        <v-navigation-drawer v-if="isNavigationDrawerVisible()" app clipped v-model="this.$store.getters.drawer">
            <!--<v-card v-for="item in this.$store.getters.treeViewItems" :key="item.row_id" >-->
                <ul v-for="section in this.$store.getters.treeViewItems" :key="section.row_id">
                    <li class="treeview-section" @click="redirectToLesson(section)"> {{section.name}}</li>
                    <ul v-for="lesson in section.children" :key="lesson.row_id">
                        <li @click="redirectToLesson(lesson)"
                            v-bind:class="{'treeview-lesson--active': isLessonActive(lesson.id),
                                           'treeview-lesson': !isLessonActive(lesson.id)}">{{lesson.name}}
                        </li>
                    </ul>
                </ul>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark clipped-left>
            <v-app-bar-nav-icon @click="openOrCloseDrawer" v-if="isNavigationDrawerVisible()"></v-app-bar-nav-icon>

            <v-toolbar-title id="toolbar-title" class="simplicite-logo" @click="goHome()">Simplicité</v-toolbar-title>

            <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    append-icon="mdi-magnify"
                    placeholder="Rechercher un mot clé ..."
                    class="ml-12">

            </v-text-field>

            <div class="flex-grow-1"></div>

            <v-btn id="previous-button" v-show="checkIfRouteIsLesson()" fab icon @click="goToPreviousLesson()">
                <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn id="next-button" v-show="checkIfRouteIsLesson()" fab icon @click="goToNextLesson()">
                <v-icon>mdi-skip-next</v-icon>
            </v-btn>

            <v-toolbar-items>
                <v-btn text to="/courses">Cours</v-btn>
                <v-btn text to="/lessons">Leçons</v-btn>
            </v-toolbar-items>

        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-content class="content">
            <!-- Provides the application the proper gutter -->
            <v-container pa-0 mt-1 fluid class="router-container-2" v-on:test-event="logMessage()">
                <router-view :key="$route.fullPath"></router-view>
                <!-- This makes the page reload when the url changes(check api doc for more info) -->
                <v-snackbar id="snackbar" v-model="snackBar" :timeout="snbTimeOut">
                    <span id="snb-text"> {{snbText}} </span>
                    <v-btn color="#F08A7B" text @click="snackBar = false">FERMER</v-btn>
                </v-snackbar>
            </v-container>
        </v-content>

    </v-app>
</template>

<script>
    /* eslint-disable no-console */

    export default {
        name: 'App',
        components: {},
        data: () => ({
            itemSelected: true,
            drawer: false,
            snackBar: false,
            snbTimeOut: 1200,
            activeLesson: true,
            snbText: '',
            treeview: [],
            sections: [],
            lessons: [],
            items:[
                {
                    row_id: 2,
                    name: 'Joe'
                },
                {
                    row_id: 3,
                    name: 'Joe'
                }
            ],
        }),
        methods: {
            isLessonActive(lessonId){
                console.log(lessonId);
                return parseInt(lessonId) === parseInt(this.$store.getters.currentLessonId);
            },

            openOrCloseDrawer() {
                this.$store.commit('UPDATE_DRAWER', !this.drawer);
                this.drawer = !this.drawer;
            },

            goHome() {
                console.log("home !");
                this.$router.push('/home');
            },

            goToPreviousLesson() {
                let lessonsIDs = this.$store.getters.otherLessonsIDs,
                    length = lessonsIDs.length,
                    currentID = this.$store.getters.currentLessonId;
                if (length >= 2) {
                    let indexOfLesson = lessonsIDs.findIndex(elt => elt === currentID);
                    if (indexOfLesson >= 1)
                        this.$router.push("/lessonItem/" + lessonsIDs[indexOfLesson - 1]);
                    else {
                        this.shakeElement("previous-button");
                        this.showSnackBar("Il n'y a plus de leçons dans ce cours")
                    }
                } else {
                    this.shakeElement("previous-button");
                    this.showSnackBar("Il n'y a qu'une seule leçon dans ce cours")
                }

            },

            goToNextLesson() {
                let lessonsIDs = this.$store.getters.otherLessonsIDs,
                    length = lessonsIDs.length,
                    currentID = this.$store.getters.currentLessonId;
                if (length >= 2) {
                    let indexOfLesson = lessonsIDs.findIndex(elt => elt === currentID);
                    if (indexOfLesson + 1 < length)
                        this.$router.push("/lessonItem/" + lessonsIDs[indexOfLesson + 1]);
                    else {
                        this.shakeElement("next-button");
                        this.showSnackBar("Il n'y a plus de leçons dans ce cours")
                    }
                } else {
                    this.shakeElement("next-button");
                    this.showSnackBar("Il n'y a qu'une seule leçon dans ce cours")
                }

            },

            redirectToLesson(item) {
                console.log("item.id : ");
                console.log(item.id);
                if (!item.children) { //Si l'item est bien une leçon et pas une section
                    this.$router.push('/lessonItem'+item.path)
                } else if (item.children){ //si l'item est une section (pcq il a des enfants).
                    console.log("item has children");
                    this.$router.push('/lessons/section/'+item.id)
                }
            },

            shakeElement(elementId) {
                document.getElementById(elementId).classList.add("animated");
                setTimeout(function () {
                    document.getElementById(elementId).classList.remove('animated');
                }, 150);

            },

            isNavigationDrawerVisible() {
                return (this.checkIfRouteIsLesson())
            },

            checkIfRouteIsLesson() {
                return this.$router.currentRoute.path.split("/lessonItem/").length > 1;
            },

            showSnackBar(message) {
                this.snbText = message;
                this.snackBar = true;
            },
        },
        computed: {
            drawerOpen: function (){
                return this.$store.getters.drawer;
            }
        }
    };
</script>

<style lang="scss">

    @import "assets/sass/utils/variables";
    @import "assets/sass/utils/mixins";

    * {
        @include no-padding-margin;
        list-style-type: none;
        outline: 0;
        font-family: 'Montserrat', sans-serif;
    }

    .content {
        width: 100%;
        background-color: white;
    }

    .simplicite-logo:hover {
        cursor: pointer;
    }

    .treeview-section {
        font-size: 1.5em;
        cursor: pointer;
    }

    .treeview-lesson, .treeview-lesson--active{
        cursor: pointer;
        font-size: nth($title-size, 4);
    }

    .treeview-lesson--active {
        color: $light-black;
        background-color: $treeView-active;
    }

    #snb-text {
        text-transform: uppercase;
    }

    .animated {
        animation: headshake 100ms cubic-bezier(.4, .1, .6, .9);
        animation-iteration-count: 2;
    }

    @keyframes headshake {
        0% {
            background-color: #5edbb6;
            border: solid #5edbb6;
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
</style>
