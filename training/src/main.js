import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LessonPage from "./components/LessonPage";
import HomePage from "./components/HomePage";
import CourseList from "./components/CourseList";
import LessonList from "./components/LessonList";

Vue.use(VueRouter);

Vue.config.productionTip = false

/*{
  routes: [
    { path: '/', component: LessonPage },
    { path: '/list', component: ListComponent }
  ], mode:'history'
}*/

const routes = [
  { path: '/', component: LessonPage },
  { path: '/home', component: HomePage },
  { path: '/courses', component: CourseList },
  { path: '/lessons', component: LessonList }
];

const router = new VueRouter({
  mode: 'history',
  routes});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router
}).$mount('#app')
