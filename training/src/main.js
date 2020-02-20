/* eslint-disable no-console,no-undef */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' //Documentation + Guide : https://router.vuejs.org/guide/
import vuetify from './plugins/vuetify' //Documentation + Guide : https://vuetifyjs.com/en/getting-started/quick-start
import Vuex from 'vuex' //Documentation + Guide : https://vuex.vuejs.org/guide/
import VueHighlightJS from 'vue-highlightjs'
import axios from 'axios'
import VueAxios from 'vue-axios'
//3. Importing the router from router.js :
import router from './router'
//4. Importing the Store instance from store.js :
import store from './store'

Vue.use(VueAxios, axios);
Vue.use(VueHighlightJS);

Vue.config.productionTip = false;

//1. middleware to use vue-router, vuex
Vue.use(VueRouter);
Vue.use(Vuex);

//2. Use the simplicite API 
// TODO should use specific user for public, not the designer user
if (process.env.NODE_ENV === "development") {
  Vue.prototype.$smp = new Simplicite.Ajax('https://maxime2.dev.simplicite.io/app', 'api', 'designer', 'simplicite');
  Vue.prototype.$smp.setDebugHandlerActive(true);
}
else
  Vue.prototype.$smp = new Simplicite.Ajax('https://maxime2.dev.simplicite.io/app', 'api', 'designer', 'simplicite');

// Login is necessary to get resources and make authenticated webservice calls.
// TODO probably not the best place to do the login ?
Vue.prototype.$smp.login(function success(){
  
  //5. Creating the Vue instance with the router, the store and el:'#app' as the root instance of vue
  new Vue({
    el: '#app',
    store, //injects the store into all child components so they can use it
    render: h => h(App),
    vuetify,
    router: router,
  }).$mount('#app');

}, function error(){
  alert("error connecting to simplicite");
});


