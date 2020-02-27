<template>
    <div id="courses-wrapper" class="wrapper"> <!-- Here in case we want to add something to this view -->
        <v-card class="item-prev" @click="onListItemClicked(item)" v-for="item in listToDisplay" :key="item.row_id + item.name">
            <div class="item-prev__picture-container">
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
                <h2 class="item-prev__name">{{item.name}}</h2>
                <p class="item-prev__long-description">{{item.description}}</p>
            </div>
        </v-card>

    </div>
</template>

<script>
    /* eslint-disable no-unused-vars,no-console */

    import {mapGetters} from 'vuex'
    import {CATEGORY, LESSON} from "../Helper";

    export default {
        name: 'ItemList',
        props: ["categoryPath"],
        data: () => ({
            listToDisplay: [],
            redirectToLesson: false,
        }),
        computed: {
            ...mapGetters([
                'tree',
                'treeAsVuetifyTree',
            ])
        },
        methods: {
            onListItemClicked(item) {
                if (item.type === CATEGORY) {
                    this.$router.push('/courses' + item.path);
                } else if (item.type === LESSON) {
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

            generatePlan(category){
                console.log("============ GENERATING DETAILS ===========");
                let title = document.createTextNode(category.trnCatTitle);
                let catDescription = document.createTextNode(category.trnCatDescription);

                let details = document.createElement("details");
                let summary = document.createElement("summary");
                let span = document.createElement("span");
                    span.classList.add('map-element__title');
                span.appendChild(title);
                summary.append(span)
                details.append(summary);

                console.log("Details before description : ")
                console.log(details)

                if(catDescription.wholeText !== "null" && catDescription.wholeText !== "" && catDescription.wholeText !== null) {
                    let description = document.createElement("h3");
                    description.appendChild(catDescription);
                    details.append(description)
                }


                let wrapper = document.getElementById("sitemap");
                wrapper.append(details);

            }
        },
        async created() {
            console.log("ITEMLIST CREATED. treeview : ");
            let categoryPath = this.$router.currentRoute.path.split("courses/")[1];
            console.log(categoryPath)
            let payload = {
                smp: this.$smp,
                categoryPath: this.categoryPath
            };
            //TODO: Use the tree object in the store to populate the screen
            this.listToDisplay.push(...this.treeAsVuetifyTree)



/*            if (this.categoryPath === '') { //Displaying every category
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
            }*/
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

    @import "../assets/sass/utils/variables";

    .wrapper {
        display: flex;
        flex-flow: column nowrap;
        padding: 0;
        margin: 0;
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

    #sitemap {
        summary {
            color: green;
            background-color: orange;
        }
    }

</style>
