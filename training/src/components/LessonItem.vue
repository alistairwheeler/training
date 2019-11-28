<template>
    <div id="lesson-item-wrapper" v-cloak>
        <div class="lesson-content col-6">

            <h1 class="lesson-title smp-blue"><span class="underlined">{{lessonToDisplay.title}}</span></h1>

            <v-breadcrumbs :items="breadCrumbItems" divider=">"></v-breadcrumbs>

            <div class="lesson-content__lrn-outcomes" v-if="lessonToDisplay.learningOutcomes">
                <h2 class="section-title">Objectifs Pédagogiques</h2>
                <div id="learning-outcomes-container" v-html="lessonToDisplay.learningOutcomes"></div>
            </div>

            <div class="lesson-concepts" v-if="lessonToDisplay.genConcepts">
                <div id="concepts-container" v-html="lessonToDisplay.genConcepts"></div>
            </div>
        </div>

        <div id="aside-content" class="col-6">
            <div id="pdf-container">
                <embed :src="lessonToDisplay.pdfUrl" type="application/pdf" width="100%" height="100%">
            </div>

            <div id="video-container">
                <iframe width="100%" height="100%" :src="lessonToDisplay.videoUrl"
                        frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                </iframe>
            </div>
        </div>

        <h1 id="error-message">Sorry, we could not load this lesson</h1>

    </div>

</template>

<script>
    /* eslint-disable no-console,no-unused-vars,no-undef */

    import {Lesson} from "../Models/Lesson";
    import {mapGetters} from 'vuex';
    import {mapActions} from 'vuex';

    export default {
        name: 'LessonItem',
        data: () => ({
            lessonToDisplay: {},
            breadCrumbItems: []
        }),
        computed: {
            ...mapGetters([
                'allLessonsLoaded',
                'courses',
                'lessons',
                'lessonWithId',
                'lessonsFromCourseAsListItems',
                'lessonsFromSectionAsListItems',
                'coursesAsListItems',
                'lessonsAsListItems',
                'displayedLesson',
            ])
        },
        methods: {
            //---------- SIMPLICITE DATA FETCHING & TREATMENTS ------------
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
                        resolve(treeView.list)
                    }, 'lrnTreeView', {service: 'page', object: 'LrnPlan', rowid: courseID, child: 'LrnPart'})
                });
            },

            convertSmpTreeView(smpTreeView) {
                //Retrieve the sections :
                let sections = smpTreeView.map(globalSection => globalSection.item); //item est réellement l'objet section, les sections sont donc récupérées
                //Convert the sections to vuetify treeView objects
                let tvSections = sections.map((elt) => ({id: elt.row_id, name: elt.lrnPrtTitle, children: []}));

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
                    sectionId: elt.lrnLsnPrtId,
                    order: elt.lrnLsnOrder,
                }));
                //For each lesson, if the sectionId is the same as a sectionId present in the tvSections array, we push this lesson as a children of the array
                for (let i = 0; i < tvLessons.length; i++) {
                    for (let j = 0; j < tvSections.length; j++) {
                        if (tvLessons[i].sectionId === tvSections[j].id) {
                            tvSections[j].children.push(tvLessons[i])
                        }
                    }
                }
                //Now, for each section, we take the lessons in it (children) and order them by their order field
                for (let j = 0; j < tvSections.length; j++) {
                    tvSections[j].children.sort((les1, les2) => les1.order - les2.order);
                }
                this.$store.commit('UPDATE_TREE_VIEW_ITEMS', tvSections);

                return tvSections;
            },

            sortLessonIDs(treeViewItems) {
                let orderedIDs = [];
                treeViewItems.forEach(section => {
                    section.children.forEach(lesson => orderedIDs.push(parseInt(lesson.id)))
                });
                return orderedIDs;
            },

        },
        async created() {
            let lessonId = parseInt(this.$route.params.lessonId);
            let smpLesson = this.lessonWithId(lessonId);
            this.$store.commit('UPDATE_CURRENT_LESSON_ID', lessonId);

            if (smpLesson !== undefined) { //Si la leçon est présente, toutes celles du même cours aussi
                console.log("smpLesson IS defined");
                this.lessonToDisplay = Lesson.formatFromSimplicite(smpLesson);
                /*let payload = {
                    smp: this.$smp,
                    courseId: parseInt(this.lessonToDisplay.courseId)
                };
                this.$store.dispatch('fetchTreeViewFromCourse', payload); //TODO: change the treeview items*/

            } else if (smpLesson === undefined){
                console.log("smpLesson NOT defined");
                let payload = {
                    smp: this.$smp,
                    lessonId: lessonId
                };
                this.$store.dispatch('fetchLesson', payload)
                    .then(() => this.lessonToDisplay = Lesson.formatFromSimplicite(this.$store.getters.lessonWithId(lessonId)))
                    /*.then(() => {
                        payload.courseId = parseInt(this.$store.getters.displayedLesson.lrnLsnPrtId__lrnPrtPlnId);
                        this.$store.dispatch('fetchLessonsFromCourseID', payload)
                    })
                    .then(()=> this.$store.dispatch('fetchTreeViewFromCourse', payload) ); //TODO fetch the treeview*/
            }
            let payload = {
                smp: this.$smp,
                courseId: parseInt(this.lessonToDisplay.courseId)
            };
            this.$store.dispatch('fetchTreeViewFromCourse', payload)

            /*
                        //TODO : modify this component to match the new way of working of the store

                        console.log("Lesson id : " + lessonId);

                        //2.1 fetch the lesson in the list of lessons in the store :
                        let smpLesson = this.$store.getters.lessonWithId(lessonId);

                        if (smpLesson !== undefined) { //format it and save it in displayedLesson in the store
                            let formattedLesson = Lesson.formatFromSimplicite(smpLesson);
                            this.$store.commit('UPDATE_DISPLAYED_LESSON', formattedLesson);

                        } else { //2.2 if the lesson doesn't exist, then fetch the lessons from the same section and create the treeview
                            console.log("the lesson is not in the store");
                            let payload = {
                                smp: this.$smp,
                                lessonId: lessonId
                            };
                            this.$store.dispatch('fetchLesson', payload) //Récupère la leçon et la stocke dans le store (displayedLesson)
                                .then(() => {
                                    payload.courseID = this.lessonToDisplay.row_id;
                                    this.$store.dispatch('fetchTreeViewFromCourse', payload) //récupérer le treeview (fetch its, sorts it and sets other_lessons_ids
                                });

                            //3.
                        }*/

            /*await this.fetchLesson(lessonId)
                .then(lesson => {
                    this.lessonToDisplay = Lesson.formatFromSimplicite(lesson);
                    // Populate the breadcrumb (fil d'Arianne)
                    this.breadCrumbItems.push({
                        text: lesson.lrnLsnPrtId__lrnPrtPlnId__lrnPlnTitle,
                        disabled: false,
                        href: '/lessons/' + lesson.lrnLsnPrtId__lrnPrtPlnId
                    })
                    this.breadCrumbItems.push({
                        text: lesson.lrnLsnPrtId__lrnPrtTitle,
                        disabled: false,
                        href: '/lessons/' + lesson.lrnLsnPrtId__lrnPrtPlnId
                    })
                    this.breadCrumbItems.push({text: lesson.lrnLsnTitle, disabled: false})
                    return lesson; //Doesn't work with resolve(lesson); see : https://stackoverflow.com/questions/27715275/whats-the-difference-between-returning-value-or-promise-resolve-from-then
                }, err => console.log("error fetching lesson"))
                .then(lesson => this.fetchTreeViewFromCourse(parseInt(lesson.lrnLsnPrtId__lrnPrtPlnId)),
                    err => console.log("error fetching treeView"))
                .then(smpTreeView => this.convertSmpTreeView(smpTreeView),
                    err => console.log("error converting smpTreeView"))
                .then(treeView => this.sortLessonIDs(treeView),
                    err => console.log("error sorting IDs"))
                .then(orderedLessonIDs => this.$store.commit('UPDATE_OTHER_LESSONS_IDs', orderedLessonIDs),
                    err => console.log("error updating store IDs"))
                .then(() => this.$store.commit('UPDATE_CURRENT_LESSON_ID', parseInt(this.lessonToDisplay.row_id)),
                    err => console.log("error updating store current id"))
                .then(() => document.getElementById("lesson-item-wrapper").style.visibility = "visible")
                .catch(err => console.error(err));*/
        },
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    [v-cloak] {
        display: none;
    }

    #error-message {
        visibility: hidden;
    }

    /* ----- LESSON CONTENT ----- */
    #lesson-item-wrapper {
        display: flex;
    }

    .lesson-content__lrn-outcomes, .lesson-concepts {
        display: flex;
        flex-flow: column nowrap;
    }

    .lesson-content {
        display: flex;
        flex-flow: column nowrap;
        overflow: hidden;
    }

    .lesson-title {
        font-size: 3rem;
        font-weight: bold;
        text-decoration: underline;
        text-underline-position: under;
        margin-bottom: 20px;
    }


    .lesson-content >>> h2, .exercise >>> h2 { /*Syntax needed because of view loader : https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
        font-size: 2.2rem;
        font-weight: bold;
        padding-bottom: 3px;
        border-bottom: solid #d2d2d2 1px;
    }

    .lesson-content >>> h3, .section-title { /*Syntax needed because of view loader : https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors*/
        font-size: 1.8rem;
        font-weight: bold;
    }

    .lesson-content >>> h4 {
        font-size: 1.5rem;
    }

    .lesson-content >>> h5 {
        font-size: 1.2rem;
    }

    .lesson-content >>> h6 {
        font-size: 1.1rem;
    }

    .lesson-content >>> p {
        text-align: justify;
    }

    /* ----- VIDEO & PDF -----*/
    #aside-content {
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

</style>

