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
            stationObj.checkoutTime,
            stationObj.notes
        )
    ).forEach(station => {
        stations.set(station.id, station)
    })
}

function getStations() {
    return stations.values()
}

function addStation(addStationData) {
    let addedStation = new Station (
        addStationData.id,
        addStationData.stationName,
        addStationData.status,
        addStationData.consoleOptions,
        addStationData.playerName,
        addStationData.currentConsole,
        addStationData.currentGame,
        addStationData.checkoutTime,
        addStationData.notes
    )
    stations.set(addedStation.id, addedStation)
    StoreUtils.updateStoreFile(storeDataFileName, Array.from(consoles.values()))
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
        } else {
            let addedStation = new Station (
                updateFieldData.id,
                updateFieldData.stationName,
                updateFieldData.status,
                updateFieldData.consoleOptions,
                updateFieldData.playerName,
                updateFieldData.currentConsole,
                updateFieldData.currentGame,
                updateFieldData.checkoutTime,
                updateFieldData.notes
            )
            stations.set(addedStation.id, addedStation)
        }
        StoreUtils.updateStoreFile(storeDataFileName, Array.from(stations.values()))
    }
}

function updateStatus(updateStatusData) {
    logger.debug('Updating status: ' + JSON.stringify(updateStatusData))
    if (updateStatusData) {
        let station = stations.get(updateStatusData.id)
        if (station) {
            station.status = updateStatusData.status
            stations.set(station.id, station)
        }
        StoreUtils.updateStoreFile(storeDataFileName, Array.from(stations.values()))
    }
}

function deleteStation(deletedStationInfo) {
    logger.debug("Deleting station: " + JSON.stringify(deletedStationInfo))
    let key = typeof(deletedStationInfo) === 'string' ? deletedStationInfo : deletedStationInfo.id
    stations.delete(key)
    StoreUtils.updateStoreFile(storeDataFileName, Array.from(stations.values()))
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

function editStationNotes(editStationNotesData) {
    logger.debug('Edit Notes: ' + JSON.stringify(editStationNotesData))
    let station = stations.get(editStationNotesData.id)
    if (station) {
        station.notes = editStationNotesData.notes
        stations.set(station.id, station)
    }
    StoreUtils.updateStoreFile(storeDataFileName, Array.from(stations.values()))
}

export default {
    init,
    getStations,
    addStation,
    updateFields,
    updateStatus,
    deleteStation,
    clearTime,
    editStationNotes,
}