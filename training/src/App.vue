<template>
    <v-app class="app">
        <v-navigation-drawer v-if="checkIfRouteIsLesson()" app clipped v-model="this.drawerOpen">

            <v-treeview
                    v-if="this.treeAsVuetifyTree"
                    :items="this.treeAsVuetifyTree"
                    active-class="treeview-lesson--active"
                    open-all
                    open-on-click
                    item-key="path"
                    return-object>
                <template  slot="label" slot-scope="props">
                    <p class="treeView-item" @click="navigateToLesson(props.item)">{{props.item.name}}</p>
                </template>
            </v-treeview>

        </v-navigation-drawer>

        <v-app-bar app color="primary" dark clipped-left>

            <v-app-bar-nav-icon @click="openOrCloseDrawer" v-if="checkIfRouteIsLesson()"></v-app-bar-nav-icon>

            <v-toolbar-title id="toolbar-title" class="simplicite-logo" @click="navigateHome()">Simplicité
            </v-toolbar-title>

            <div class="flex-grow-1"></div>

            <v-btn id="previous-button" v-show="checkIfRouteIsLesson()" fab icon @click="navigateToPreviousLesson()">
                <v-icon>mdi-skip-previous</v-icon>
            </v-btn>
            <v-btn id="next-button" v-show="checkIfRouteIsLesson()" fab icon @click="navigateToNextLesson()">
                <v-icon>mdi-skip-next</v-icon>
            </v-btn>

            <!--<v-toolbar-items>
                <v-btn text to="/courses">Cours</v-btn>
            </v-toolbar-items>-->

        </v-app-bar>

        <!-- Sizes your content based upon application components -->
        <v-content class="content">
            <!-- Provides the application the proper gutter -->
            <v-container pa-0 mt-1 fluid class="router-container-2 fill-page">
                <router-view :key="$route.fullPath" v-if="$store.state.treeLoaded"></router-view>
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

    import {mapGetters} from "vuex";
    import {CATEGORY, LESSON} from "./Helper";

    export default {
        name: 'App',
        components: {},
        data: () => ({
            snackBar: false,
            snbTimeOut: 1200,
            snbText: '',
            /*activeItem: [
                '/cat1/cat2/cat3/cat4/lecon1',
            ],*/

        }),
        computed: {
            ...mapGetters([
                'treeView',
                'getLessonFromPath',
                'currentLesson',
                'drawerOpen',
                'nextLessonPath',
                'previousLessonPath',
                'treeAsVuetifyTree',
            ])
        },
        methods: {
            checkIfRouteIsLesson() {
                return true;
                //return this.$router.currentRoute.path.split("/lessonItem/").length > 1;
            },

            navigateToLesson(item) {
                if (item.type === CATEGORY) {
                    console.log("ITEM IS A CATEGORY, can't navigate there if you want the tree to be foldable")
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
        async beforeCreate(){
            this.$smp.login(()=>{console.log("LOGGED IN")});
        },
        async created() {
            this.$store.dispatch('fetchTree', {smp: this.$smp});
        },
        async mounted() {
            console.log("mounted")
            console.log(this.treeAsTreeView)
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
        font-family: 'Source Sans Pro', sans-serif;
    }

    .content {
        width: 100%;
        background-color: white;
    }

    .fill-page{
        /* Added so the router-vue for lessons can inherit the 100% height */
        height:100%;
    }

    .simplicite-logo:hover {
        cursor: pointer;
    }

    .treeview-section {
        font-size: nth($title-size, 4);
        cursor: pointer;
        border: solid $color-accent;
    }

    .treeview-lesson, .treeview-lesson--active {
        cursor: pointer;
        font-size: nth($title-size, 5);
        border: solid $color-secondary;
    }

    .treeview-lesson--active {
        color: $light-black;
        background-color: $treeView-active;
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

    .treeView-item {
        padding-top: map-get($paddings, medium)+1px;
    }
</style>
