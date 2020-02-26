<!-- https://christianheilmann.com/2015/04/08/keeping-it-simple-coding-a-carousel/ -->
<!-- https://github.com/codepo8/simple-carousel/blob/master/carousel-images.html -->
<template>
  <div class="carousel-wrapper">
    <div class="carouselbox active">
      <ol class="content">
        <li class="current"><img :src="currentImg"></li>
      </ol>

    </div>

    <div class="buttons">
      <button v-on:click="navigate2(-1)">
        ◀
        <span class="offscreen">Previous</span>
      </button>
      <button @click="navigate2(1)">
        <span class="offscreen">Next</span> ▶
      </button>
      <!--<p>{{(counter/this.images.length)+1}} / {{this.images.length+1}}</p>-->
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
            isCurrent: function (idx) {
                return idx == this.counter;
            },
            navigate2: function (direction) {
                this.counter = (this.counter + direction) % this.images.length;
                this.counter = this.counter < 0 ? this.images.length - 1 : this.counter;
            }
        },
        mounted() {
          let box = document.querySelector(".carouselbox");
          // eslint-disable-next-line no-unused-vars
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
    }

    .carouselbox {
        font-family: helvetica, sans-serif;
        font-size: 14px;
        width: 100%;
        height: 100%;
        position: relative;
        margin: 0;
        overflow: hidden;
    }

    .content {
        margin: 0;
        padding: 0;
    }

    .content li {
        font-size: 100px;
        margin: 0;
        padding: 0;
        width: 100%;
        list-style: none;
        text-align: center;
        z-index: 2;
    }

    .carouselbox button {
        border: none;
        visibility: hidden;
    }

    .active button {
        visibility: visible;
    }

    .offscreen {
        position: absolute;
        left: -2000px;
    }

    .buttons {
      visibility: hidden;
      width: 100%;
      padding: 5px 0;
      background: #eee;
      text-align: center;
      z-index: 10;
      /*position: relative;*/
      position: absolute;
      bottom: 0;
    }

    .active .buttons {
        width: 100%;
        padding: 5px 0;
        background: #eee;
        text-align: center;
        z-index: 10;
        /*position: relative;*/
        position: absolute;
        bottom: 0;
    }

    .active li {
        position: absolute;
        top: 20px;
        opacity: 0;
        transform: scale(0);
        transition: 1s;
    }

    .active li.current {
        top: 20px;
        opacity: 1;
        transform: scale(1);
        transition: 1s;
    }

    .li img {
        width: 200px;
        height: 200px;
        display: block;
    }

</style>
