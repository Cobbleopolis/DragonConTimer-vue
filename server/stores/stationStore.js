import logger from 'winston'
import config from 'config'
import moment from 'moment'
import Station from '../../common/api/Station'

let stations = new Map();

function init() {
    config.get('stations').map(stationObj =>
        new Station(
            stationObj.id,
            stationObj.stationName,
            stationObj.status,
            stationObj.consoleOptions,
            stationObj.playerName,
            stationObj.currentConsole,
            stationObj.currentGame,
            stationObj.checkoutTime
        )
    ).forEach(station => {stations.set(station.id, station)});
}

function getStations() {
    return stations.values();
}

function updateFields(updateFieldData) {
    logger.debug("Updating fields: " + JSON.stringify(updateFieldData))
    if (updateFieldData) {
        let station = stations.get(updateFieldData.id);
        if (station) {
            station.playerName = updateFieldData.playerName;
            station.currentConsole = updateFieldData.currentConsole;
            station.currentGame = updateFieldData.currentGame;
            station.checkoutTime = moment(updateFieldData.checkoutTime);
            stations.set(station.id, station);
        }
    }
}

export default {
    init,
    getStations,
    updateFields
};