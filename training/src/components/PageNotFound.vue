<template>
        <div id="not-found">
                <h1 class="mx-auto">404 NOT FOUND, sorry, this page doesn't exist</h1>
        </div>

</template>

<script>
    export default {
        name: 'PageNotFound',
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    h1 {
        color: black;
        font-size: 4rem;
    }

    #not-found {
            height: 80vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
    }
</style>
