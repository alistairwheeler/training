<template>
    <div id="page-wrapper">
        <div id="title-wrapper">
            <h1>Available Courses :</h1>

            <div class="list-wrapper">
                <!--@click="onCourseClicked(course.row_id)"-->
                <v-card class="course-item"  v-for="course in courses"
                        :key="course.row_id">
                    <div class="course-left">
                        <img class="course-picture" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                             alt="course logo"/>
                    </div>

                    <div class="course-right">
                        <h2 class="course-level">{{course.lrnPlnTitle}}</h2>
                        <h3 class="course-short-description">place holder short description</h3>
                        <p class="course-long-description">place holder LONG DESCRIPTION</p>
                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn @click.stop="onCourseClicked(course.row_id)" text class="action-btn">Discover</v-btn>
                        </v-card-actions>
                    </div>
                </v-card>
            </div>

        </div>
    </div>
</template>

<script>
    /* eslint-disable no-console,no-unused-vars */

    export default {
        name: 'ListComponent',
        props: {},
        data: function () {
            return {
                courses: [],
            }
        },
        methods: {
            onCourseClicked(courseId) {
                //alert(courseId);
                this.$router.push('/courses/lessons/' + courseId);
            },

            async getCourses(){
                return new Promise((resolve, reject)=> {
                    let course = this.$smp.getBusinessObject("LrnPlan");
                    course.search(()=> {
                        if (course.list) {
                            resolve(course.list);
                        } else {
                            reject("Could not load the content");
                        }
                    }, {}) //We give empty filters to the research so it doesn't remember previous researches
                });
            },
        },
        created(){
            console.log("CourseList CREATED");
        },

        async mounted() {
            const responseCourses = await this.getCourses();
            responseCourses.map((elt => {
                console.log(elt);
                this.courses.push(elt);
            }));
            console.log(this.courses.length);
        },

        destroyed() {
            //Empty the array of courses
            this.courses = [];
            //console.clear();
            console.log("CourseList DESTROYED");
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #title-wrapper {
        width: 80%;
    }

    h1 {
        color: #387ED1;
        margin-top: 20px;
    }

    #page-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }


    .list-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .course-item {
        width: 70%;
        min-height: 200px;
        display: flex;
        margin-bottom: 30px;
        background-color: plum;
        position: relative;
    }

    .course-left {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .course-picture {
        height: 70%;
        width: 80%;
        border: solid black 0.3px;
    }

    .course-right {
        width: 70%;
        padding-top: 25px;
    }

    .course-level {
        color: #F08A7B;
        font-size: 1em;
    }

    .course-short-description {
        font-size: 1.4em;
    }

    .action-btn {
        color: orange;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

</style>
