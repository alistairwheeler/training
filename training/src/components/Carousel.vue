<!-- https://christianheilmann.com/2015/04/08/keeping-it-simple-coding-a-carousel/ -->
<!-- https://github.com/codepo8/simple-carousel/blob/master/carousel-images.html -->
<template>
  <div class="carouselbox active">
          <!-- <ol class="content">
            <li><img src="http://lorempixel.com/200/200" alt="1"></li>
            <li><img src="http://lorempixel.com/199/200" alt="2"></li>
            <li><img src="http://lorempixel.com/200/199" alt="3"></li>
            <li><img src="http://lorempixel.com/199/199" alt="4"></li>
        </ol> -->
    <ol class="content">
      <li v-for="(url, index) in images" v-bind:key="index">
        <img :src="url" alt="Image"/>
      </li>
    </ol>
    <div class="buttons">
      <button v-on:click="navigate(-1)">
        ◀
        <span class="offscreen">Previous</span>
      </button>
      <button @click="navigate(1)">
        <span class="offscreen">Next</span> ▶
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: ["images"],
  data: () => ({
    box: null,
    counter: 0,
    items: [],
    current: null
  }),
  methods: {
    init: function() {
      // Define the global counter, the items and the
      // current item
      this.items = this.$el.querySelectorAll(".content li");
      this.current = this.items[0];

      //this.box.classList.add("active");

      // show the first element
      // (when direction is 0 counter doesn't change)
      this.navigate(0);
    },
    navigate: function(direction) {
      // hide the old current list item
      this.current.classList.remove("current");

      // calculate the new position
      this.counter = (this.counter + direction) % this.images.length;
      this.counter = this.counter < 0 ? this.images.length - 1 : this.counter;

      // set new current element
      // and add CSS class
      this.current = this.items[this.counter];
      this.current.classList.add("current");
    }
  },
  async updated() {
    this.init();
  }
};
</script>

<style scoped>
img{
  max-width:100%;
  max-height:100%;
}
.carouselbox {
  font-family: helvetica, sans-serif;
  font-size: 14px;
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px #ccc;
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

.active .buttons {
  padding: 5px 0;
  background: #eee;
  text-align: center;
  z-index: 10;
  position: relative;
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