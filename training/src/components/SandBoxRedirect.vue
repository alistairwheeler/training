<template>
    <div id="sandbox-redirect">
        <img class="sandbox-image" src="https://megastuces.com/wp-content/uploads/2017/02/sandbox.png" alt="sandbox image">
        <h2 class="opening-message">Nous sommes en train d'ouvrir votre sandbox, vous recevrez bientot un 2ème email contenant un lien pour l'essayer</h2>
    </div>
</template>

<script>
    export default {
        name: 'SandBoxRedirect',

        created() {
            let demandId = this.$router.currentRoute.path.split("/sandbox/")[1];
            let baseURL = "https://portalpr.dev.simplicite.io/ext/PorIsdService?identifier=";
            let req = new XMLHttpRequest();
            req.open("GET", baseURL + demandId, false);
            req.send(null);
            console.log(req.responseText);
        }
    }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

    #sandbox-redirect {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

     .sandbox-image, .opening-message {
        margin-top: 30px;
    }
</style>
