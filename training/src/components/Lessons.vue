<template>
    <div id="lesson-list-wrapper">
        <div id="wrapper">
            <h1 >All available lessons </h1>

            <ul id="lesson-list">
                <li class="lesson-item" @click="onLessonClicked(lesson.row_id, lesson.lrnLsnPrtId)" v-for="lesson in displayedLessons" :key="lesson.row_id">
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
    export default {
        name: 'ListComponent',
        props: {},
        data: () => ({
            displayedLessons: [],
        }),
        methods: {
            onLessonClicked(lessonId, courseId) {
                this.$router.push('/courses/lessons/'+courseId+'/'+lessonId);
            },
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
            },

            async getLessons(){
                return new Promise((resolve, reject)=> {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.search(()=> {
                        if (lessonObject.list) {
                            resolve(lessonObject.list);
                        } else {
                            reject("Could not load the content");
                        }
                    }, {}) //We give empty filters to the research so it doesn't remember previous researches
                });
            },
        },
        created() {
            console.log("LessonList CREATED");
        },
        async mounted() {
            const lessons = await this.getLessons();
            lessons.map((elt => {
                console.log(elt);
                this.displayedLessons.push(elt);
            }));
            console.log(this.displayedLessons.length);
        },
        destroyed() {
            console.info("LessonList DESTROYED");
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #lesson-list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        /*background-color: plum;*/
    }

    #wrapper {
        width: 80%;
        display: flex;
        flex-direction: column;
        /*background-color: green;*/
    }

    h1 {
        color: #387ED1;
        margin-top: 20px;
    }

    #lesson-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

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
