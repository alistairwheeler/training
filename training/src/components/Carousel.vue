<!-- https://christianheilmann.com/2015/04/08/keeping-it-simple-coding-a-carousel/ -->
<!-- https://github.com/codepo8/simple-carousel/blob/master/carousel-images.html -->
<template>
  <div class="carousel-wrapper">
    <div class="img-holder">
      <transition>
        <img :src="currentImg.filesrc" :download="currentImg.filename" v-bind:key="currentImg.filename">
      </transition>
    </div>
    <div class="buttons">
      <button @click="navigate(-1)"> ◀ </button>
      <p class="img-counter">{{(this.counter + 1)}} / {{this.images.length}}</p>
      <button @click="navigate(1)"> ▶ </button>
    </div>
  </div>

</template>

<script>
    export default {
        name: "Carousel",
        props: ["images"],
        data: () => ({
            counter: 0
        }),
        computed: {
            currentImg: function () {
                return this.images[this.counter];
            }
        },
        methods: {
            navigate: function (direction) {
                this.counter = (this.counter + direction) % this.images.length;
                this.counter = this.counter < 0 ? this.images.length - 1 : this.counter;
            },
            displayFile(filename){
              console.log("Switching carousel to "+filename+" if possible");
              for(let i=0; i<this.images.length; i++){
                if(this.images[i].filename==filename){
                  this.counter = i;
                  break;
                }
              }
            }
        },
        mounted() {
          if(this.images.length <= 1 ){
            let buttons = document.querySelector(".buttons");
            buttons.style.visibility = "hidden";
          } else {
            let box = document.querySelector(".carousel-wrapper");
            let buttons = document.querySelector(".buttons");
            box.addEventListener('mouseover', () => {
              buttons.style.visibility = "visible";
            });
            box.addEventListener('mouseout', e => {
              if(!e.relatedTarget.classList.contains('buttons')){
                buttons.style.visibility = "hidden";
              }

            });
            buttons.addEventListener('mouseleave', () => {
              buttons.style.visibility = "hidden";
            })
          }

        }
    };
</script>

<style lang="scss" scoped>
  @import "../assets/sass/utils/_variables.scss";
    img {
        max-width: 100%;
        max-height: 100%;
    }

    .carousel-wrapper {
      width: 100%;
      height: 100%;
      position: relative;
      margin: 0;
      overflow: hidden; // avoid transition scrollbar
    }

    .buttons {
      width: 100%;
      height: 40px;
      position: absolute;
      bottom: 0;
      padding: 5px 0;
      text-align: center;
      background: #eee;
      z-index: 10;
      visibility: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .img-counter {
      height: 100%;
      margin: 0 $img-counter-margin 0 $img-counter-margin
    }

    /* Transition */
    .v-enter, .v-leave-to{
      transform: scale(0);
    }
    .v-enter-to, .v-leave{
      transform: scale(1);
    }
    .v-leave-active{
      transition-duration: 0.5s;
    }
    .v-enter-active{
      transition-delay: 0.5s;
      transition-duration: 0.5s;
    }


</style>
