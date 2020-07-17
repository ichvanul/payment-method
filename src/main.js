import Vue from 'vue';
import VueNumerals from 'vue-numerals';
import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/main.styl';

Vue.use(VueNumerals);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
