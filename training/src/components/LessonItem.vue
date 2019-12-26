<template>
    <div id="lesson-item-wrapper" v-cloak>
        <div v-bind:class="{large: !openDrawer, 'thin': openDrawer}">

            <h1 class="lesson-title">{{lessonToDisplay.title}}</h1>

            <v-breadcrumbs class="breadcrumbs" :items="breadCrumbItems" divider=">"></v-breadcrumbs>

            <div class="lesson_content" v-if="lessonToDisplay.Content">
                <div class="html-content" v-highlightjs v-html="lessonToDisplay.Content"></div>
            </div>
        </div>

        <div class="aside-content col-6">
            <div class="aside-content__carousel-container">
                <v-carousel hide-delimiters show-arrows-on-hover height="100%">
                    <v-carousel-item v-for="(item, i) in items"
                                     :key="i"
                                     :src="item.src">
                    </v-carousel-item>
                </v-carousel>
            </div>

            <div class="video-container">
                <iframe class="video-container__video-frame" :src="lessonToDisplay.videoUrl"
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
                let path = this.$router.currentRoute.path.split('/lessonItem/');
                console.log(path);
                path[path.length-1].split('/').forEach(element => {
                    this.breadCrumbItems.push({
                        text: element.toUpperCase(),
                        disabled: false,
                        href: '/lessons/' + this.lessonToDisplay.courseId,
                    });
                });
            },
            displayLesson(smpContentItem) {
                this.lessonToDisplay.title = smpContentItem.title;
                this.lessonToDisplay.Content = smpContentItem.content;
                this.lessonToDisplay.videoUrl = smpContentItem.videoUrl;
            },
        },
        async created() {
            let splitted = this.$router.currentRoute.path.split("lessonItem");
            let lessonPath = splitted[1] ? (splitted[1]) : '';
            this.setBreadCrumb();

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
<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";
    @import "../assets/sass/utils/mixins";

    [v-cloak] {
        display: none;
    }

    .large, .thin {
        padding: $content-padding;
        display: flex;
        flex-direction: column;
    }

    .large {
        width: $large-width;
    }

    .thin {
        width: $thin-width;
    }


    /* ----- VIDEO & PDF -----*/
    .aside-content {
        @include no-padding-margin;
        @include flex-column-nowrap;
        position: fixed;
        right: 0;
        align-items: center;
        height: 100%;
        width: 45%;
        background-color: $light-grey;

        &__carousel-container {
            height: $media-height;
            width: $media-width;
        }
    }

    .video-container {
        height: $media-height;
        width: $media-width;

        &__video-frame {
            height: 100%;
            width: 100%;
        }
    }

    /* ----- LESSON CONTENT ----- */
    #lesson-item-wrapper {
        display: flex;
    }

    .lesson-content__lrn-outcomes, .lesson_content {
        @include flex-column-nowrap;
    }

    .lesson_content {
        overflow: hidden;
    }

    .lesson-title {
        color: $color-primary;
        font-size: 3rem;
        font-weight: bold;
    }

    .lesson_content >>> h1 {
            font-size: nth($title-size, 1);
            color: $color-accent;
    }

    .lesson_content >>> h2 { /*Syntax needed because of view loader : https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
        font-size: nth($title-size, 2);
        font-weight: bold;
        color: $color-secondary;
        padding-bottom: 3px;
    }

    .lesson_content >>> h3 { /*Syntax needed because of view loader : https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
        font-size: nth($title-size, 3);
        font-weight: bold;
        color: $color-secondary;
    }

    .lesson_content >>> h4 {
        font-size: nth($title-size, 4);
        color: $color-secondary;
    }

    .lesson_content >>> h5 {
        font-size: nth($title-size, 5);
        color: $color-secondary;
    }

    .lesson_content >>> h6 {
        font-size: nth($title-size, 6);
        color: $color-secondary;
    }

    .lesson_content >>> p {
        text-align: justify;
    }

    .lesson_content >>> .language-java, .lesson_content >>> .language-html {
        color: #4D515C;
        padding: 5px;
        background-color: $code-background;
    }

    .lesson_content >>> .hljs-keyword {
        color: $code-keyword;
    }

    .lesson_content >>> .hljs-string {
        color: $code-string;
    }

    .lesson_content >>> .hljs-comment {
        color: $code-comment;
    }

    .lesson_content >>> .hljs-tag {
        color: $code-tag;
    }

    .lesson_content >>> .hljs-attr {
        color: $code-attribute;
    }

    .lesson_content >>> .info, .lesson_content >>> .success, .lesson_content >>> .warning, .lesson_content >>> .error {
        border-radius: 5px;
        padding: 3px;
        margin: 5px;
    }

    .lesson_content >>> .info {
        background-color: $information !important;
    }

    .lesson_content >>> .success {
        background-color: $success !important;
    }

    .lesson_content >>> .warning {
        background-color: $warning !important;
    }

    .lesson_content >>> .error {
        background-color: $error !important;
    }

    .lesson_content >>> blockquote > p::before {
        content: '" ';
    }

    .lesson_content >>> blockquote > p::after {
        content: ' "';
    }

    .lesson_content >>> blockquote > p {
        font-style: italic;
    }

    .lesson_content >>> strong {
        text-decoration: underline;
    }

    .lesson_content >>> ol li {
        list-style: decimal;
    }

    .lesson_content >>> img {
        margin-left: $content-padding;
    }

    .breadcrumbs {
        border-top: $border-thickness solid $light-grey;
        border-bottom: $border-thickness solid $light-grey;
        margin-bottom: 20px;
    }

</style>
