import logger from 'winston'
import moment from 'moment'
import Station from '../../common/api/Station'
import StoreUtils from '../util/storeUtil'

const storeDataFileName = 'stations.json'

const storeDefaultData = []

let stations = new Map()

function init() {
    StoreUtils.ensureStoreFile(storeDataFileName, storeDefaultData);
    StoreUtils.getStoreFileContent(storeDataFileName).map(stationObj =>
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
    ).forEach(station => {
        stations.set(station.id, station)
    })
}

function getStations() {
    return stations.values()
}

function updateFields(updateFieldData) {
    logger.debug('Updating fields: ' + JSON.stringify(updateFieldData))
    if (updateFieldData) {
        let station = stations.get(updateFieldData.id)
        if (station) {
            station.playerName = updateFieldData.playerName
            station.currentConsole = updateFieldData.currentConsole
            station.currentGame = updateFieldData.currentGame
            station.checkoutTime = moment(updateFieldData.checkoutTime)
            stations.set(station.id, station)
        }
        StoreUtils.updateStoreFile(storeDataFileName, Array.from(stations.values()))
    }
}

function clearTime(stationIdData) {
    logger.debug('Clearing Time: ' + JSON.stringify(stationIdData))
    let station = stations.get(stationIdData.id)
    if (station) {
        station.checkoutTime = null
        stations.set(station.id, station)
    }
    StoreUtils.updateStoreFile(storeDataFileName, Array.from(stations.values()))
}

export default {
    init,
    getStations,
    updateFields,
    clearTime
}