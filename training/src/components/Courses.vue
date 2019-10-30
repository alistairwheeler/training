<template>
    <div id="lesson-item-wrapper">
        <div id="wrapper">
            <h1 class="smp-purple">Available Courses :</h1>

            <div class="list-wrapper">
                <v-card class="course-item" @click="redirectToLessons(course.row_id)" v-for="course in courses"
                        :key="course.row_id">
                    <div class="course-left">
                        <img class="course-picture" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                             alt="course logo"/>
                    </div>

                    <div class="course-right">
                        <h2 class="course-level smp-coral">{{course.lrnPlnTitle}}</h2>
                        <h3 class="course-short-description">{{getDescription(course.lrnPlnShortDescription)}}</h3>
                        <p class="course-long-description">{{getDescription(course.lrnPlnLongDescription)}}</p>
                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn @click.stop="redirectToLessons(course.lrnPlnTitle)"
                                   text
                                   class="action-btn">
                                Discover
                            </v-btn>
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
        name: 'Courses',
        props: {},
        data: function () {
            return {
                courses: [],
            }
        },
        methods: {
            //------- COMPONENT FUNCTIONS -------
            redirectToLessons(courseId) {
                this.$router.push('/lessons/' + courseId);
            },

            getDescription(description) {
                if (typeof (description) === 'undefined' || description === null)
                    return ("There is no description for this course")
                else if (description.length > 0) {
                    return description;
                }
            },

            //------- SIMPLICITE DATA FETCHING -------
            async fetchCourses() {
                return new Promise((resolve, reject) => {
                    let course = this.$smp.getBusinessObject("LrnPlan");
                    course.search(() => {
                        if (course.list) {
                            resolve(course.list);
                        } else {
                            reject("Could not load the content");
                        }
                    }, {}) //We give empty filters to the research so it doesn't remember previous researches
                });
            },

            //------- UTILITY --------
            displayErrorMessage(){

            },

        },

        //LIFECYCLE HOOKS
        async created() {
            console.log("Courses CREATED");
            await this.fetchCourses()
                .then(responseCourses => responseCourses.map(elt => this.courses.push(elt)))
                .catch(() => this.displayErrorMessage());
        },

        destroyed() {
            //Empty the array of courses
            this.courses = [];
            console.log("Courses DESTROYED");
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #lesson-item-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        /*background-color: plum;*/
    }

    #wrapper {
        width: 80%;
        /*background-color: green;*/
        display: flex;
        flex-direction: column;
    }

    h1 {
        margin-top: 20px;
    }

    .list-wrapper {
        display: flex;
        flex-direction: column;
    }

    .course-item {
        width: 100%;
        min-height: 200px;
        display: flex;
        margin-bottom: 30px;
        /*background-color: plum;*/
        position: relative;
        transform: scale(1);
        transition: transform 400ms;

    }

    .course-item:hover {
        transform: scale(1.01);
        transition: transform 200ms;
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

    .course-long-description {
        padding-right: 10px;
    }
</style>
