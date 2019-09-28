import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LessonPage from "./components/LessonPage";
import HomePage from "./components/HomePage";
import CourseList from "./components/CourseList";
import LessonList from "./components/LessonList";
import vuetify from './plugins/vuetify';

//1 middleware to use vue-router
Vue.use(VueRouter);

Vue.config.productionTip = false


//2. Routes definition
const routes = [
  { path: '/', component: LessonPage },
  { path: '/home', component: HomePage },
  { path: '/courses', component: CourseList },
  { path: '/lessons', component: LessonList }
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
  router: router
}).$mount('#app')
