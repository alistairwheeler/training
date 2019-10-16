/* eslint-disable no-console,no-undef */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Lesson from "./components/LessonItem";
import HomePage from "./components/HomePage";
import CourseList from "./components/Courses";
import LessonList from "./components/Lessons";
import CourseLessons from "./components/CourseLessons"
import NotFound from "./components/NotFound"
import vuetify from './plugins/vuetify';
//1. middleware to use vue-router
Vue.use(VueRouter);

Vue.config.productionTip = false
// To use the simplicite API :
Vue.prototype.$smp = new Simplicite.Ajax('https://maxime.dev.simplicite.io', 'api', 'designer', 'simplicite');


//2. Routes definition
const routes = [
  { path: '/', component: HomePage },
  { path: '/home', component: HomePage },
  { path: '/courses', component: CourseList },
  { path: '/lessons', component: LessonList },
  { path: '/courses/lessons/:courseId', component: CourseLessons },
  { path: '/courses/lessons/:courseId/:lessonId', component: Lesson },
    //This route should be last in the list because it can overcome the other ones (because it matches all routes)
  { path: '/*', component: NotFound }
];

//3. Creating the router instance
const router = new VueRouter({
  mode: 'history',
  routes});

//4. Creating the Vue instance with the router and el:'#app'
new Vue({
  el: '#app',
  render: h => h(App),
  vuetify,
  router: router,
}).$mount('#app')
