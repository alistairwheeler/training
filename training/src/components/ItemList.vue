<template>
    <div class="item-list-wrapper">
        <v-card class="item-prev" @click="redirect(item)" v-for="item in listToDisplay" :key="item.row_id">
            <div class="item-prev__picture-container">
                <img class="item-prev__picture" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                     alt="course logo"/>
            </div>

            <div class="item-prev__info-container">
                <h2 class="item-prev__name">{{item.title}}</h2>
                <h3 class="item-prev__short-description">{{item.shortDescription}}</h3>
                <p class="item-prev__long-description">{{item.longDescription}}</p>
            </div>
        </v-card>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars,no-console */

    import {mapActions} from 'vuex'
    import {mapGetters} from 'vuex'


    export default {
        name: 'ItemList',
        props: ["itemType", "courseId"],
        data: () => ({
            listToDisplay: [],
            redirectToLesson: false,
        }),
        computed: {
            ...mapGetters([
                'allLessonsLoaded',
                'courses',
                'lessons',
                'lessonsFromCourseAsListItems',
                'lessonsFromSectionAsListItems',
                'coursesAsListItems',
                'lessonsAsListItems',
                'displayedLesson',
            ])
        },
        methods: {
            ...mapActions([
                'fetchCourses', // map `this.increment()` to `this.$store.dispatch('increment')`

                // `mapActions` also supports payloads:
                'fetchAllLessons', // map `this.incrementBy(amount)` to `this.$store.dispatch('incrementBy', amount)`

                'fetchLessonsFromCourseID',
            ]),
            redirect(item) {
                if (this.itemType !== "courses") {
                    this.$router.push('/lessonItem/' + item.row_id)
                } else if (this.itemType === "courses") {
                    this.$router.push('/lessons/' + item.row_id)
                }
            },
        },
        async created() {
            let allLessonsLoaded = this.allLessonsLoaded;
            console.log("allLessonsLoaded : " + allLessonsLoaded);

            if (this.itemType === "courses") {
                console.log("displaying courses");
                let coursesToDisplay = this.coursesAsListItems;
                if (coursesToDisplay.length === 0) {
                    await this.fetchCourses(this.$smp)
                        .then(() => this.listToDisplay = this.coursesAsListItems)
                } else {
                    this.listToDisplay = coursesToDisplay;
                }

            } else if (this.itemType === "lessons") {
                console.log("displaying lessons");
                let courseId = parseInt(this.courseId);
                console.log("courseId : " + courseId)

                if (allLessonsLoaded === true) { //Si toutes les leçons ont été fetchées à un moment, on se contente de trier selon ce qu'on veut afficher
                    if (courseId === 0 ){//if (courseId === 0 && this.lessonsFromCourseAsListItems(courseId).length > 0) //Si on veut les leçons d'un cours précis ET si elles sont dans le store
                        this.listToDisplay = this.lessonsAsListItems;
                    } else{
                        this.listToDisplay = this.lessonsFromCourseAsListItems(this.courseId)
                    }

                } else if (allLessonsLoaded === false) {
                    console.log("all lessons WERE NOT loaded previously");
                    if (courseId !== 0 && this.lessonsFromCourseAsListItems(courseId).length > 0) { //Leçons d'un cours sont dans le store
                        console.log("lessons from course : " + courseId + " from store");
                        this.listToDisplay = this.lessonsFromCourseAsListItems(this.courseId)
                    } else if(courseId !== 0) { //Si elles ne sont pas dans le store
                        console.log("lessons from course : " + courseId + " fetched from the web");
                        let payload = {
                            smp: this.$smp,
                            courseId: courseId
                        };
                        await this.$store.dispatch('fetchLessonsFromCourseID', payload)
                            .then(() => this.listToDisplay = this.lessonsFromCourseAsListItems(courseId))
                    }else  {
                        console.log("fetching all lessons from the web");
                        await this.fetchAllLessons(this.$smp).then(() => {
                            console.log("this.lessonsAsListItems");
                            console.log(this.lessonsAsListItems);
                            this.listToDisplay = this.lessonsAsListItems
                        })
                    }
                }
            } else if (this.itemType === 'sections') {
                console.log("displaying sections");
                if (allLessonsLoaded) {
                    this.listToDisplay = this.lessonsFromSectionAsListItems(this.courseId)
                } else {
                    let payload = {
                        smp: this.$smp,
                        sectionId: parseInt(this.courseId)
                    };
                    await this.$store.dispatch('fetchLessonsFromSection', payload)
                        .then(() => {
                            this.listToDisplay = this.lessonsFromSectionAsListItems(this.courseId);
                        })
                }

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .item-list-wrapper {
        display: flex;
        flex-direction: column;
    }

    .item-prev {
        width: 100%;
        min-height: 200px;
        display: flex;
        margin-bottom: 30px;
        position: relative;
        transform: scale(1);
        transition: transform 400ms;

    }

    .item-prev:hover {
        transform: scale(1.01);
        transition: transform 200ms;
    }

    .item-prev__picture-container {
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .item-prev__picture {
        height: 70%;
        width: 80%;
        border: solid black 0.3px;
    }

    .item-prev__info-container {
        width: 70%;
        padding-top: 25px;
    }

    .item-prev__name {
        font-size: 1.6rem;
        color: #272635;
    }

    .item-prev__short-description {
        font-size: 1.2rem;
    }

    .item-prev__long-description {
        padding-right: 10px;
        font-size: 1rem;
    }
</style>
