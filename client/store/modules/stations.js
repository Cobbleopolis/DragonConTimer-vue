import Station from '../../../common/api/Station';

const state = {
    stations: []
};

const getters = {
    stations: state => state.stations
};

const actions = {

};

const mutations = {
    SOCKET_ADD_STATION(state, payload) {
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
        if (Array.isArray(payload) && Array.isArray(payload[0]))
            payload[0].forEach(addStation)
        else
            addStation(payload)
    },
    SOCKET_UPDATE_STATION_FIELDS(state, updateFieldsData) {
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