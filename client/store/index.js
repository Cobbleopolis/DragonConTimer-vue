import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import stationModule from './modules/stations'
import consoleModule from './modules/consoles'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        socketConnected: false
    },
    getters: {

    },
    actions: {
        setSocketConnected({commit}, isConnected) {
            commit('setSocketConnected', isConnected)
        }
    },
    mutations: {
        setSocketConnected(state, isConnected) {
            state.socketConnected = isConnected
        }
    },
    modules: {
        stations: stationModule,
        consoles: consoleModule
    },
    plugins: [createLogger()]
});