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
            component: Availability //TODO Swap these back
        },
        {
            path: '/availability',
            name: 'availability',
            component: Index
        }
    ]
})