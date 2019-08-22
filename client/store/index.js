import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import createLogger from 'vuex/dist/logger'

import stationModule from './modules/stations'
import consoleModule from './modules/consoles'
import StoreConstants from './StoreConstants'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        socketConnected: false,
        times: {
            warning: moment.duration('0m'),
            kickOff: moment.duration('0m')
        }
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
        },
        [StoreConstants.CoreInfo.SEND_CORE_INFO](state, coreInfo) {
            state.times.warning = moment.duration(coreInfo.times.warning)
            state.times.kickOff = moment.duration(coreInfo.times.kickOff)
        }
    },
    modules: {
        stations: stationModule,
        consoles: consoleModule
    },
    plugins: [createLogger()]
});