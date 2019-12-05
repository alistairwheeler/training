<template>
    <div id="lesson-item-wrapper">
        <div id="wrapper">
            <h1 >Tous les cours disponibles :</h1>

            <ItemList itemType="courses" course-id="courseId"></ItemList>

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
                courseId:0,
        }),

        //LIFECYCLE HOOKS
        created() {
            console.log("Courses CREATED");
        },

        destroyed() {
            console.log("Courses DESTROYED");
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

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
        margin-top: 20px;
        color: #5edbb6;
    }
</style>
