import logger from 'winston'
import config from 'config'
import stationStore from './stores/stationStore'
import consoleStore from './stores/consoleStore'
import SocketEvents from '../common/ref/SocketEvents'

let io;

let CoreInfo = {
    headerTitle: config.get('headerTitle'),
    times: config.get('times')
}

export default (server) => {

    io = require('socket.io')(server);

    io.on('connection', socket => {
        logger.debug("User Connected!");

        socket.emit(SocketEvents.Stations.ADD_STATION, Array.from(stationStore.getStations()));
        socket.emit(SocketEvents.Consoles.ADD_CONSOLE, Array.from(consoleStore.getConsoles()));
        socket.emit(SocketEvents.CoreInfo.SEND_CORE_INFO, CoreInfo);

        socket.on(SocketEvents.Stations.UPDATE_STATION_FIELDS, (updateFieldData) => {
            stationStore.updateFields(updateFieldData);
            io.emit(SocketEvents.Stations.UPDATE_STATION_FIELDS, updateFieldData)
        });

        socket.on(SocketEvents.Stations.UPDATE_STATION_STATUS, (updateStatusData) => {
            stationStore.updateStatus(updateStatusData)
            io.emit(SocketEvents.Stations.UPDATE_STATION_STATUS, updateStatusData)
        })

        socket.on(SocketEvents.Stations.CLEAR_TIME, (stationIdData) => {
            stationStore.clearTime(stationIdData)
            io.emit(SocketEvents.Stations.CLEAR_TIME, stationIdData);
        })

        socket.on(SocketEvents.Stations.EDIT_NOTES, (editStationNotesData) => {
            stationStore.editStationNotes(editStationNotesData)
            io.emit(SocketEvents.Stations.EDIT_NOTES, editStationNotesData)
        })

        socket.on('disconnect', () => {
            logger.debug("User Disconnected!")
        });
    });
};
