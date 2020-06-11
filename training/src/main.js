/* eslint-disable no-console,no-undef */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueHighlightJS from 'vue-highlightjs'
import router from './router'
import store from './state/store'

Vue.use(VueHighlightJS);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

// TODO should use specific user for public, not the designer user
if (process.env.NODE_ENV === "development") {
  Vue.prototype.$smp = new Simplicite.Ajax('https://maxime2.dev.simplicite.io/app', 'api', 'designer', 'simplicite');
  Vue.prototype.$smp.setDebugHandlerActive(true);
}
else
  Vue.prototype.$smp = new Simplicite.Ajax('https://maxime2.dev.simplicite.io/app', 'api', 'designer', 'simplicite');

// Login is necessary to get resources and make authenticated webservice calls.
// TODO probably not the best place to do the login ?
//Vue.prototype.$smp.login(function success(){
  
  //5. Creating the Vue instance with the router, the store and el:'#app' as the root instance of vue
  new Vue({
    el: '#app',
    store, //injects the store into all child components so they can use it
    render: h => h(App),
    router: router,
  }).$mount('#app');

// }, function error(){
//   alert("error connecting to simplicite");
// });


