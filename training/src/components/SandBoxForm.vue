<template>
    <div class="sandbox-demand">
        <div class="sandbox-form">
            <form >
                <p class="sandbox-form__element">
                    <label class="required">Votre adresse de messagerie</label>
                    <input id="email" class="sandbox-form__input" type="email" name="email" required/>
                </p>
                <p class="sandbox-form__element">
                    <label>Votre nom</label>
                    <input id="name" class="sandbox-form__input" type="text" name="name"/>
                </p>
                <p class="sandbox-form__element">
                    <label>Votre prénom</label>
                    <input id="firstName" class="sandbox-form__input" type="text" name="firstName"/>
                </p>
                <p class="sandbox-form__element">
                    <label>Votre société</label>
                    <input id="company" class="sandbox-form__input" type="text" name="company"/>
                </p>
                <p class="sandbox-form__element">
                    <label>Votre téléphone</label>
                    <input id="phone" class="sandbox-form__input" type="tel" name="phone"/>
                </p>
                <p class="sandbox-form__element">
                    <label>Votre profil</label>
                    <select id="profile" name="profile">
                        <option value="NA" selected>--</option>
                        <option value="Profil technique (IT)">Profil technique (IT)</option>
                        <option value="Profil métier">Profil métier</option>
                        <option value="Étudiant">Etudiant</option>
                        <option value="Autre">Autres</option>
                    </select>
                </p>
                <p>
                    <input id="newsletter" class="newsletter-input" type="checkbox" name="newsletter" />
                    <label  for="newsletter">Vous acceptez la newsletter</label>
                </p>
            </form>
            <button class="validate-button" @click="sendDemand()">Essayer Gratuitement</button>
        </div>
        <div v-show="isImageVisible" class="side-content">
            <img class="sandbox-image" src="https://megastuces.com/wp-content/uploads/2017/02/sandbox.png" alt="sandbox image">
            <h2> Vous allez très vite recevoir un email </h2>
        </div>
    </div>

</template>

<script>
    export default {
        name: "SandBoxForm",
        data: ()=>({
            isImageVisible: false,
        }),
        methods: {
            sendDemand: function ()  {
                let email = document.getElementById("email");

                if(email.value !== "" && email.value !== undefined && email.value !== null){
                    let name = document.getElementById("name").value;
                    let firstName = document.getElementById("firstName").value;
                    let company = document.getElementById("company").value;
                    let phone = document.getElementById("phone").value;
                    let profile = document.getElementById("profile").value;
                    let newsletter = document.getElementById("newsletter").value;
                    let req = new XMLHttpRequest();

                    let json = JSON.stringify({
                        "email":email.value,"name":name, "firstName": firstName, "company": company, "phone": phone,
                        "profile": profile, "newsletter": newsletter});
                    req.open("POST", "https://portalpr.dev.simplicite.io/ext/PorIsdService", true);
                    req.setRequestHeader("Content-type", "application/json")
                    req.addEventListener("load", () => {
                        if (req.status >= 200 && req.status < 400) {
                            this.isImageVisible = true;
                            console.log(req.responseText);
                        }
                        else {
                            console.error(req.status + " " + req.statusText);
                        }
                    });
                    req.addEventListener("error", () => console.error("Erreur réseau avec l'URL "));
                    req.send(json);
                } else {
                    if(!email.classList.contains("empty-input"))
                        email.classList.add("empty-input")
                }



            },
        },
        mounted() {
            let mail = document.getElementById("email")
            mail.addEventListener("blur", () => {
                if(mail.value === "" || mail.value === undefined){
                    mail.classList.add("empty-input")
                    mail.placeholder="Veuillez remplir ce champ s'il vous plaît";
                }
                else
                    mail.classList.remove("empty-input")
            })
            mail.addEventListener("focus", () => {
                mail.classList.remove("empty-input")
                mail.placeholder="";
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/sass/utils/variables";
    @import "../assets/sass/utils/mixins";

    .sandbox-demand {
        width: 80%;
        margin: 20px auto 20px auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        border-radius: $regular-radius;
        padding: 20px;
        background-color: white;
        @include box-shadow;
    }


    .side-content {
        width: 50%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }

    .sandbox-form {
        width: 40%;
        display: flex;
        flex-flow: column;


        label {
            //background-color: #00e5ff;
            margin: 0;
        }

        &__element {
            display: flex;
            flex-flow: column;
            margin-bottom: 15px;
        }

        &__input {
            width: 60%;
            border-bottom: solid 1px black;

            &:focus {
                border-bottom: solid 2px $color-primary;
            }
        }
    }

    .validate-button {
        box-sizing: border-box;
        padding: 20px;
        border: solid $color-primary 1px;
        border-radius: $regular-radius;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $color-primary;
        font-weight: bold;

        &:hover {
            background-color: lighten($color-primary, 60%);
        }
    }

    .required:after {
        content: '*';
        color: red;
        display: inline-block;
    }

    .newsletter-input {
        margin-right: 10px;
    }

    .empty-input {
        border-bottom: solid red;
        &::placeholder {
            color: red;
        }
    }

    .sandbox-image {
        max-width: 100%;
    }


</style>
