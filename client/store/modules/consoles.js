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
                consoleObj.games
            );
            state.consoles = {...state.consoles, [console.id]: console}
        }
        if (Array.isArray(payload))
            payload.forEach(addConsole)
        else
            addConsole(payload)
    },
    // [StoreConstants.Stations.UPDATE_STATION_FIELDS](state, updateFieldsData) {
    //     if (updateFieldsData) {
    //         const existingStation = findExistingStation(state.stations, updateFieldsData);
    //         if (existingStation) {
    //             existingStation.station.playerName = updateFieldsData.playerName;
    //             existingStation.station.currentConsole = updateFieldsData.currentConsole;
    //             existingStation.station.currentGame = updateFieldsData.currentGame;
    //             state.stations.splice(existingStation.index, 1, existingStation.station)
    //         }
    //     }
    // }
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