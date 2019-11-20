<template>
    <v-app class="app">
        <v-navigation-drawer v-if="isNavigationDrawerVisible()" app clipped v-model="drawer">
            <v-treeview :items="this.$store.getters.treeViewItems"
                        item-key="id"
                        activatable
                        color="warning"
                        open-on-click
                        transition
                        @update:active="redirectToLesson()">
                <template slot="label" slot-scope="{ item }">
                    <a @click="redirectToLesson(item)">{{ item.name }}</a>
                </template>
            </v-treeview>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark clipped-left>
            <v-app-bar-nav-icon @click="openOrCloseDrawer" v-if="isNavigationDrawerVisible()"></v-app-bar-nav-icon>

            <v-toolbar-title id="toolbar-title" class="simplicite-logo" @click="goHome()">Simplicité</v-toolbar-title>

            <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    append-icon="mdi-magnify"
                    placeholder="Search a keyword ..."
                    class="ml-12"
            ></v-text-field>

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
            drawer: false,
            snackBar: false,
            snbTimeOut: 1200,
            snbText: '',
            treeview: [],
            sections: [],
            lessons: [],
        }),
        created() {

        },
        methods: {
            openOrCloseDrawer() {
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
                if (!item.children) { //Si l'item est bien une leçon et pas une section
                    console.log("redirecting !");
                    console.log(item);
                    this.$router.push('/lessonItem/'+item.id)
                }
            },
            shakeElement(elementId) {
                document.getElementById(elementId).classList.add("animated");
                setTimeout(function () {
                    document.getElementById(elementId).classList.remove('animated');
                }, 150);

            },
            hideButtons() {
                return this.checkIfRouteIsLesson()
            },
            isNavigationDrawerVisible() {
                return this.checkIfRouteIsLesson()
            },
            checkIfRouteIsLesson() {
                return this.$router.currentRoute.path.split("/lessonItem/").length > 1;
            },
            showSnackBar(message) {
                this.snbText = message;
                this.snackBar = true;
            },
        },
    };
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        list-style-type: none;
        outline: 0;
        font-family: 'Montserrat', sans-serif;
    }

    .app {
    }

    .content {
        width: 100%;
        background-color: white;
    }

    .router-container-2 {
        background-color: white;
    }

    .simplicite-logo:hover {
        cursor: pointer;
    }

    .smp-blue {
        color: #387ED1;
    }

    .smp-aqua-blue {
        color: #38D1AB;
    }

    .smp-purple {
        color: #7272FF;
    }

    .smp-coral {
        color: #F08A7B;
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
            background-color: #F08A7B;
            border: solid #F08A7B;
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
