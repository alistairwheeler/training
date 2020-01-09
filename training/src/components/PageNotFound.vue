<template>
    <div id="wrapper">
        <h1 class="mx-auto">404 NOT FOUND, sorry, this page doesn't exist</h1>
    </div>

</template>

<script>
    export default {
        name: 'PageNotFound',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    @import "../assets/sass/utils/variables";

    h1 {
        color: black;
        font-size: $h1-size;
    }

    #wrapper {
        height: 80vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
