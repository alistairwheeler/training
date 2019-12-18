<template>
    <div id="lesson-item-wrapper" v-cloak>
        <div v-bind:class="{large: !openDrawer, 'thin': openDrawer}">

            <h1 class="lesson-title"><span class="underlined">{{lessonToDisplay.title}}</span></h1>

            <v-breadcrumbs :items="breadCrumbItems" divider=">"></v-breadcrumbs>

            <div class="lesson-content__concepts" v-if="lessonToDisplay.Content">
                <div id="concepts-container" v-highlightjs v-html="lessonToDisplay.Content"></div>
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

            <div id="video-container">
                <iframe class="video" :src="lessonToDisplay.videoUrl"
                         frameborder="0"
                         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                         allowfullscreen>
                </iframe>
            </div>
        </div>

    </div>

</template>

<script>
    /* eslint-disable no-console,no-unused-vars,no-undef */

    import {mapGetters} from 'vuex';

    export default {
        name: 'LessonItem',
        data: () => ({
            lessonToDisplay: {},
            breadCrumbItems: [],
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
        }),
        computed: {
            openDrawer: function () {
                return this.$store.getters.drawer;
            },
            ...mapGetters([
                'getLessonWithPath',
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
            displayLesson(smpContentItem) {
                this.lessonToDisplay.title = smpContentItem.trnLsnTitle;
                this.lessonToDisplay.Content = smpContentItem.trnLsnContent;
                this.lessonToDisplay.videoUrl = smpContentItem.trnLsnVideoUrl;
                this.$store.commit('UPDATE_CURRENT_LESSON_ID', smpContentItem.row_id);
            },
        },
        async mounted() {
            let splitted = this.$router.currentRoute.path.split("lessonItem");
            let lessonPath = splitted[1] ? (splitted[1]) : '';

            this.$store.commit('UPDATE_DRAWER', true);

            if(lessonPath !== ''){
                let smpContentItem = this.getLessonWithPath(lessonPath)
                if(smpContentItem !== undefined){
                    //1. Display the lesson
                    this.displayLesson(smpContentItem);

                    //2. Get the treeview

                    //3. Display the pictures
                } else {
                    //1. Fetch the lesson on the server & Display it
                    let payload = {
                        smp : this.$smp,
                        itemPath : this.$route.params.lessonPath,
                    };
                    this.$store.dispatch('fetchContentItem', payload).then(smpContentItem => this.displayLesson(smpContentItem));

                    //3. Get the treeview

                    //4. Display the pictures
                }
            } else {
                console.error('error on the path of the lesson' + lessonPath);
            }

        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    [v-cloak] {
        display: none;
    }

    .large, .thin {
        padding: 10px 0 10px 4.5%;
        display: flex;
        flex-direction: column;
    }

    .large {
        width: 55%;
    }

    .thin {
        width: 50%;
    }

    #error-message {
        visibility: hidden;
    }

    /* ----- VIDEO & PDF -----*/
    #aside-content {
        padding: 0;
        margin-top: 0;
        position: fixed;
        right: 0;
        display: flex;
        flex-flow: column;
        align-items: center;
        height: 100%;
        width: 45%;
    }

    #carousel-container {
        height: 45%;
        width: 80%;
    }

    #video-container {
        height: 45%;
        width: 80%;
    }

    .video {
        height: 100%;
        width: 100%;
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
