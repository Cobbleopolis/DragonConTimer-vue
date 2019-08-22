import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import store from './store'
import nodeEnvPlugin from './nodeEnvPlugin'
import BootstrapVue from 'bootstrap-vue'
import VueSocketIO from 'vue-socket.io'

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
Vue.use(nodeEnvPlugin);

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