<template >
    <div id="page-wrapper" >
        <div id="title-wrapper">
            <h1>Available Courses :</h1>
        </div>

        <div class="list-wrapper">
            <v-card class="course-item" @click="onCourseClicked()" v-for="course in courses" :key="course.imgSource" transition="slide-x-transition" v-ripple="orange">
                <div class="course-left">
                    <img class="course-picture" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg" alt="course logo"/>
                </div>

                <div class="course-right">
                    <h2 class="course-level">{{course.courseLevel}}</h2>
                    <h3 class="course-short-description">{{course.courseShortDescription}}</h3>
                    <p class="course-long-description">{{course.courseLongDescription}}</p>
                    <v-card-actions>
                        <div class="flex-grow-1"></div>
                        <v-btn text class="action-btn">Discover</v-btn>
                    </v-card-actions>
                </div>
            </v-card>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'ListComponent',
        props: {
        },
        data: () => ({
            courses: [
                {
                    courseLevel: 'Beginner level',
                    courseShortDescription:'Learn the basics of Simplicité® Platform',
                    courseLongDescription:'This course will teach you the fundamental concepts of the Simplicité® platform, and help you discovering\n' +
                        '                    the interface used during the creation of an application.',
                    imgSource:'../assets/Capture.png'
                },
                {
                    courseLevel: 'Intermediate level',
                    courseShortDescription:'Learn more advanced skills',
                    courseLongDescription:'This set of lessons is designed to help you with more sophisticated topics, like UI creation or workflow\n' +
                        'designing, to make sure you can create a completely personnalized application, meeting your own needs.',
                    imgSource:'../assets/Capture2.png'
                },
                {
                    courseLevel: 'Expert level',
                    courseShortDescription:'Learn the most complicated features of Simplicité®',
                    courseLongDescription:'The expertise you will get from this course will help you to completely master Simplicité®. making you able\n' +
                        'to create any kind of application. It is recommended that you follow the beginner and intermediate courses \n' +
                        'before signing up for this one.',
                    imgSource:'../assets/Capture3.png'
                }
            ]
        }),
        methods: {
            onCourseClicked() {
                this.$router.push('/lessons');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h1 {
        color: #387ED1;
        margin-top: 20px;
    }

    #page-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    #title-wrapper {
        width: 70%;
        margin-bottom: 10px;
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
    }

</style>
