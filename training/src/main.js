/* eslint-disable no-console,no-undef */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router' //Documentation + Guide : https://router.vuejs.org/guide/
import vuetify from './plugins/vuetify' //Documentation + Guide : https://vuetifyjs.com/en/getting-started/quick-start
import Vuex from 'vuex' //Documentation + Guide : https://vuex.vuejs.org/guide/

Vue.config.productionTip = false;

//1. middleware to use vue-router, vuex
Vue.use(VueRouter);
Vue.use(Vuex);

//2. Importing the router from router.js :
import router from './router'
//3. Importing the Store instance from store.js :
import store from './store'

//4. Use the simplicite API :
Vue.prototype.$smp = new Simplicite.Ajax('https://maxime2.dev.simplicite.io', 'api', 'designer', 'simplicite');

//5. Creating the Vue instance with the router, the store and el:'#app' as the root instance of vue
new Vue({
  el: '#app',
  store,
  render: h => h(App),
  vuetify,
  router: router,
}).$mount('#app');
