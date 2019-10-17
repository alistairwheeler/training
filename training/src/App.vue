<template>
    <v-app class="app" >
        <v-navigation-drawer v-if="isNavigationDrawerVisible()" app clipped v-model="drawer">
            <v-treeview :items="items" activatable color="warning" open-on-click></v-treeview>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark clipped-left >
            <v-app-bar-nav-icon @click="openOrCloseDrawer" v-if="isNavigationDrawerVisible()"></v-app-bar-nav-icon>
            <v-toolbar-title class="simplicite-logo" @click="goHome()" >Simplicité</v-toolbar-title>

            <v-text-field
                    flat
                    solo-inverted
                    hide-details
                    append-icon="mdi-magnify"
                    placeholder="Search a keyword ..."
                    class="ml-12"
            ></v-text-field>

            <div class="flex-grow-1"></div>

            <v-btn v-show="hideButtons()" fab icon @click="goToPreviousLesson()" >
                <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn v-show="hideButtons()" fab icon @click="goToNextLesson()">
                <v-icon>mdi-skip-next</v-icon>
            </v-btn>

            <v-toolbar-items>
                <v-btn text to="/courses"> Courses</v-btn>
                <v-btn text to="/lessons">Lessons</v-btn>
            </v-toolbar-items>
        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-content class="content">
            <!-- Provides the application the proper gutter -->
            <v-container pa-0 mt-1 fluid class="router-container-2" v-on:test-event="logMessage()">
                <router-view :key="$route.fullPath"></router-view> <!-- This makes the page reload when the url changes(check api doc for more info) -->
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
            items: [
                {
                    id: 1,
                    name: 'Applications :',
                    children: [
                        {id: 2, name: 'Calendar : app'},
                        {id: 3, name: 'Chrome : app'},
                        {id: 4, name: 'Webstorm : app'},
                    ],
                },
                {
                    id: 5,
                    name: 'Documents :',
                    children: [
                        {
                            id: 6,
                            name: 'vuetify :',
                            children: [
                                {
                                    id: 7,
                                    name: 'src :',
                                    children: [
                                        {id: 8, name: 'index : ts'},
                                        {id: 9, name: 'bootstrap : ts'},
                                    ],
                                },
                            ],
                        },
                        {
                            id: 10,
                            name: 'material2 :',
                            children: [
                                {
                                    id: 11,
                                    name: 'src :',
                                    children: [
                                        {id: 12, name: 'v-btn : ts'},
                                        {id: 13, name: 'v-card : ts'},
                                        {id: 14, name: 'v-window : ts'},
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 15,
                    name: 'Downloads :',
                    children: [
                        {id: 16, name: 'October : pdf'},
                        {id: 17, name: 'November : pdf'},
                        {id: 18, name: 'Tutorial : html'},
                    ],
                },
                {
                    id: 19,
                    name: 'Videos :',
                    children: [
                        {
                            id: 20,
                            name: 'Tutorials :',
                            children: [
                                {id: 21, name: 'Basic layouts : mp4'},
                                {id: 22, name: 'Advanced techniques : mp4'},
                                {id: 23, name: 'All about app : dir'},
                            ],
                        },
                        {id: 24, name: 'Intro : mov'},
                        {id: 25, name: 'Conference introduction : avi'},
                    ],
                },
            ],
        }),
        created(){

        },
        methods: {
            openOrCloseDrawer() {
                this.drawer = !this.drawer;
            },
            goHome(){
                console.log("home !")
                this.$router.push('/home');
            },
            goToPreviousLesson() {
                //TODO: Make the application change the url to the previousLessonId that is in the store
                this.$router.push("/lessonItem/"+ --this.$store.state.currentLessonId);
                //this.$router.push("/lessonItem/4");
                console.log("previous button clicked");
            },
            goToNextLesson() {
                //TODO: Make the application change the url to the nextLessonId that is in the store
                this.$router.push("/lessonItem/"+ ++this.$store.state.currentLessonId);
                //this.$router.push("/lessonItem/3");
                console.log("next button clicked");
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
        }
    };
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        list-style-type: none;
        outline:0;
        font-family: 'Source Sans Pro', sans-serif;
    }

    .app {
        background-color: green;
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

</style>
