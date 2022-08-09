import Vue from 'vue';
import Console from '../../../common/api/Console';
import StoreConstants from '../StoreConstants';

const state = {
    consoles: {}
};

const getters = {
    consoles: state => Object.values(state.consoles),
    getById: state => id => state.consoles[id]
};

const actions = {
    // [StoreConstants.Stations.UPDATE_STATION_FIELDS]({commit}) {
    //     commit(StoreConstants.Stations.UPDATE_STATION_FIELDS)
    // }
};

const mutations = {
    [StoreConstants.Consoles.ADD_CONSOLE](state, payload) {
        function addConsole(consoleObj) {
            const console = new Console(
                consoleObj.id,
                consoleObj.name,
                consoleObj.games,
                consoleObj.checkoutWarning
            );
            state.consoles = {...state.consoles, [console.id]: console}
        }
        if (Array.isArray(payload))
            payload.forEach(addConsole)
        else
            addConsole(payload)
    },
    [StoreConstants.Consoles.DELETE_CONSOLE](state, payload) {
        if (payload) {
            let key = typeof(payload) === 'string' ? payload : payload.id
            Vue.delete(state.consoles, key)
        }
    },
    [StoreConstants.Consoles.UPDATE_CONSOLE_FIELDS](state, updateFieldData) {
        if (updateFieldData) {
            let console = state.consoles[updateFieldData.id]
            let updateData = updateFieldData.fields
            if (console) {
                if (updateFieldData.id !== updateData.id) {
                    Vue.delete(state.consoles, updateFieldData.id)
                    state.consoles = {...state.consoles,[updateData.id]: updateData}
                } else {
                    console.id = updateData.id;
                    console.name = updateData.name;
                    console.games = updateData.games;
                    console.checkoutWarning = updateData.checkoutWarning;
                    state.consoles = {...state.consoles,[console.id]: console}
                }
                // state.consoles = {...state.consoles, [updateData.id]: updateData}
            } else {
                state.consoles = {...state.consoles,[updateData.id]: updateData}
            }
            // if (!updateData)
            //     updateData = updateFieldData
            // state.consoles = {...state.consoles, [updateFieldData.id]: updateData}
        }
    }
};

// function findExistingStation(stationArr, station) {
//     function compare(storedStation) {
//         return storedStation.id === station.id
//     }
//     const stationObj = stationArr.find(compare);
//     const stationIndex = stationArr.findIndex(compare);
//     if (stationObj)
//         return {
//             station: stationObj,
//             index: stationIndex
//         }
//
// }

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}