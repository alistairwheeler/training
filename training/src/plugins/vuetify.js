import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#514FBF',
        secondary: '#b0bec5',
        accent: '#ffffff',
        error: '#b71c1c',
      },
      dark: {
        primary: '#514FBF',
        secondary: '#b0bec5',
        accent: '#ff0011',
        error: '#b71c1c',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
})

