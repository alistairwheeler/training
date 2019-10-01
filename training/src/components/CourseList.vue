<template>
    <div id="container">
        <h1>Simplicité Training</h1>
<!--        <v-card class="course-item">
            <v-img  v-if="media"
                    class="white&#45;&#45;text"
                    height="200px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
            >
                <v-card-title class="align-end fill-height">I'm a title</v-card-title>
            </v-img>
        </v-card>-->

        <div class="course-item">
            <div class="course-left">
                <img class="course-picture" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg "/>
            </div>

            <div class="course-right">
                <h2 class="course-level">Course level</h2>
                <h3 class="course-short-description">Course short Description</h3>
                <p class="course-long-description">Course long Description</p>
            </div>

        </div>


    </div>
</template>

<script>
    export default {
        name: 'ListComponent',
        props: {
        },
        data: () => ({
            flat: false,
            media: true,
            loading: false,
            actions: true,
            outlined: false,
            elevation: undefined,
            raised: false,
            width: 344,
            height: undefined,
        }),
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    #container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .course-item {
        width: 70%;
        min-height: 100px;
        border-radius: 20px;
        border: solid black 1px;
        display: flex;
    }
    .course-left {
        width: 30%;
        background-color: beige;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .course-picture {
        max-width: 80%;
        max-height: 80%;
        min-width: 60%;
        min-height: 60%;
        background-color: coral;
        border: solid black 0.3px;
    }
    .course-right {
        width: 70%;
    }
</style>
