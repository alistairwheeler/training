<template>
    <div id="lessons-wrapper">
        <div id="wrapper">
            <h1 id="page-title" class="smp-purple">All available lessons </h1>

            <v-btn v-if="emptyList"
                   class="redirect-button"
                   outlined
                   color="#387ED1"
                   @click="redirectToCourses()">
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

            //------------ COMPONENT FUNCTIONS ------------
            onLessonClicked(lessonId) {
                this.$router.push('/lessonItem/'+lessonId);
            },

            getCourseColor() {
                    return 'course-name-blue'
            },

            redirectToCourses(){
                this.$router.push('/courses')
            },

            //---------- SIMPLICITE DATA FETCHING ------------
            async fetchTreeViewFromCourse(courseID){
                return new Promise((resolve, reject)=> {
                    this.$smp.treeview((treeView)=> {
                        resolve(treeView.list)
                    },'lrnTreeView', {service: 'page', object: 'LrnPlan', rowid: courseID, child: 'LrnPart'})
                });
            },

            convertSmpTreeView(smpTreeView){

                //Retrieve the sections :
                let sections = smpTreeView.map(globalSection => globalSection.item); //item est réellement l'objet section, les sections sont donc récupérées
                //Convert the sections to vuetify treeView objects
                let tvSections = sections.map((elt) => ({id: elt.row_id, name: elt.lrnPrtTitle, children: []}));
                //console.log("tvSections");
                //console.log(tvSections);

                //Retrieve the lessons :
                let links = smpTreeView.map(globalSection => globalSection.links);
                let arrayOfSectionFolder = links.map(link => link[0].list);
                let lessons = [];
                arrayOfSectionFolder.forEach(arraySection => {
                    arraySection.forEach(lesson => lessons.push(lesson.item))
                });

                //Convert them to vuetify treeView objects and map them to the section
                let tvLessons = lessons.map((elt) => ({id: elt.row_id, name: elt.lrnLsnTitle, sectionId: elt.lrnLsnPrtId}));
                //console.log("tvLessons");
                //console.log(tvLessons);
                //For each lesson, if the sectionId is the same as a sectionId present in the tvSections array, we push this lesson as a children of the array
                for(let i = 0; i < tvLessons.length; i++){
                    for (let j = 0; j < tvSections.length; j++) {
                        if(tvLessons[i].sectionId === tvSections[j].id){
                            tvSections[j].children.push(tvLessons[i])
                        }
                    }
                }
                this.$store.commit('updateTreeViewItems', tvSections);

                //console.log("final treeView");
                //console.log(tvSections);
                return tvSections;
            },

            sortLessonIDs(treeViewItems){
                let orderedIDs = [];
                treeViewItems.forEach(section => {
                    section.children.forEach(lesson => orderedIDs.push(parseInt(lesson.id)))
                });
                //console.log("orderedIDs");
                //console.log(orderedIDs);
                return orderedIDs;
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

            async fetchLessonsFromCourseID(courseId){
                return new Promise((resolve, reject) => {
                    let lessonObject = this.$smp.getBusinessObject("LrnLesson");
                    lessonObject.search(() => {
                        if (lessonObject.list){
                            console.log("lessonObject.list");
                            console.log(lessonObject.list);
                            resolve(lessonObject.list);
                        }
                         else {
                            reject("Could not load the content")
                        }
                    }, {"lrnLsnPrtId__lrnPrtPlnId": courseId});
                })
            },

            displayErrorMessage(){
                alert('There was an error with the request');
            }
        },
        //LIFECYCLE HOOKS
        async mounted() {
            if(this.$route.params.courseId){
                let courseId =  parseInt(this.$route.params.courseId);
                await this.fetchTreeViewFromCourse(courseId)
                    .then(smpTreeView=> this.convertSmpTreeView(smpTreeView))
                    .then(treeView => this.sortLessonIDs(treeView))
                    .then(orderedLessonIDs => this.$store.commit('setOtherLessonsIDs', orderedLessonIDs))
                    .then(() => this.fetchLessonsFromCourseID(courseId))
                    .then(lessons => {
                        if (Array.isArray(lessons) && lessons.length > 0) {
                            lessons.forEach((elt => {
                                this.displayedLessons.push(elt);
                            }));
                        } else {
                            this.emptyList = true;
                        }
                    })
                    .then(() => {
                        document.getElementById("page-title").innerText = "All available lessons for this course : ";
                    })
                    .catch(()=> this.displayErrorMessage());
            }
             else {
                 console.log("FETCHING ALL LESSONS");
                await this.fetchAllLessons()
                    .then(lessons => {
                        lessons.map((elt => {
                            this.displayedLessons.push(elt);
                        }));
                    }).catch(() => this.displayErrorMessage())
                //lessons = this.sortLessonsBySection(lessons);

            }

        },
        created() {
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
