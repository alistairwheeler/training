import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LessonPage from "./components/LessonPage";
import HomePage from "./components/HomePage";
import CourseList from "./components/CourseList";
import LessonList from "./components/LessonList";
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';

//1 middleware to use vue-router
Vue.use(VueRouter);
Vue.use(axios, VueAxios);

Vue.config.productionTip = false


//2. Routes definition
const routes = [
  { path: '/', component: HomePage },
  { path: '/home', component: HomePage },
  { path: '/courses', component: CourseList },
  { path: '/lessons', component: LessonList },
  { path: '/courses/12', component: LessonPage },
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
