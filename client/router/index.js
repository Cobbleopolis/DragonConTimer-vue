import Vue from 'vue'
import Router from 'vue-router'
import Index from '../pages/Index.vue'
import Availability from '../pages/Availability.vue'

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
            path: '/availability',
            name: 'availability',
            component: Availability
        }
    ]
})