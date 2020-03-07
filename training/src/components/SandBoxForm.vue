<template>
    <div class="sandbox-demand">
        <div class="sandbox-form">
            <h1 class="sandbox-form__title">Demandez une Sandbox</h1>
            <form >
                <p class="sandbox-form__element">
                    <input id="email" class="sandbox-form__input required" type="email" name="email" placeholder="Votre email" required/>
                </p>
                <p class="sandbox-form__element">
                    <input id="name" class="sandbox-form__input" type="text" name="name" placeholder="Nom"/>
                </p>
                <p class="sandbox-form__element">
                    <input id="firstName" class="sandbox-form__input" type="text" name="firstName" placeholder="Prénom"/>
                </p>
                <p class="sandbox-form__element">
                    <input id="company" class="sandbox-form__input" type="text" name="company" placeholder="Société"/>
                </p>
                <p class="sandbox-form__element">
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
            <button v-show="!showSpinner" class="validate-button" @click="sendDemand()">Essayer Gratuitement</button>
            <div v-if="showSpinner" class="spinner-wrapper"><Spinner ></Spinner></div>
            <div v-show="serverDown" class="server-error">Il semble qu'il y ait eu une erreur. Veuillez réessayer</div>

        </div>
        <div class="vertical-separator"></div>
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
    import Spinner from "./Spinner";
    export default {
        name: "SandBoxForm",
        components: {Spinner},
        data: ()=>({
            showSpinner: false,
            serverDown: false,
            clickCounter: 0,
        }),
        methods: {
            sendDemand: function ()  {
                console.log("COUNTER ===" + this.clickCounter);
                if(this.clickCounter === 0){

                    let email = document.getElementById("email");

                    if(email.value !== "" && email.value !== undefined && email.value !== null){
                        this.clickCounter++;
                        this.serverDown = false;
                        document.getElementsByClassName("validate-button")[0].innerText = "Demande Envoyée";
                        this.showSpinner = true;
                        setTimeout( () => {
                            let json = this.generateJSON();
                            let req = this.generateRequest();
                            req.send(json);}, 1500)

                    } else if (!email.classList.contains("empty-input")) {
                            email.classList.add("empty-input")
                    }
                }
            },

            generateJSON: function (){
                let email = document.getElementById("email");
                let name = document.getElementById("name").value;
                let firstName = document.getElementById("firstName").value;
                let company = document.getElementById("company").value;
                let phone = document.getElementById("phone").value;
                let profile = document.getElementById("profile").value;
                let newsletter = document.getElementById("newsletter").value;


                return JSON.stringify({
                    "email":email.value,"name":name, "firstName": firstName, "company": company, "phone": phone,
                    "profile": profile, "newsletter": newsletter});
            },

            generateRequest: function () {
                let req = new XMLHttpRequest();
                req.open("POST", "https://portalpr.dev.simplicite.io/ext/PorIsdService", true);
                req.setRequestHeader("Content-type", "application/json");

                req.addEventListener("load", () => {
                    if (req.status >= 200 && req.status < 400) {
                        this.showSpinner = false;
                        let btn = document.getElementsByClassName("validate-button")[0];
                        btn.classList.add("server-ok");
                        btn.innerText = "Un email vous a été envoyé !"
                    }
                    else {
                        console.error(req.status + " " + req.statusText);
                        this.clickCounter = 0;
                        this.showSpinner = false;
                        this.serverDown = true;
                    }
                });
                req.addEventListener("error", () => {
                    this.showSpinner = false;
                    this.serverDown = true;
                    console.error("Erreur réseau avec l'URL ")
                });
                return req;
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
        margin: 40px;
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

            &.server-ok {
                background-color: white;
                color: $color-accent;
                border: solid 2px $color-accent;

                &:hover {
                    background-color: lighten($color-accent, 50%);
                }
            }
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

    .spinner-wrapper {
        padding: 100px;
    }

    .server-error {
        border-radius: $regular-radius;
        background-color: $color-error;
        padding: map-get($paddings, medium);
        margin-top: 20px;
    }
</style>
