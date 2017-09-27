import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import stationModule from './modules/stations'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        socketConnected: false
    },
    getters: {

    },
    mutations: {
        SOCKET_CONNECT: (state, status) => {
            state.socketConnected = true;
        },
        SOCKET_DISCONNECT: (state) => {
            state.socketConnected = false;
        }
    },
    modules: {
        stations: stationModule
    },
    plugins: [createLogger()]
});