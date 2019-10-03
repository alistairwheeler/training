<template>
    <div id="homepage-container">
        <!--<div id="page-title-container">
            <h1>Welcome to Simplicité's training platform</h1>
        </div>-->
        <div id="headline">
            <div>
                <p>Discover Simplicité through the training platform</p>
            </div>

            <div class="button-container">
                <v-btn id="header-btn"  color="deep-purple" x-large @click="goToCourses()" >LET'S GO</v-btn>
            </div>
        </div>

        <h2 class="homepage-subtitle">What's the purpose of this platform ?</h2>
        <p>To help you train in complete autonomy, so you can master Simplicité and build powerful applications for your
            company.  </p>
        <h2 class="homepage-subtitle">How are we going to achieve it ?</h2>
        <p>Simplicité's team prepared several courses for you to become an expert, learning at your own pace.
            You're also going to practice your new skills with the exercices we created, where you'll be guided step by step
            to make sure you understand the platform.</p>
        <div class="button-container">
            <v-btn text class="action-btn" @click="goToCourses()">LET'S GO</v-btn>
        </div>

    </div>
</template>

<script>
    export default {
        name: 'HomePage',
        props: {
        },
        methods: {
            goToCourses() {
                this.$router.push('/courses')
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #homepage-container {
        width: 100%;
        height: 100%;
    }
    #headline {
        position: relative;
        width: 100%;
        height: 600px;
        display: flex;
        flex-direction: column;
        padding: 20px;
        background-image: url("https://simplicite.fr/wp-content/uploads/img/banner-header-blue.jpg");
        background-size: cover;
    }
    .button-container {
        align-self: center;
        position: absolute;
        bottom: 20px;
    }

    #header-btn {
        color: white;
    }
    #headline p {
        color: white;
        text-justify: auto;
        font-size: 3em;
    }
    #page-title-container{
        display: flex;
    }
    h1 {
        color: #514FBF;
    }

    .homepage-subtitle {
        color: #514FBF;
    }

    .action-btn {
        color: orange;
        font-size: 2em;
    }



</style>
