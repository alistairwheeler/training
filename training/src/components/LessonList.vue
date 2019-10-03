<template>
    <div id="lesson-page-wrapper">
        <h2>All the lessons for the course : {{courseName}}</h2>

        <ul id="lesson-list">

            <li class="lesson-item" v-for="lesson in lessonList" :key="lesson.lessonName">
                <a href="#">
                    <div class="content-wrapper">
                        <div class="image-wrapper">
                            <img class="lesson-image"
                                 :src="getPictureUrl(lesson.lessonName)"
                                 alt="lesson image">
                        </div>
                        <div class="information-wrapper">
                            <h3 :class="getCourseColor(lesson.lessonCourse)">{{lesson.lessonCourse}}</h3>
                            <h2 class="lesson-name">{{lesson.lessonName}}</h2>
                        </div>
                    </div>
                </a>
            </li>

        </ul>
    </div>
</template>

<script>
    export default {
        name: 'ListComponent',
        props: {},
        data: () => ({
            courseName: 'Beginner',
            lessonList: [
                {
                    lessonName:'Introduction to Simplicité',
                    lessonPictureUrl: 'https://cdn.vuetifyjs.com/images/cards/mountain.jpg',
                    lessonCourse: 'Beginner'
                },
                {
                    lessonName:'Business objects',
                    lessonPictureUrl: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
                    lessonCourse: 'Beginner'
                },
                {
                    lessonName:'Permission granting',
                    lessonPictureUrl: 'https://picsum.photos/510/300?random',
                    lessonCourse: 'Intermediate'
                },{
                    lessonName:'UI Designing',
                    lessonPictureUrl: 'https://picsum.photos/id/11/500/300',
                    lessonCourse: 'Expert'
                }
                ,{
                    lessonName:'Workflow creation',
                    lessonPictureUrl: 'https://picsum.photos/510/300?random',
                    lessonCourse: 'Expert'
                }
            ]
        }),
        methods: {
            getPictureUrl(lessonName) {
                lessonName.toString()
                return 'https://picsum.photos/510/300?random'
               /* return this.lessonList.find(function (element) {
                    if (element.lessonName === lessonName)
                        return element.lessonPictureUrl
                });*/
            },
            getCourseColor(lessonCourse) {
                if (lessonCourse === "Beginner") {
                    return 'lesson-course-name-purple'
                } else if (lessonCourse ==="Intermediate")  {
                    return 'lesson-course-name-blue'
                } else {
                    return 'lesson-course-name-red'
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #lesson-list {
        width: 70%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: auto;
        box-sizing: border-box;
        padding: 16px;
        /*background-color: aliceblue;*/
    }

    .lesson-item {
        width: 33%;
        height: 14vw;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin-bottom: 24px;
    }

    .lesson-item a {
        width: 100%;
        height: 100%;
        display: flex; /*Pas besoin de préciser la flex direction pcq le lien n'a qu'un enfant qui est .content-wrapper*/
        padding: 16px;
        text-decoration: none;
    }
    .lesson-item a:hover {
        background-color: rgba(80, 75, 245, 0.2);
    }

    .content-wrapper {
        display: flex;
        flex-direction: column;
        width: 100%;

    }

    .image-wrapper {
        width: 100%;
        height: 100%;

        box-sizing: border-box;
        margin-bottom: 8px;
    }

    .lesson-image {
        width: 100%;
        height: 100%;
    }

    .information-wrapper {
        height: 30%;
    }

    .lesson-course-name-purple, .lesson-course-name-red , .lesson-course-name-blue  {
        font-weight: normal;
        font-size: 1em;
    }
    .lesson-course-name-purple {
        color: #514FBF;
    }

    .lesson-course-name-red {
        color: red;
    }
    .lesson-course-name-blue {
        color: cornflowerblue;
    }

    .lesson-name {
        font-size: 1.4em;
        color: black;
        font-weight: normal;
    }

    .lesson-short-description {
        color: black;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

</style>
