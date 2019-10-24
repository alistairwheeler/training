<template>
    <div id="lessons-wrapper">
        <div id="wrapper">
            <h1 id="page-title" class="smp-purple">All available lessons </h1>

            <v-btn v-if="emptyList"
                   class="redirect-button"
                   outlined
                   color="#387ED1"
                   @click="pushToCourses()">
                Return to courses
            </v-btn>

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
                                <h2 class="lesson-name course-name-blue">{{lesson.lrnLsnTitle}}</h2>
                                <h3 class="course-name">{{lesson.lrnLsnPrtId__lrnPrtTitle}}</h3>
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
            emptyList: false,
        }),
        methods: {
            onLessonClicked(lessonId) {
                this.$router.push('/lessonItem/'+lessonId);
            },
            getCourseColor() {
                    return 'course-name-blue'

            },

            pushToCourses(){
                this.$router.push('/courses')
            },

            async fetchAllLessons(){
                console.log("fetchAllLessons");
                return new Promise((resolve, reject)=> {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.search(()=> {
                        if(lessonObject.list){
                            resolve(lessonObject.list)
                        } else {
                            resolve('Could not load the content')
                        }
                    }, {})
                })
            },

            async fetchLessonsFromCourse(courseName){
                return new Promise((resolve, reject) => {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.search(()=> {
                        if (lessonObject.list){
                            resolve(lessonObject.list);
                        }
                         else {
                            reject("Could not load the content")
                        }
                    }, {"lrnLsnPrtId__lrnPrtPlnId__lrnPlnTitle": courseName})
                })
            },

            async fetchSectionsFromCourse(courseName){
                console.log("fetchSectionsFromCourse");
                return new Promise((resolve, reject) => {
                    let sectionObject = this.$smp.getBusinessObject("LrnPart");
                    sectionObject.search(()=> {
                        if(sectionObject.list){
                            console.log(sectionObject.list);
                            resolve(sectionObject.list)
                        } else
                            reject("Impossible to fetch sections")
                    }, {'lrnPrtPlnId__lrnPlnTitle': courseName})
                })
            },
            sortLessonsBySection(lessons){
                let orderedLessons = [];
                lessons.forEach(lesson => {
                    lesson.lrnLsnPrtId.forEach(lesson => orderedLessons.push(parseInt(lesson.id)))
                });
                //treeViewItems.map((section) => {orderedItems.push(section.children.map(elt => elt))})
                return orderedLessons;
            },
            async fetchTreeView(lessonId){
              return new Promise((resolve, reject)=> {
                 this.$smp.treeview((response)=> {
                     console.log(response)
                 },'lrnTreeView', {service: 'page', object: 'LrnLesson', rowid: lessonId})
              });
            }
        },
        //LIFECYCLE HOOKS
        async mounted() {
            this.fetchTreeView(1);
            if(this.$route.params.courseName){
                console.log(this.$route.params.courseName);
                document.getElementById("page-title").innerText = "All available lessons from : "+this.$route.params.courseName;
                /*const sections = await this.fetchSectionsFromCourse(this.$route.params.courseName);
                let sectionIDs = await sections.map((elt) => elt.row_id)*/
                const lessons = await this.fetchLessonsFromCourse(this.$route.params.courseName);
                //console.log(lessons)
                if (Array.isArray(lessons) && lessons.length > 0) {
                    lessons.map((elt => {
                        this.displayedLessons.push(elt);
                    }));
                } else {
                    this.emptyList = true;
                }

            }
             else {
                let lessons = await this.fetchAllLessons();
                console.log(lessons)
                lessons = this.sortLessonsBySection(lessons);
                lessons.map((elt => {
                    this.displayedLessons.push(elt);
                }));
            }

        },
        created() {
            console.clear();
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
    }

    #wrapper {
        width: 80%;
        display: flex;
        flex-direction: column;
    }

    h1 {
        margin-top: 20px;
    }

    #lesson-list {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        box-sizing: border-box;
    }

    .lesson-item {
        width: 33%;
        height: 18vw;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        margin-bottom: 24px;
        transform: scale(1);
        transition: transform 200ms;
    }
    .lesson-item:hover {
        transform: scale(1.05);
        transition: transform 200ms;
    }

    .lesson-item a {
        width: 100%;
        height: 100%;
        display: flex; /*Pas besoin de préciser la flex direction pcq le lien n'a qu'un enfant qui est .content-wrapper*/
        padding: 16px;
        text-decoration: none;
    }

    .lesson-item a:hover {
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

    .course-name-purple, .course-name-red , .course-name-blue  {
        font-weight: normal;
        font-size: 2em;
    }
    .course-name-purple {
        color: #7272FF;
    }
    .course-name-red {
        color: red;
    }
    .course-name-blue {
        color: #387ED1;
    }

    .lesson-name {
        font-size: 2em;
        color: #387ED1;
        font-weight: normal;
    }

    .redirect-button {
        width: 20%;
        align-self: center;
    }
</style>
