<template>
  <div id="app">
    <Header></Header>
    <!--<LessonPage></LessonPage>-->
    <router-view> </router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: 'app',
  components: {
    Footer,
    Header,
  }
}
</script>

<style>

</style>
