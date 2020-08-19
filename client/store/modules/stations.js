import moment from 'moment';
import Station from '../../../common/api/Station';
import StoreConstants from '../StoreConstants';

const state = {
    stations: []
};

const getters = {
    stations: state => state.stations,
    getStationByConsoleOptions: state => consoleOption => {
        return state.stations.filter(station => station.consoleOptions.includes(consoleOption))
    },
    getStationByCurrentConsole: state => console => {
        return state.stations.filter(station => station.currentConsole === console)
    },
    getStationsByGame: state => (console, game) => {
        return state.stations.filter(station => station.currentConsole === console && station.currentGame === game)
    },
    getOutOfTimeStations: (state, getters, rootState) => {
        return state.stations.filter(station => station.timeSinceCheckout() && station.timeSinceCheckout().asMilliseconds() >= rootState.times.kickOff.asMilliseconds())
    }
}

const actions = {
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
                stationObj.checkoutTime,
                stationObj.notes
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
                existingStation.station.checkoutTime = moment(updateFieldsData.checkoutTime);
                state.stations.splice(existingStation.index, 1, existingStation.station)
            }
        }
    },
    [StoreConstants.Stations.UPDATE_STATION_STATUS](state, updateStatusData) {
        if (updateStatusData) {
            const existingStation = findExistingStation(state.stations, updateStatusData);
            if (updateStatusData) {
                existingStation.station.status = updateStatusData.status;
                state.stations.splice(existingStation.index, 1, existingStation.station);
            }
        }
    },
    [StoreConstants.Stations.CLEAR_TIME](state, clearTimeData) {
        if (clearTimeData) {
            const existingStation = findExistingStation(state.stations, clearTimeData);
            if (existingStation) {
                existingStation.station.checkoutTime = null
                state.stations.splice(existingStation.index, 1, existingStation.station)
            }
        }
    },
    [StoreConstants.Stations.EDIT_NOTES](state, editStationNotesData) {
        console.log("TEST")
        if (editStationNotesData) {
            const existingStation = findExistingStation(state.stations, editStationNotesData)
            if (existingStation) {
                existingStation.station.notes = editStationNotesData.notes
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