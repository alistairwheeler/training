<template>
    <div id="wrapper">
        <div v-bind:class="{large: !openDrawer, 'thin': openDrawer}">

            <h1 class="lesson-title">{{this.lessonToDisplay.title}}</h1>

            <ul class="breadcrumb">
                <li class="breadcrumb__item"
                    v-for="(item, index) in this.breadCrumbItems"
                    :key="index"
                    @click="breadCrumbItemClicked(item.path, index, breadCrumbItems.length)"
                >
                    <span> {{item.title}}</span>
                    <span class="breadcrumb__divider" v-if="index !== breadCrumbItems.length-1"> > </span>

                </li>
            </ul>

            <div class="lesson_content"
                 v-if="this.lessonToDisplay.content"
                 v-html="this.lessonToDisplay.content">
            </div>

        </div>

        <div class="aside-content col-6">
            <div class="aside-content__carousel-container">
                <v-carousel
                        hide-delimiters
                        show-arrows-on-hover
                        height="100%">
                    <v-carousel-item v-for="(url, index) in urlList"
                                     :key="index"
                                     :src="url">
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
            urlList: [],
        }),
        computed: {
            ...mapGetters([
                'getLessonWithPath',
                'hierarchy',
                'breadCrumb',
            ]),
            openDrawer: function () {
                return this.$store.getters.drawerOpen;
            },
            breadCrumbItems: function () {
                return this.breadCrumb(this.$router.currentRoute.path.split('lessonItem')[1]);
            },

        },
        methods: {
            displayLesson(contentItem) {
                this.lessonToDisplay.title = contentItem.title;
                this.lessonToDisplay.content = contentItem.content;
                console.log(this.lessonToDisplay.content);
                this.lessonToDisplay.videoUrl = contentItem.videoUrl;
                this.$store.commit('UPDATE_DISPLAYED_LESSON_PATH', contentItem.path);
                let payload = {
                    smp: this.$smp,
                    lessonId: contentItem.row_id,
                };
                this.$store
                    .dispatch('fetchLessonsPictureURLs', payload)
                    .then(urlList => this.urlList = urlList)
                    .catch(err => console.error(err))
            },

            breadCrumbItemClicked(categoryPath, index, length) {
                if (index !== length - 1) {
                    this.$router.push('/courses/' + categoryPath).catch(err => console.error(err));
                }
            },
        },
        async created() {
            let splitted = this.$router.currentRoute.path.split("lessonItem");
            let lessonPath = splitted[1] ? (splitted[1]) : '';
            let payload = {
                smp: this.$smp,
            };

            this.$store.commit('UPDATE_DRAWER_OPEN', true);

            if (lessonPath !== '') {
                let contentItem = this.getLessonWithPath(lessonPath);
                if (contentItem !== undefined) {
                    this.displayLesson(contentItem);
                } else {
                    payload.itemPath = lessonPath;
                    this.$store.dispatch('fetchLesson', payload)
                        .then(contentItem => {
                            this.displayLesson(contentItem)
                        });
                }
                this.$store.dispatch('fetchHierarchy', payload).catch(err => console.error(err))
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

    #wrapper {
        display: flex;

        .large, .thin {
            padding: 0 $content-padding 0 $content-padding;
            display: flex;
            flex-direction: column;
        }

        .large {
            width: $large-width;
        }

        .thin {
            width: $thin-width;
        }

    }

    .breadcrumb {
        border-top: $regular-thickness solid $light-grey;
        border-bottom: $regular-thickness solid $light-grey;
        background-color: white;
        margin: $breadcrumb-margin 0 $breadcrumb-margin 0;
        padding-left: 0;

        &__item {
            text-transform: uppercase;

            &:hover {
                cursor: pointer;
            }
        }

        &__divider {
            margin: 0 $breadcrumb-margin 0 $breadcrumb-margin;
            text-transform: uppercase;
        }
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
    .lesson-title {
        color: $color-primary;
        font-size: nth($title-size, 1)+1rem;
        font-weight: bold;
        margin-top: map-get($margins, medium);
    }

    .lesson_content {
        @include flex-column-nowrap;
        overflow: hidden;

        & ::v-deep h1 {
            font-size: nth($title-size, 1);
        }

        & ::v-deep h2 { /* ::v-deep is used instead of >>> because we are using sass (with scss syntax). it is a deep selector to apply styles ot the v-html content*/
            font-size: nth($title-size, 2);
            font-weight: bold;
            color: $color-secondary;
        }

        & ::v-deep h3 {
            font-size: nth($title-size, 3);
            font-weight: bold;
            color: $color-secondary;
        }

        & ::v-deep h4 {
            font-size: nth($title-size, 4);
            color: $color-secondary;
        }

        & ::v-deep h5 {
            font-size: nth($title-size, 5);
            color: $color-secondary;
        }

        & ::v-deep h6 {
            font-size: nth($title-size, 6);
            color: $color-secondary;
        }

        & ::v-deep p {
            text-align: justify;
        }

        & ::v-deep .language-java, & ::v-deep .language-html {
            color: $code-regular-text;
            padding: map-get($paddings, small);
            background-color: $code-background;
        }

        & ::v-deep .hljs-keyword {
            color: $code-keyword;
        }

        & ::v-deep .hljs-string {
            color: $code-string;
        }

        & ::v-deep .hljs-comment {
            color: $code-comment;
        }

        & ::v-deep .hljs-tag {
            color: $code-tag;
        }

        & ::v-deep .hljs-attr {
            color: $code-attribute;
        }

        & ::v-deep .info, & ::v-deep .success, & ::v-deep .warning, & ::v-deep .error {
            border-radius: $regular-radius;
            padding: map-get($paddings, x-small);
            margin: map-get($margins, x-small);
        }

        & ::v-deep .info {
            background-color: $information !important;
        }

        & ::v-deep .success {
            background-color: $success !important;
        }

        & ::v-deep .warning {
            background-color: $warning !important;
        }

        & ::v-deep .error {
            background-color: $error !important;
        }

        & ::v-deep blockquote > p::before {
            content: '" ';
        }

        & ::v-deep blockquote > p::after {
            content: ' "';
        }

        & ::v-deep blockquote > p {
            font-style: italic;
        }

        & ::v-deep strong {
            text-decoration: underline;
        }

        & ::v-deep ol li {
            list-style: decimal;
        }

        & ::v-deep img {
            margin-left: $content-padding;
        }

    }

</style>
