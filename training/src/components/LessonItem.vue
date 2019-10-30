<template>
    <div id="lesson-item-wrapper" v-cloak>
        <div id="textual-content" class="col-6">
            <h1 id="lesson-title" class="lesson-title smp-purple" v-html="displayedLesson.title"></h1>
            <div id="learning-outcomes">
                <h2 class="sub-part-title smp-coral">Learning Outcomes</h2>
                <div id="learning-outcomes-wrapper" v-html="displayedLesson.learningOutcomes"></div>
            </div>

            <div id="general-concepts">
                <h2 class="sub-part-title smp-coral">General Concepts : </h2>
                <div id="concepts-wrapper" v-html="displayedLesson.genConcepts"></div>

            </div>

            <div id="exercise" @click="updateCurrentLessonID()">
                <h2 class="sub-part-title smp-coral">Exercise : </h2>
                <div id="exercise-wrapper" v-html="displayedLesson.exercise"></div>
            </div>
        </div>

        <div id="support-content" class="col-6">
            <div id="pdf-container">
                <embed :src="displayedLesson.pdfUrl" type="application/pdf" width="100%" height="100%">
            </div>

            <div id="video-container">
                <iframe width="100%" height="100%" :src="displayedLesson.videoUrl"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
            </div>
        </div>

    </div>

</template>

<script>
    /* eslint-disable no-console,no-unused-vars,no-undef */

    import {Lesson} from "../Models/Lesson";

    export default {
        name: 'LessonItem',
        data: function() {
            return {
                displayedLesson: {},
            }
        },
        methods: {
            /**
             * Fetches the lesson with id given as argument
             * @returns {Promise<*>}
             */
            async fetchLesson(lessonId) {
                console.log('fetchLesson')
                return new Promise((resolve, reject) => {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.get((response) => {
                        if (response){
                            console.log(response)
                            resolve(response);
                        }
                        else
                            reject("Could not load the lesson");
                    }, lessonId)
                })
            },

            async fetchSectionsFromCourse(courseName){
                console.log("fetchSectionsFromCourse");
                return new Promise((resolve, reject) => {
                    let sectionObject = this.$smp.getBusinessObject("LrnPart");
                    sectionObject.search(()=> {
                        if(sectionObject.list){
                            console.log(sectionObject.list)
                            resolve(sectionObject.list)
                        } else
                            reject("Impossible to fetch sections")
                    }, {"lrnPrtPlnId__lrnPlnTitle": courseName})
                })
            },

            async fetchLessonsFromCourseID(courseName){
                console.log("fetchLessonsFromCourseID");
                return new Promise((resolve, reject)=> {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.search(()=> {
                        if(lessonObject.list){
                            console.log(lessonObject.list)
                            resolve(lessonObject.list)
                        } else {
                            resolve('Could not load the content')
                        }
                    }, {'lrnLsnPrtId__lrnPrtPlnId__lrnPlnTitle': courseName})
                })
            },

            sortLessonIDs(treeViewItems){
                let orderedItems = [];
                treeViewItems.forEach(section => {
                   section.children.forEach(lesson => orderedItems.push(parseInt(lesson.id)))
                });
                //treeViewItems.map((section) => {orderedItems.push(section.children.map(elt => elt))})
                return orderedItems;
            }
        },
        async created() {
            console.log("LessonItem CREATED");
            //Get the lesson to display on the page
            let lesson = await this.fetchLesson(this.$route.params.lessonId);
            this.displayedLesson = Lesson.formatFromSimplicite(lesson);
            this.$store.commit('updateCurrentLessonId', parseInt(this.displayedLesson.row_id))

            /*

            //Get the sections from the same course
            let sections = await this.fetchSectionsFromCourse(this.displayedLesson.courseName);
            let tvSections = await sections.map((elt) => ({id: elt.row_id, name: elt.lrnPrtTitle, children: []}));

            //Get the other lessons from the same course
            let lessons = await this.fetchLessonsFromCourseID(this.displayedLesson.courseName);
            let tvLessons = await lessons.map((elt) => ({id: elt.row_id, name: elt.lrnLsnTitle, sectionId: elt.lrnLsnPrtId}));

            //For each lesson, if the sectionId is the same as a sectionId present in the tvSections array, we push this lesson as a children of the array
            for(let i = 0; i < tvLessons.length; i++){
                for (let j = 0; j < tvSections.length; j++) {
                    if(tvLessons[i].sectionId === tvSections[j].id){
                        tvSections[j].children.push(tvLessons[i])
                    }
                }
            }
            this.$store.commit('updateTreeViewItems', tvSections);

            //Get the other lessons IDs from the same course
            let orderedLessonIDs = this.sortLessonIDs(tvSections);
            console.log(orderedLessonIDs);
            this.$store.commit('setOtherLessonsIDs', orderedLessonIDs);
*/

        },


        async mounted() {
            console.log("LessonItem MOUNTED");
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    [v-cloak] {
        display: none;
    }

    /*PAGE */
    #lesson-item-wrapper {
        display: flex;
    }

    #learning-outcomes, #general-concepts, #exercise {
        display: flex;
        flex-flow: column nowrap;
    }

    #textual-content {
        display: flex;
        flex-flow: column nowrap;
        overflow: hidden;
    }

    #support-content {
        position: fixed;
        right: 0;
        display: flex;
        flex-flow: column;
        height: 100%;
    }

    #video-container {
        height: 40%;
        display: flex;
        align-items: center;
    }

    #pdf-container {
        justify-content: center;
        height: 45%;
        margin-bottom: 3%;
    }

    .lesson-title {
        font-size: 2em;
    }

    .sub-part-title {
        font-size: 2em;
    }

    .gen-concept-subtitle {
        font-size: 0.8em;
    }

    .step-title {
        color: black;
        font-size: 1em;
    }

    .sl-number {
        font-size: 1em;
        color: black;
    }


</style>

