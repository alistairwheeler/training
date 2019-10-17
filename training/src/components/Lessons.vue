<template>
    <div id="lessons-wrapper">
        <div id="wrapper">
            <h1 id="page-title" class="smp-purple">All available lessons </h1>

            <ul id="lesson-list">
                <li class="lesson-item" @click="onLessonClicked(lesson.row_id)" v-for="lesson in displayedLessons" :key="lesson.row_id">
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
    /* eslint-disable no-unused-vars,no-console */

    export default {
        name: 'Lessons',
        props: {},
        data: () => ({
            displayedLessons: [],
        }),
        methods: {
            onLessonClicked(lessonId) {
                this.$router.push('/lessonItem/'+lessonId);
            },
            getCourseColor() {
                    return 'lesson-course-name-red'

            },

            async getLesson(){
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

            async getLessonsFromCourse(courseName){
                return new Promise((resolve, reject) => {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.search(()=> {
                        if (lessonObject.list)
                            resolve(lessonObject.list);
                         else {
                            reject("Could not load the content")
                        }
                    }, {"lrnLsnPrtId__lrnPrtTitle": courseName})
                })
            }
        },
        //LIFECYCLE HOOKS
        async mounted() {

            if(this.$route.params.courseName){
                console.log(this.$route.params.courseName);
                document.getElementById("page-title").innerText = "All available lessons from : "+this.$route.params.courseName;
                const lessons = await this.getLessonsFromCourse(this.$route.params.courseName)

                lessons.map((elt => {
                    this.displayedLessons.push(elt);
                }));
            }
             else {
                const lessons = await this.getLesson();
                console.log(lessons)
                lessons.map((elt => {
                    this.displayedLessons.push(elt);
                }));
            }

        },
        created() {
            console.clear()
            console.log("Lessons CREATED");
        },
        destroyed() {
            console.info("Lessons DESTROYED");
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #lessons-wrapper {
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
        font-size: 1em;
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
