import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueSocketio from 'vue-socket.io'

Vue.use(BootstrapVue);
Vue.use(VueSocketio, window.location.host,  store);

Vue.config.productionTip = false;
Vue.config.fallbackLang = 'en';

new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: {App}
});
console.log('Hello World!');