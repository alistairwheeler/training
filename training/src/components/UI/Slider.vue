<template>
  <div class="slider" @mouseover="controlsVisible = true" @mouseout="controlsVisible = false">
    <div class="slider__image-wrapper" v-for="(img, index) in images" :key="index">
      <transition :name="transitionName">
        <img v-show="index === currentImageIndex" :src="img" alt="slider image">
      </transition>
    </div>
    <button class="slider__control slider__previous" v-if="controls" :class="controlsVisible ? 'visible' : ''" @click.prevent="previous"><i class="material-icons">keyboard_arrow_left</i></button>
    <button class="slider__control slider__next" v-if="controls" :class="controlsVisible ? 'visible' : ''" @click.prevent="next"><i class="material-icons">keyboard_arrow_right</i></button>
    <div class="slider__pagination" v-if="pagination">
      <button v-for="n in images.length" :key="n" @click="goTo(n-1)" :class="[n-1 === currentImageIndex ? 'active' : '']"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Slider",
    props: {
      images: {
        type: Array,
        required: true,
        default: () => [],
        note: 'The images in the carousel',
      },
      controls: {
        type: Boolean,
        required: false,
        default: true,
        note: 'Display the control elements of the slider',
      },
      pagination: {
        type: Boolean,
        required: false,
        default: true,
        note: 'Display the pagination at the bottom',
      }
    },
    data: () => ({
      currentImageIndex: 0,
      direction: null,
      controlsVisible: false
    }),
    methods: {
      next() {
        // Check grafikart vuejs slider video if there is a problem on loading, because maybe the there is a need to check this part of the code
        this.direction = 'right';
        if (this.currentImageIndex === this.images.length - 1) this.currentImageIndex = 0;
        else this.currentImageIndex++;
      },
      previous() {
        this.direction = 'left';
        if (this.currentImageIndex === 0) this.currentImageIndex = this.images.length - 1;
        else this.currentImageIndex--;
      },
      goTo(index){
        if (index > this.currentImageIndex) this.direction = 'right';
        else this.direction = 'left';
        this.currentImageIndex = index;
      }
    },
    computed: {
      transitionName(){
        return 'slide-' + this.direction
      }
    },
    created() {
      function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }
      for (let i = 1; i < 5; i++){
        this.images.push('https://picsum.photos/id/'+ getRandomInt(100) +'/1000/300')
      }
    }
  }
</script>

<style lang="sass" scoped>
@import "../../assets/sass/variables"
.slider
  position: relative
  &__image-wrapper
    width: 100%
    img
      width: 100%
      object-fit: fill
  .slider__control
    opacity: 0
    transition: $slider-duration-control-apparition all
    outline: none
    border: none
    border-radius: 100%
    height: $slider-control-size
    width: $slider-control-size
    background-color: transparentize(black, 0.5)
    color: white
    display: flex
    justify-content: center
    align-items: center
  .slider__previous, .slider__next
    position: absolute
    top: 50%
    margin-top: -$slider-control-size/2
    &.visible
      opacity: 1
  .slider__next
    right: 10px
  .slider__previous
    left: 10px

    &.visible
      opacity: 1
  &__pagination
    position: absolute
    bottom: 10px
    left: 0
    right: 0
    text-align: center
    button
      display: inline-block
      width: $slider-pagination-size
      height: $slider-pagination-size
      border-radius: $slider-pagination-size
      border: none
      outline: none
      margin: $slider-margin
      background-color: #000
      &.active
        background-color: white

.slide-right-enter-active
  animation: slideRightIn $slider-duration-transition

.slide-right-leave-active
  animation: slideRightOut $slider-duration-transition
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

@keyframes slideRightIn
  from
    transform: translateX(100%)
  to
    transform: translateX(0)

@keyframes slideRightOut
  from
    transform: translateX(0)
  to
    transform: translateX(-100%)

.slide-left-enter-active
  animation: slideLeftIn $slider-duration-transition

.slide-left-leave-active
  animation: slideLeftOut $slider-duration-transition
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

@keyframes slideLeftIn
  from
    transform: translateX(-100%)
  to
    transform: translateX(0)

@keyframes slideLeftOut
  from
    transform: translateX(0)
  to
    transform: translateX(100%)
</style>
