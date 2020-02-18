<!-- https://christianheilmann.com/2015/04/08/keeping-it-simple-coding-a-carousel/ -->
<!-- https://github.com/codepo8/simple-carousel/blob/master/carousel-images.html -->
<template>
    <div class="carouselbox">
        <ol class="content">
            <li><img src="http://lorempixel.com/200/200" alt="1"></li>
            <li><img src="http://lorempixel.com/199/200" alt="2"></li>
            <li><img src="http://lorempixel.com/200/199" alt="3"></li>
            <li><img src="http://lorempixel.com/199/199" alt="4"></li>
        </ol>
        <div class="buttons">
            <button class="prev">
            ◀ <span class="offscreen">Previous</span>
            </button>
            <button class="next">
            <span class="offscreen">Next</span> ▶ 
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Carousel',
    methods: {
        carousel: function(){
            // Read necessary elements from the DOM once
            var box = document.querySelector('.carouselbox');
            var next = box.querySelector('.next');
            var prev = box.querySelector('.prev');

            // Define the global counter, the items and the 
            // current item 
            var counter = 0;
            var items = box.querySelectorAll('.content li');
            var amount = items.length;
            var current = items[0];

            box.classList.add('active');

            // navigate through the carousel
            function navigate(direction) {

                // hide the old current list item 
                current.classList.remove('current');
                
                // calculate the new position
                counter = (counter + direction) % amount;
                counter = counter < 0 ? amount - 1 : counter;

                // set new current element 
                // and add CSS class
                current = items[counter];
                current.classList.add('current');
            }

            // add event handlers to buttons
            next.addEventListener('click', function() {
                navigate(1);
            });
            prev.addEventListener('click', function() {
                navigate(-1);
            });

            // show the first element 
            // (when direction is 0 counter doesn't change)
            navigate(0);

        }
    },
    async mounted() {
        this.carousel();
    }
}
</script>

<style scoped>
    .carouselbox {
      font-family: helvetica,sans-serif;
      font-size: 14px;
      /* width: 200px; */
      position: relative;
      margin: 1em;
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


    .active {
      height: 215px;
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