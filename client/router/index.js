import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import Waitlist from '../pages/Waitlist.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/waitlist',
            name: 'waitlist',
            component: Waitlist
        }
    ]
})