<template>
        <div id="stupid-wrapper">
                <h1 class="mx-auto">404 NOT FOUND, sorry, this page doesn't exist</h1>
        </div>

</template>

<script>
    export default {
        name: 'PageNotFound',
        props: {
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h1 {
        color: black;
        font-size: 4em;
    }

    #stupid-wrapper {
            height: 80vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
    }
</style>
