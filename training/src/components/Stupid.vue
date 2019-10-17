<template>
    <div id="stupid-wrapper">
        <h1 class="mx-auto" >{{currentId}}</h1>
    </div>
</template>

<script>
    export default {
        name: 'Stupid',
        computed: {
            currentId: function () {
                return this.$parent.$store.state.currentLessonId
            }
        },
        created() {
            //console.log(this.$store.state)
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h1 {
        color: black;
        font-size: 4em;
    }
</style>
