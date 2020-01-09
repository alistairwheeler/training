<template>
        <div id="wrapper">

           <!-- <h1 class="list-title">Tous les cours disponibles :</h1> -->

            <ItemList class="element-list" :category-path="categoryPath"/>

        </div>
</template>

<script>
    /* eslint-disable no-console,no-unused-vars */
    import ItemList from './ItemList';

    export default {
        name: 'Courses',
        components: {ItemList},
        data: () => ({
            categoryPath: '',
        }),
        //LIFECYCLE HOOKS
        created() {
            console.log("Courses CREATED");
            let splittedRoutePath = this.$router.currentRoute.path.split("courses/");
            this.categoryPath = splittedRoutePath[1] ? splittedRoutePath[1] : '';
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";

    #wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: map-get($paddings, x-large);
    }

    .element-list {
        width: 80%;
    }

    h1 {
        margin-top: map-get($margins, medium);
        color: $color-secondary;
    }

    .list-title {
        margin-top: map-get($margins, medium);
        margin-bottom: map-get($margins, medium);
    }
</style>
