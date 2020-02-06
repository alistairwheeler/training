<template>
    <div class="wrapper"> <!-- Here in case we want to add something to this view -->
        <v-card class="item-prev" @click="onListItemClicked(item)" v-for="item in listToDisplay" :key="item.row_id">
            <div class="item-prev__picture-container">
                <!--                <img class="item-prev__picture"
                                     src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
                                     alt="course logo"/>-->
                <img v-if="item.pictureUrl !== undefined"
                     class="item-prev__picture"
                     :src="item.pictureUrl"
                     alt="course logo"/>
                <img v-else
                     class="item-prev__picture"
                     src="./../../public/Logo_Simplicite_Noir.png"
                     alt="course logo"/>
            </div>

            <div class="item-prev__info-container">
                <h2 class="item-prev__name">{{item.title}}</h2>
                <p class="item-prev__long-description">{{item.longDescription}}</p>
            </div>
        </v-card>
    </div>
</template>

<script>
    /* eslint-disable no-unused-vars,no-console */

    import {mapGetters} from 'vuex'
    import {CATEGORY, CONTENT} from "../Models/ListItem";


    export default {
        name: 'ItemList',
        props: ["categoryPath"],
        data: () => ({
            listToDisplay: [],
            redirectToLesson: false,
        }),
        computed: {
            ...mapGetters([
                'categoriesAsListItems',
                'ancestorCategoriesAsListItems',
                'allCategoriesLoaded',
                'allChildrenAsItemList',
                'childrenCategories',
                'childrenLessons',
                'allItemsLoaded',
            ])
        },
        methods: {

            onListItemClicked(item) {
                if (item.itemType === CATEGORY) {
                    this.$router.push('/courses' + item.path);
                } else if (item.itemType === CONTENT) {
                    this.$router.push('/lessonItem' + item.path)
                } else {
                    console.error("there is an error on the itemType, it is : " + item.itemType)
                }
            },

            async addPictureToCategories(categoryList) {
                const urlPromises = categoryList.map(async category => {
                    return this.getCategoryPicture(category);
                });
                return await Promise.all(urlPromises)
                    .then(urlArray => {
                        urlArray.forEach((url, index) => categoryList[index].pictureUrl = url);
                        return categoryList;
                    }).catch(err => console.log(err));

            },

            async getCategoryPicture(category) {
                const payload = {
                    smp: this.$smp,
                    categoryId: category.row_id
                };
                return this.$store.dispatch('fetchCategoryPicture', payload)
            },

            async addPictureToLessons(lessonList) {
                const urlPromises = lessonList.map(async lesson => {
                    return this.getLessonPicture(lesson);
                });
                return await Promise.all(urlPromises)
                    .then(urlArray => {
                        urlArray.forEach((url, index) => lessonList[index].pictureUrl = url[0]);
                        return lessonList;
                    }).catch(err => console.log(err));

            },

            async getLessonPicture(lesson) {
                const payload = {
                    smp: this.$smp,
                    lessonId: lesson.row_id
                };
                return this.$store.dispatch('fetchLessonsPictureURLs', payload)
            },

        },
        async created() {

            let payload = {
                smp: this.$smp,
                categoryPath: this.categoryPath
            };
            if (this.categoryPath === '') { //Displaying every category
                console.log("Displaying every category");
                if (this.allCategoriesLoaded) {
                    await this.addPictureToCategories(this.ancestorCategoriesAsListItems)
                        .then(categoryList => this.listToDisplay.push(...categoryList));
                } else {
                    await this.$store.dispatch('fetchCategories', payload)
                        .then(async () => {
                            return await this.addPictureToCategories(this.ancestorCategoriesAsListItems)
                        })
                        .then(categoryList => this.listToDisplay.push(...categoryList))
                }
            } else {
                await this.$store.dispatch('fetchCategories', payload)
                    .then(() => this.$store.dispatch('fetchLessonsFromCategory', payload))
                    .then(async () => {
                        await this.addPictureToCategories(this.childrenCategories(this.categoryPath))
                            .then(categoryList => this.listToDisplay.push(...categoryList));
                        await this.addPictureToLessons(this.childrenLessons(this.categoryPath))
                            .then(lessonList => this.listToDisplay.push(...lessonList));
                    })
            }
            if (this.listToDisplay.length === 0) {
                console.error("Nothing to display in this category")
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";

    .wrapper {
        display: flex;
        flex-flow: column nowrap;
    }

    .item-prev {
        min-height: 200px;
        display: flex;
        position: relative;
        margin-bottom: map-get($margins, medium);
        transform: scale(1);
        transition: transform $long-hover-duration;

        &:hover {
            transform: scale(1.01);
            transition: transform $short-hover-duration;
        }

        &__name {
            font-size: nth($title-size, 4);
        }

        &__picture-container {
            width: $preview-pic-container-width;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__picture {
            height: $preview-pic-height;
            width: $preview-pic-width;
        }

        &__info-container {
            width: 100%-$preview-pic-container-width;
            padding-top: 25px;

        }

        &__short-description {
            font-size: nth($title-size, 5);
        }

        &__long-description {
            padding-right: map-get($paddings, medium);
            font-size: nth($title-size, 5);
        }
    }

</style>
