<template>
    <div id="lessons-page-wrapper">
        <div id="wrapper">
            <h1>Every lesson for the course : {{courseName}}</h1>

            <ul id="lesson-list">
                <li class="lesson-item" @click="onLessonClicked(lesson.row_id, lesson.lrnLsnPrtId)" v-for="lesson in searchLessons" :key="lesson.row_id">
                    <a href="">
                        <div class="content-wrapper">
                            <div class="image-wrapper">
                                <img class="lesson-image"
                                     src="https://picsum.photos/510/300?random"
                                     alt="lesson image">
                            </div>
                            <div class="information-wrapper">
                                <h3 :class="getCourseColor(lesson.lessonCourse)">{{lesson.lrnLsnPrtId__lrnPrtTitle}}</h3>
                                <h2 class="lesson-name" v-html="lesson.lrnLsnTitle"></h2>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    /* eslint-disable no-console,no-unused-vars */

    export default {
        name: 'CourseLessons',
        props: {},
        data: () => ({
            courseId: 0,
            courseName: '',
            displayedLessons: [],
        }),
        methods: {
            getCourseName(courseId){
                this.fetchCourseName(courseId)
                    .then((response)=> {
                    this.courseName = response.lrnPlnTitle;
                }).catch((err)=> {
                    console.log(err);
                })
            },
            fetchCourseName(courseId){
                return new Promise((resolve, reject) => {
                    let course = this.$smp.getBusinessObject("LrnPlan");
                    course.search(function (response) {
                        resolve(response);
                    }, {"row_id": courseId})
                })
            },
            getLessonsFromCourse(courseId){
                this.fetchLessonsFromCourse(courseId)
                    .then((response)=> {
                        response.forEach((lesson) =>{
                            this.displayedLessons.push(lesson)
                        })
                    }).catch((err) => {
                    console.log(err);
                })
            },
            fetchLessonsFromCourse(courseId) {
                return new Promise((resolve, reject) => {
                    let lesson = this.$smp.getBusinessObject("LrnLesson");
                    lesson.search(function (response) {
                        console.log(response);
                        resolve(response);
                    }, {"lrnLsnPrtId": courseId})
                })
            },

            onLessonClicked(lessonId, courseId) {
                this.$router.push('/courses/lessons/'+courseId+'/'+lessonId);
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
        },
        mounted() {
            this.courseId = parseInt(this.$route.params.courseId);
            console.log("this.courseId : " + this.courseId);
            this.getCourseName(this.courseId);
            this.getLessonsFromCourse(parseInt(this.$route.params.courseId));
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #lessons-page-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    #wrapper {
        width: 70%;
        display: flex;
        flex-direction: column;
    }

    h1 {
        color: #387ED1;
        margin-top: 20px;
        padding-left: 35px;
        border-bottom: solid black 0.2px;
    }

    #lesson-list {
        /*width: 70%;*/
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin: auto;
        box-sizing: border-box;
        /*background-color: aliceblue;*/
    }

    .lesson-item {
        width: 33%;
        height: 18vw;
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
        color: #7272FF;
    }
    .lesson-course-name-red {
        color: red;
    }
    .lesson-course-name-blue {
        color: coral;
    }

    .lesson-name {
        font-size: 1.4em;
        color: #2B2B2B;
        font-weight: normal;
    }

    .lesson-short-description {
        color: #2B2B2B;
        box-sizing: border-box;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

</style>
