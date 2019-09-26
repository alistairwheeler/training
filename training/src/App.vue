<template>
  <div id="app">
    <Header></Header>
    <LessonPage></LessonPage>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import LessonPage from "./components/LessonPage";

export default {
  name: 'app',
  components: {
    LessonPage,
    Footer,
    Header,
  }
}
</script>

<style>

</style>
