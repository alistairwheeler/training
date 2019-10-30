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
        data: function () {
            return {
                displayedLesson: {},
            }
        },
        methods: {
            //---------- SIMPLICITE DATA FETCHING & TREATMENTS ------------
            /**
             * Fetches the lesson with id given as argument
             * @returns {Promise<*>}
             */
            async fetchLesson(lessonId) {
                return new Promise((resolve, reject) => {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.get((response) => {
                        if (response) {
                            resolve(response);
                        } else
                            reject("Could not load the lesson");
                    }, lessonId)
                })
            },

            async fetchTreeViewFromCourse(courseID) {
                console.log("fetchTreeViewFromCourse");
                return new Promise((resolve, reject) => {
                    this.$smp.treeview((treeView) => {
                        console.log("treeView.list");
                        console.log(treeView.list);
                        resolve(treeView.list)
                    }, 'lrnTreeView', {service: 'page', object: 'LrnPlan', rowid: courseID, child: 'LrnPart'})
                });
            },

            convertSmpTreeView(smpTreeView) {
                console.log("convertSmpTreeView");
                //Retrieve the sections :
                let sections = smpTreeView.map(globalSection => globalSection.item); //item est réellement l'objet section, les sections sont donc récupérées
                //Convert the sections to vuetify treeView objects
                let tvSections = sections.map((elt) => ({id: elt.row_id, name: elt.lrnPrtTitle, children: []}));
                console.log("tvSections");
                console.log(tvSections);

                //Retrieve the lessons :
                let links = smpTreeView.map(globalSection => globalSection.links);
                let arrayOfSectionFolder = links.map(link => link[0].list);
                let lessons = [];
                arrayOfSectionFolder.forEach(arraySection => {
                    arraySection.forEach(lesson => lessons.push(lesson.item))
                });

                //Convert them to vuetify treeView objects and map them to the section
                let tvLessons = lessons.map((elt) => ({
                    id: elt.row_id,
                    name: elt.lrnLsnTitle,
                    sectionId: elt.lrnLsnPrtId
                }));
                console.log("tvLessons");
                console.log(tvLessons);
                //For each lesson, if the sectionId is the same as a sectionId present in the tvSections array, we push this lesson as a children of the array
                for (let i = 0; i < tvLessons.length; i++) {
                    for (let j = 0; j < tvSections.length; j++) {
                        if (tvLessons[i].sectionId === tvSections[j].id) {
                            tvSections[j].children.push(tvLessons[i])
                        }
                    }
                }
                this.$store.commit('updateTreeViewItems', tvSections);

                console.log("final treeView");
                console.log(tvSections);
                return tvSections;
            },

            sortLessonIDs(treeViewItems) {
                console.log("sortLessonIDs");
                let orderedIDs = [];
                treeViewItems.forEach(section => {
                    section.children.forEach(lesson => orderedIDs.push(parseInt(lesson.id)))
                });
                console.log("orderedIDs");
                console.log(orderedIDs);
                return orderedIDs;
            },

            // -------- UTILITY ---------
            displayErrorMessage() {
                console.error('There was an error with the request');
            }
        },
        async created() {
            let lessonId = this.$route.params.lessonId;

            await this.fetchLesson(lessonId)
                .then(lesson => {
                    this.displayedLesson = Lesson.formatFromSimplicite(lesson);
                    return lesson; //Doesn't work with resolve(lesson); see : https://stackoverflow.com/questions/27715275/whats-the-difference-between-returning-value-or-promise-resolve-from-then
                }, err => console.log("error fetching lesson"))
                .then(lesson => this.fetchTreeViewFromCourse(parseInt(lesson.lrnLsnPrtId__lrnPrtPlnId)), err => console.log("error fetching treeView"))
                .then(smpTreeView => this.convertSmpTreeView(smpTreeView), err => console.log("error converting smpTreeView"))
                .then(treeView => this.sortLessonIDs(treeView), err => console.log("error sorting IDs"))
                .then(orderedLessonIDs => this.$store.commit('setOtherLessonsIDs', orderedLessonIDs), err => console.log("error updating store IDs"))
                .then(() => this.$store.commit('updateCurrentLessonId', parseInt(this.displayedLesson.row_id)), err => console.log("error updating store current id"))
                .catch(err => this.displayErrorMessage());
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

