<template>
    <div id="lesson-item-wrapper">
        <div id="wrapper">
            <h1 class="smp-blue">Tous les cours disponibles :</h1>

            <div class="course-list-wrapper">
                <v-card class="course-prev" @click="redirectToLessons(course.row_id)" v-for="course in courses"
                        :key="course.row_id">
                    <div class="course-prev__picture-container">
                        <img class="course-prev__picture" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                             alt="course logo"/>
                    </div>

                    <div class="course-prev__info-container">
                        <h2 class="course-prev__name ">{{course.lrnPlnTitle}}</h2>
                        <h3 class="course-prev__short-description">{{getDescription(course.lrnPlnShortDescription)}}</h3>
                        <p class="course-prev__long-description">{{getDescription(course.lrnPlnLongDescription)}}</p>
                        <v-card-actions>
                            <div class="flex-grow-1"></div>
                            <v-btn @click.stop="redirectToLessons(course.lrnPlnTitle)" text class="action-btn"> Discover </v-btn>
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
                    return ("")
                    //return ("There is no description for this course")
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
    }

    #wrapper {
        width: 80%;
        display: flex;
        flex-direction: column;
    }

    h1 {
        margin-top: 20px;
    }

    .course-list-wrapper {
        display: flex;
        flex-direction: column;
    }

    .course-prev {
        width: 100%;
        min-height: 200px;
        display: flex;
        margin-bottom: 30px;
        position: relative;
        transform: scale(1);
        transition: transform 400ms;

    }

    .course-prev:hover {
        transform: scale(1.01);
        transition: transform 200ms;
    }

    .course-prev__picture-container {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .course-prev__picture {
        height: 70%;
        width: 80%;
        border: solid black 0.3px;
    }

    .course-prev__info-container {
        width: 70%;
        padding-top: 25px;
    }

    .course-prev__name {
        font-size: 1.3rem;
        color: #387ED1;
    }

    .course-prev__short-description {
        font-size: 1.4rem;
    }

    .action-btn {
        color: orange;
        position: absolute;
        bottom: 10px;
        right: 10px;
    }

    .course-prev__long-description {
        padding-right: 10px;
    }
</style>
