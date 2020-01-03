<template>
    <div id="lesson-item-wrapper">
        <div id="wrapper">
            <h1 class="courses-title">Tous les cours disponibles :</h1>

            <ItemList :category-path="categoryPath"></ItemList>

        </div>
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

    #lesson-item-wrapper {
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
        margin-top: map-get($margins, medium);
        color: $color-secondary;
    }

    .courses-title {
        margin-top: map-get($margins, medium);
        margin-bottom: map-get($margins, medium);
    }
</style>
