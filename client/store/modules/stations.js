import Vue from 'vue';
import moment from 'moment';
import Station from '../../../common/api/Station';
import StoreConstants from '../StoreConstants';

const state = {
    stations: []
};

const getters = {
    stations: state => state.stations,
    getStationById: state => stationId => {
        return state.stations.find(station => station.id === stationId)
    },
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
    [StoreConstants.Stations.UPDATE_STATION_FIELDS](state, updateFieldData) {
        if (updateFieldData) {
            const existingStation = findExistingStation(state.stations, updateFieldData);
            const updateData = updateFieldData.fields
            if (existingStation) {
                if (updateFieldData.id !== existingStation.station.id) {
                    state.stations[existingStation.index] = new Station(
                        updateData.id,
                        updateData.stationName,
                        updateData.status,
                        updateData.consoleOption,
                        updateData.playerName,
                        updateData.currentConsole,
                        updateData.currentGame,
                        updateData.checkoutTime,
                        updateData.notes
                    )    
                } else {
                    if (updateData.id)
                        existingStation.station.id = updateData.id
                    if (updateData.stationName)
                        existingStation.station.stationName = updateData.stationName
                    // if (updateData.status)
                    //     existingStation.station.status = updateData.status
                    if (updateData.consoleOptions)
                        existingStation.station.consoleOptions = updateData.consoleOptions

                    existingStation.station.playerName = updateData.playerName;
                    existingStation.station.currentConsole = updateData.currentConsole;
                    existingStation.station.currentGame = updateData.currentGame;
                    existingStation.station.checkoutTime = moment(updateData.checkoutTime);
                    state.stations.splice(existingStation.index, 1, existingStation.station)
                }
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
    [StoreConstants.Stations.DELETE_STATION](state, payload) {
        if (payload) {
            const key = typeof(payload) === 'string' ? payload : payload.id
            const existingStation = findExistingStation (state.stations, { id: key })
            if (existingStation)
                Vue.delete(state.stations, existingStation.index)
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