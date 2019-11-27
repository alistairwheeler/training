<template>
    <div class="item-list-wrapper">
        <v-card class="item-prev" @click="redirect(item)" v-for="item in listToDisplay" :key="item.row_id">
            <div class="item-prev__picture-container">
                <img class="item-prev__picture" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                     alt="course logo"/>
            </div>

            <div class="item-prev__info-container">
                <h2 class="item-prev__name ">{{item.title}}</h2>
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
                'courses',
                'lessons',
                'coursesAsItemList',
                'lessonsAsItemList',
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
            if (this.itemType === "courses") {
                console.log("displaying courses");
                let coursesAsItemList = this.coursesAsItemList;
                //let coursesAsItemList = this.coursesAsItemList;
                if (coursesAsItemList.length === 0) {
                    await this.fetchCourses(this.$smp)
                        .then(() => this.listToDisplay = this.coursesAsItemList)
                } else {
                    this.listToDisplay = coursesAsItemList;
                }

            } else if (this.itemType === "lessons") {
                console.log("displaying lessons");

                if (this.lessons.length === 0) { //If The store is empty
                    if (parseInt(this.courseId) !== 0) { //If we want a particular course ...
                        let payload = {
                            smp: this.$smp,
                            courseId: this.courseId
                        };
                        await this.$store.dispatch('fetchLessonsFromCourseID', payload)
                            .then(() => this.listToDisplay = this.lessonsAsItemList)

                    } else { // ... Or all the lessons
                        await this.fetchAllLessons(this.$smp)
                            .then(() => this.listToDisplay = this.lessonsAsItemList)
                    }
                } else { //If the store is not empty
                    if (this.lessons[0].lrnLsnPrtId__lrnPrtPlnId === parseInt(this.courseId)) { //If they are from the same course as what we want
                        //TODO: simply display the lessons
                        console.log("Store NOT empty + same course as before : " + this.courseId);
                        this.listToDisplay = this.lessonsAsItemList;
                    } else if (parseInt(this.courseId) === 0) {
                        await this.fetchAllLessons(this.$smp)
                            .then(() => this.listToDisplay = this.lessonsAsItemList)
                    } else {
                        let payload = {
                            smp: this.$smp,
                            courseId: this.courseId
                        };
                        await this.$store.dispatch('fetchLessonsFromCourseID', payload)
                            .then(() => this.listToDisplay = this.lessonsAsItemList)
                    }
                }
            }
        },
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
        font-size: 1.3rem;
        color: #387ED1;
    }

    .item-prev__short-description {
        font-size: 1.4rem;
    }

    .item-prev__long-description {
        padding-right: 10px;
    }
</style>
