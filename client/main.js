import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'
import StoreConstants from './store/StoreConstants'

Vue.use(BootstrapVue);
Vue.use(new VueSocketIO({
    debug: process.env.NODE_ENV === 'development',
    connection: window.location.origin,
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    }
}));

console.log(StoreConstants.Stations.ADD_STATION)

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