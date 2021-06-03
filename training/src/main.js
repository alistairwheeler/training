/* eslint-disable no-console,no-undef */
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import VueHighlightJS from 'vue-highlightjs'
import router from './router'
import store from './state/store'
import ReactiveSearch from '@appbaseio/reactivesearch-vue';

Vue.use(VueHighlightJS);
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ReactiveSearch);

// defined in `.env` files cf https://cli.vuejs.org/guide/mode-and-env.html
// TODO should use specific user for public, not the designer user
Vue.prototype.$smp = new Simplicite.Ajax(process.env.VUE_APP_SIM_INSTANCE_URL, 'api', process.env.VUE_APP_SIM_USER, process.env.VUE_APP_SIM_PWD);
Vue.prototype.$smp.setDebugHandlerActive(process.env.NODE_ENV === "development");

//5. Creating the Vue instance with the router, the store and el:'#app' as the root instance of vue
new Vue({
  el: '#app',
  store, //injects the store into all child components so they can use it
  render: h => h(App),
  router: router,
}).$mount('#app');
