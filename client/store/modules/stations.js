import Station from '../../../common/api/Station';
import StoreConstants from '../StoreConstants';

console.log(StoreConstants.Stations.ADD_STATION)

const state = {
    stations: []
};

const getters = {
    stations: state => state.stations
};

const actions = {
    [StoreConstants.Stations.UPDATE_STATION_FIELDS]({commit}) {
        commit(StoreConstants.Stations.UPDATE_STATION_FIELDS)
    }
};

const mutations = {
    [StoreConstants.Stations.ADD_STATION](state, payload) {
        function addStation(stationObj) {
            const station = new Station(
                stationObj.id,
                stationObj.stationName,
                stationObj.status,
                stationObj.consoleOptions,
                stationObj.playerName,
                stationObj.currentConsole,
                stationObj.currentGame,
                stationObj.checkoutTime
            );
            const existingStation = findExistingStation(state.stations, station);
            if (existingStation)
                state.stations.splice(existingStation.index, 1, station);
            else
                state.stations.push(station);
        }
        if (Array.isArray(payload))
            payload.forEach(addStation)
        else
            addStation(payload)
    },
    [StoreConstants.Stations.UPDATE_STATION_FIELDS](state, updateFieldsData) {
        if (updateFieldsData) {
            const existingStation = findExistingStation(state.stations, updateFieldsData);
            if (existingStation) {
                existingStation.station.playerName = updateFieldsData.playerName;
                existingStation.station.currentConsole = updateFieldsData.currentConsole;
                existingStation.station.currentGame = updateFieldsData.currentGame;
                state.stations.splice(existingStation.index, 1, existingStation.station)
            }
        }
    }
};

function findExistingStation(stationArr, station) {
    function compare(storedStation) {
        return storedStation.id === station.id
    }
    const stationObj = stationArr.find(compare);
    const stationIndex = stationArr.findIndex(compare);
    if (stationObj)
        return {
            station: stationObj,
            index: stationIndex
        }

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}