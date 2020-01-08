<template>
    <div id="lesson-item-wrapper" >
        <div v-bind:class="{large: !openDrawer, 'thin': openDrawer}">

            <h1 class="lesson-title">{{lessonToDisplay.title}}</h1>

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

            <div class="lesson_content" v-if="lessonToDisplay.Content">
                <div class="html-content" v-highlightjs v-html="lessonToDisplay.Content"></div>
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
                this.lessonToDisplay.Content = contentItem.content;
                this.lessonToDisplay.videoUrl = contentItem.videoUrl;
                this.$store.commit('UPDATE_DISPLAYED_LESSON_PATH', contentItem.path);
                let payload = {
                    smp: this.$smp,
                    lessonId: contentItem.row_id,
                };
                this.$store.dispatch('fetchLessonsPictureURLs', payload)
                    .then(urlList => this.urlList = urlList)
                    .catch(err => console.error(err))
            },

            breadCrumbItemClicked(categoryPath, index, length) {
                if(index !== length-1){
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

    .breadcrumb {
        border-top: $border-thickness solid $light-grey;
        border-bottom: $border-thickness solid $light-grey;
        background-color: white;
        margin: $breadcrumb-margin 0 $breadcrumb-margin 0;
        padding-left: 0;

        &__item {
            text-transform: uppercase;

            &:hover{
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
    #lesson-item-wrapper {
        display: flex;
    }

    .lesson-content__lrn-outcomes, .lesson_content {
        @include flex-column-nowrap;
    }

    .lesson-title {
        color: $color-primary;
        font-size: nth($title-size, 1)+1rem;
        font-weight: bold;
        margin-top: map-get($margins, medium);
    }

    .lesson_content {
        overflow: hidden;

        &>>> h1 {
            font-size: nth($title-size, 4);
        }

        &>>> h2 { /*Syntax needed because of view loader : https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
            font-size: nth($title-size, 2);
            font-weight: bold;
            color: $color-secondary;
            padding-bottom: 3px;
        }

        &>>> h3 { /*Syntax needed because of view loader : https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
            font-size: nth($title-size, 3);
            font-weight: bold;
            color: $color-secondary;
        }

        &>>> h4 {
            font-size: nth($title-size, 4);
            color: $color-secondary;
        }

        &>>> h5 {
            font-size: nth($title-size, 5);
            color: $color-secondary;
        }

        &>>> h6 {
            font-size: nth($title-size, 6);
            color: $color-secondary;
        }

        &>>> p {
            text-align: justify;
        }

        &>>> .language-java, &>>> .language-html {
            color: #4D515C;
            padding: 5px;
            background-color: $code-background;
        }

        &>>> .hljs-keyword {
            color: $code-keyword;
        }

        &>>> .hljs-string {
            color: $code-string;
        }

        &>>> .hljs-comment {
            color: $code-comment;
        }

        &>>> .hljs-tag {
            color: $code-tag;
        }

        &>>> .hljs-attr {
            color: $code-attribute;
        }

        &>>> .info, &>>> .success, &>>> .warning, &>>> .error {
            border-radius: 5px;
            padding: 3px;
            margin: 5px;
        }

        &>>> .info {
            background-color: $information !important;
        }

        &>>> .success {
            background-color: $success !important;
        }

        &>>> .warning {
            background-color: $warning !important;
        }

        &>>> .error {
            background-color: $error !important;
        }

        &>>> blockquote > p::before {
            content: '" ';
        }

        &>>> blockquote > p::after {
            content: ' "';
        }

        &>>> blockquote > p {
            font-style: italic;
        }

        &>>> strong {
            text-decoration: underline;
        }

        &>>> ol li {
            list-style: decimal;
        }

        &>>> img {
            margin-left: $content-padding;
        }
        
    }

</style>
