<template>
    <div class="item-list-wrapper">
        <v-card class="item-prev" @click="onListItemClicked(item)" v-for="item in listToDisplay" :key="item.row_id">
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
    import {CATEGORY, CONTENT, ListItem} from "../Models/ListItem";


    export default {
        name: 'ItemList',
        props: ["itemType", "categoryPath"],
        data: () => ({
            listToDisplay: [],
            redirectToLesson: false,
        }),
        computed: {
            ...mapGetters([
                'categoriesAsListItems',
                'allCategoriesLoaded',
                'allChildrenAsItemList',
                'allItemsLoaded',
            ])
        },
        methods: {

            onListItemClicked(item) {
                if(item.itemType === CATEGORY){
                    this.$router.push('/courses' + item.path);
                } else if (item.itemType === CONTENT){
                    this.$router.push('/lessonItem' + item.path)
                } else {
                    console.error("there is an error on the itemType, it is : " + item.itemType)
                }
            },
        },
        async created() {

            if(this.categoryPath === ''){ //Displaying every category
                console.log("Loading everyCategory");
                let payload = {
                    smp: this.$smp,
                    categoryPath: this.categoryPath
                };
                if(this.allCategoriesLoaded && this.allItemsLoaded){
                    this.listToDisplay = this.categoriesAsListItems;
                } else {
                    await this.$store.dispatch('fetchCategories', payload)
                        .then(() => { this.listToDisplay = this.categoriesAsListItems });
                }
            } else {
                console.log("Loading children of a category");
                let payload = {
                    smp: this.$smp,
                    categoryPath: this.categoryPath
                };

                if (this.allCategoriesLoaded && this.allItemsLoaded){
                    this.listToDisplay = this.allChildrenAsItemList(this.categoryPath);
                } else {
                    await this.$store.dispatch('getCategoriesFromParent', payload)
                        .then(() => this.$store.dispatch('getLessonsFromCategory', payload))
                        .then(() => this.listToDisplay = this.allChildrenAsItemList(this.categoryPath));
                }
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


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
        //color: #272635;
    }

    .item-prev__short-description {
        font-size: 1.2rem;
    }

    .item-prev__long-description {
        padding-right: 10px;
        font-size: 1rem;
    }
</style>
