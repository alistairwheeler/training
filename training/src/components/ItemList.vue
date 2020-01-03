<template>
    <div class="item-list-wrapper">
        <v-card class="item-prev" @click="onListItemClicked(item)" v-for="item in listToDisplay" :key="item.row_id">
            <div class="item-prev__picture-container">
                <img class="item-prev__picture" src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
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
        },
        async created() {

            let payload = {
                smp: this.$smp,
                categoryPath: this.categoryPath
            };
            if (this.categoryPath === '') { //Displaying every category
                if (this.allCategoriesLoaded && this.allItemsLoaded) {
                    this.listToDisplay.push(...this.categoriesAsListItems);
                } else {
                    await this.$store.dispatch('fetchCategories', payload)
                        .then(() => this.listToDisplay.push(...this.categoriesAsListItems));
                }
            } else {
                if (this.allCategoriesLoaded && this.allItemsLoaded) {
                    this.listToDisplay.push(...this.childrenCategories(this.categoryPath));
                    this.listToDisplay.push(...this.childrenLessons(this.categoryPath));
                } else {
                    await this.$store.dispatch('getCategoriesFromParent', payload)
                        .then(() => this.$store.dispatch('getLessonsFromCategory', payload))
                        .then(() => {
                            this.listToDisplay.push(...this.childrenCategories(this.categoryPath));
                            this.listToDisplay.push(...this.childrenLessons(this.categoryPath));
                        })
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";

    .item-list-wrapper {
        display: flex;
        flex-direction: column;
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
