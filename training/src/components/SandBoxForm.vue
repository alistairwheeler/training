<template>
    <div class="sandbox-demand">
        <div class="sandbox-form">
            <h1 class="sandbox-form__title">Demandez une Sandbox</h1>
            <form >
                <p class="sandbox-form__element">
                    <!--<label class="required">Votre adresse de messagerie</label>-->
                    <input id="email" class="sandbox-form__input required" type="email" name="email" placeholder="Votre email" required/>
                </p>
                <p class="sandbox-form__element">
                    <!--<label>Votre nom</label>-->
                    <input id="name" class="sandbox-form__input" type="text" name="name" placeholder="Nom"/>
                </p>
                <p class="sandbox-form__element">
                    <!--<label>Votre prénom</label>-->
                    <input id="firstName" class="sandbox-form__input" type="text" name="firstName" placeholder="Prénom"/>
                </p>
                <p class="sandbox-form__element">
                    <!--<label>Votre société</label>-->
                    <input id="company" class="sandbox-form__input" type="text" name="company" placeholder="Société"/>
                </p>
                <p class="sandbox-form__element">
                    <!--<label>Votre téléphone</label>-->
                    <input id="phone" class="sandbox-form__input" type="tel" name="phone" placeholder="Téléphone"/>
                </p>
                <p class="sandbox-form__element">
                    <label>Profil</label>
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
        <div class="vertical-separator"></div>
        <!--<div v-show="isImageVisible" class="side-content">-->
        <div class="side-content">
            <!--<img class="side-content__image" src="https://megastuces.com/wp-content/uploads/2017/02/sandbox.png" alt="sandbox image">-->
            <div class="side-content__brand">
                <h2 class="side-content__message">Créez vos applications dès maintenant avec Simplicité</h2>
                <ul>
                    <li><img class="side-content__icon" src="../../public/hand-pen.png">Remplissez le formulaire</li>
                    <li><img class="side-content__icon" src="../../public/email.png">Validez votre demande avec l'email</li>
                    <li><img class="side-content__icon" src="../../public/rocket.png">C'est tout bon, à vous de jouer !</li>
                </ul>
                <img class="side-content__brand-image" src="../../public/developer.png" alt="computer image">
                <!--<p class="side-content__text">pour toutes vos applications</p>-->
            </div>

            <!--<div class="side-content__mail">
                <img class="mail-icon" src="../../public/mail.svg">
                <p>Un mail vous a été envoyé</p>
            </div>-->

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
                            document.getElementsByClassName("side-content__mail")[0].style.transform="scale(1)";
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
                if(mail.value === "" || mail.value === undefined || mail.value === null){
                    mail.placeholder="Veuillez remplir ce champ";
                    mail.classList.add("empty-input")
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
        width: 70%;
        margin: 20px auto 20px auto;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        border-radius: $regular-radius;
        background-color: white;
        @include box-shadow;
    }

    .required:after {
        content: '*';
        color: red;
        display: inline-block;
    }

    .sandbox-form {
        width: $width-sandbox-form;
        padding: 20px;
        display: flex;
        flex-flow: column;

        &__title {
            font-weight: bold;
            color: #2B2B2B;
            font-size: 2.5rem;
            margin-bottom: 45px;
        }

        label {
            margin: 0;
        }

        &__element {
            display: flex;
            flex-flow: column;
            margin-bottom: 30px;
        }

        &__input {
            border-bottom: 1px solid #999;

            &::placeholder {
                color: #999
            }

            &:focus {
                border-bottom: solid 1px black;
                &::placeholder {
                    color: black;
                }
            }
        }

        .newsletter-input {
            margin-right: 10px;
        }

        .empty-input {
            border-bottom: 1px solid red;
            &::placeholder {
                color: red;
            }
        }

        .validate-button {
            box-sizing: border-box;
            padding: 20px;
            // border: solid $color-primary 1px;
            border-radius: $regular-radius;
            display: flex;
            align-items: center;
            justify-content: center;
            //color: $color-primary;
            font-weight: bold;
            font-size: 1.3rem;
            background-color: lighten($color-primary, 10%);
            color: white;

            /*&:hover {
                background-color: lighten($color-primary, 60%);
            }*/
        }

    }

    .vertical-separator {
        width: 2px;
        background-color: #A2A2A2;
        height: 500px;
        align-self: center;
        margin: 0 20px 0 20px;
    }

    .side-content {
        width: (100%-$width-sandbox-form);
        border-radius: 0 4px 4px 0;
        padding: 20px;
        position: relative;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-around;
        color: #2B2B2B;
        //background: url("https://megastuces.com/wp-content/uploads/2017/02/sandbox.png");
        /*background: linear-gradient(to right, rgba($color-secondary, 0.3),
                rgba($color-secondary, 0.3)),*/
        /*background: linear-gradient(to right, rgba(#2B2B2B, 1),
                rgba(#2B2B2B, 1)),
        url("https://megastuces.com/wp-content/uploads/2017/02/sandbox.png");*/


        &__image {
            max-width: 100%;
            border-radius: $regular-radius;
        }

        &__brand {
            display: flex;
            flex-direction: column;

            ul {
                padding: 0;
                margin-bottom: 30px;
            }
        }

        &__brand-image {
            max-width: 100%;
        }

        &__message {
            font-size: 2rem;
            font-weight: bold;
            margin-bottom: 30px;
        }
        &__text {
            font-size: 1rem;
        }

        &__mail {
            width: 60%;
            height: 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            transform: scale(0);
            transition: transform 330ms ease-in-out;

            .mail-icon {
                width: 70%;
                margin-bottom: 20px;
            }
        }

        &__icon {
            width: $width-sandbox-icon;
            height: $width-sandbox-icon;
            margin-right: 10px;
        }
    }

</style>
