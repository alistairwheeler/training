<template>
    <div id="lesson-item-wrapper" v-cloak>
        <div v-bind:class="{large: !openDrawer, 'thin': openDrawer}">

            <h1 class="lesson-title"><span class="underlined">{{lessonToDisplay.title}}</span></h1>

            <v-breadcrumbs :items="breadCrumbItems" divider=">"></v-breadcrumbs>

            <div class="lesson-content__lrn-outcomes" v-if="lessonToDisplay.learningOutcomes">
                <h1 class="section-title">Objectifs Pédagogiques</h1>
                <div id="learning-outcomes-container" v-html="lessonToDisplay.learningOutcomes"></div>
            </div>

            <div class="lesson-content__concepts" v-if="lessonToDisplay.genConcepts">
                <div id="concepts-container" v-highlightjs v-html="lessonToDisplay.genConcepts"></div>
            </div>
        </div>

        <div id="aside-content" class="col-6">
            <div id="carousel-container">
                <v-carousel hide-delimiters show-arrows-on-hover height="100%">
                    <v-carousel-item v-for="(item, i) in items"
                                     :key="i"
                                     :src="item.src">
                    </v-carousel-item>
                </v-carousel>
            </div>
            <!--
                            <embed :src="lessonToDisplay.pdfUrl" type="application/pdf" width="100%" height="100%">
                        -->

            <div id="video-container">
                <iframe width="100%" height="100%" :src="lessonToDisplay.videoUrl"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
            </div>
        </div>

        <h1 id="error-message">Sorry, we could not load this lesson</h1>

    </div>

</template>

<script>
    /* eslint-disable no-console,no-unused-vars,no-undef */

    import {Lesson} from "../Models/Lesson";
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: 'LessonItem',
        data: () => ({
            lessonToDisplay: {},
            items: [
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
                },
                {
                    src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
                },
            ],
            breadCrumbItems: [],
        }),
        computed: {
            openDrawer: function () {
                return this.$store.getters.drawer;
            },
            ...mapGetters([
                'allLessonsLoaded',
                'courses',
                'lessons',
                'lessonWithId',
                'lessonsFromCourseAsListItems',
                'lessonsFromSectionAsListItems',
                'coursesAsListItems',
                'lessonsAsListItems',
                'displayedLesson',
            ])
        },
        methods: {
            setBreadCrumb() {
                this.breadCrumbItems.push({
                    text: this.lessonToDisplay.courseName,
                    disabled: false,
                    href: '/lessons/' + this.lessonToDisplay.courseId,
                });
                this.breadCrumbItems.push({
                    text: this.lessonToDisplay.sectionName,
                    disabled: false,
                    href: '/lessons/' + this.lessonToDisplay.sectionId
                });
                this.breadCrumbItems.push({text: this.lessonToDisplay.title, disabled: false})
            },
        },
        async created() {
            let lessonId = parseInt(this.$route.params.lessonId);
            let smpLesson = this.lessonWithId(lessonId);

            this.$store.commit('UPDATE_CURRENT_LESSON_ID', lessonId);
            this.$store.commit('UPDATE_DRAWER', true);

            if (smpLesson !== undefined) { //Si la leçon est présente, toutes celles du même cours aussi
                console.log("smpLesson IS defined");
                this.lessonToDisplay = Lesson.formatFromSimplicite(smpLesson);
            } else if (smpLesson === undefined) {
                console.log("smpLesson NOT defined");
                let payload = {
                    smp: this.$smp,
                    lessonId: lessonId
                };
                this.$store.dispatch('fetchLesson', payload)
                    .then(() => this.lessonToDisplay = Lesson.formatFromSimplicite(this.lessonWithId(lessonId)))
            }
            let payload = {
                smp: this.$smp,
                courseId: parseInt(this.lessonToDisplay.courseId)
            };
            this.$store.dispatch('fetchTreeViewFromCourse', payload);
            this.$store.commit('fetchTreeViewFromCourse', payload);
            this.$store.dispatch('fetchTreeViewFromCourse', payload);
            this.setBreadCrumb();
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    [v-cloak] {
        display: none;
    }

    .large, .thin {
        padding: 10px 30px 10px 30px;
    }

    .large {
        width: 50%;
    }

    .thin {
        width: 40%;
    }

    #error-message {
        visibility: hidden;
    }

    /* ----- LESSON CONTENT ----- */
    #lesson-item-wrapper {
        display: flex;
    }

    .lesson-content__lrn-outcomes, .lesson-content__concepts {
        display: flex;
        flex-flow: column nowrap;
    }

    .lesson-content__concepts {
        overflow: hidden;
    }

    .lesson-title {
        color: #5edbb6;
        font-size: 3rem;
        font-weight: bold;
        text-decoration: underline;
        text-underline-position: under;
        margin-bottom: 20px;
    }

    .lesson-content__concepts >>> h1, .section-title {
        font-size: 2.4rem;
        color: #5edbb6;
    }

    .lesson-content__concepts >>> h2 { /*Syntax needed because of view loader : https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
        font-size: 2.2rem;
        font-weight: bold;
        color: #272635;
        padding-bottom: 3px;
    }

    .lesson-content__concepts >>> h3 { /*Syntax needed because of view loader : https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
        font-size: 1.8rem;
        font-weight: bold;
        color: #272635;
    }

    .lesson-content__concepts >>> h4 {
        font-size: 1.5rem;
        color: #272635;
    }

    .lesson-content__concepts >>> h5 {
        font-size: 1.2rem;
        color: #272635;
    }

    .lesson-content__concepts >>> h6 {
        font-size: 1.1rem;
        color: #272635;
    }

    .lesson-content__concepts >>> hr {

    }

    .lesson-content__concepts >>> p {
        text-align: justify;
    }

    /* ----- VIDEO & PDF -----*/
    #aside-content {
        position: fixed;
        right: 0;
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    #video-container {
        height: 40%;
        display: flex;
        align-items: center;
    }

    #carousel-container {
        justify-content: center;
        align-self: center;
        height: 45%;
        width: 100%;
        margin-bottom: 3%;
    }

    .lesson-content__concepts >>> .language-java, .lesson-content__concepts >>> .language-html {
        color: #4D515C;
        padding: 5px;
        background-color: #F7F7F7;
    }

    .lesson-content__concepts >>> .hljs-keyword {
        color: blue;
    }

    .lesson-content__concepts >>> .hljs-string {
        color: darkred;
    }

    .lesson-content__concepts >>> .hljs-comment {
        color: purple;
    }

    .lesson-content__concepts >>> .hljs-tag {
        color: darkgreen;
    }

    .lesson-content__concepts >>> .hljs-attr {
        color: darkblue;
    }

    .lesson-content__concepts >>> .info, .lesson-content__concepts >>> .success, .lesson-content__concepts >>> .warning, .lesson-content__concepts >>> .error {
        border-radius: 5px;
        padding: 3px;
        margin: 5px;
    }

    .lesson-content__concepts >>> .info {
        background-color: #e6f4fa !important;
    }

    .lesson-content__concepts >>> .success {
        background-color: #e6fae7 !important;
    }

    .lesson-content__concepts >>> .warning {
        background-color: #f5e5d5 !important;
    }

    .lesson-content__concepts >>> .error {
        background-color: #ffc9c9 !important;
    }

    .lesson-content__concepts >>> blockquote > p::before {
        content: '" ';
    }

    .lesson-content__concepts >>> blockquote > p::after {
        content: ' "';
    }

    .lesson-content__concepts >>> blockquote > p {
        font-style: italic;
    }

    .lesson-content__concepts >>> a:visited {
        text-decoration: underline;
    }

    .lesson-content__concepts >>> strong {
        text-decoration: underline;
    }

    .lesson-content__concepts >>> ol li {
        list-style: decimal;
    }

    .lesson-content__concepts >>> img {
        margin-left: 40px;
    }

</style>
