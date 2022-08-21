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

        socket.on(SocketEvents.Consoles.ADD_CONSOLE, (addedConsole) => {
            consoleStore.addConsole(addedConsole)
            io.emit(SocketEvents.Consoles.ADD_CONSOLE, addedConsole)
        })

        socket.on(SocketEvents.Stations.ADD_STATION, (addedStation => {
            stationStore.addStation(addedStation)
            io.emit(SocketEvents.Stations.ADD_STATION, addedStation)
        }))

        socket.on(SocketEvents.Consoles.DELETE_CONSOLE, (deletedConsole => {
            consoleStore.deleteConsole(deletedConsole)
            io.emit(SocketEvents.Consoles.DELETE_CONSOLE, deletedConsole)
        }))

        socket.on(SocketEvents.Stations.DELETE_STATION, (deletedStation => {
            stationStore.deleteStation(deletedStation)
            io.emit(SocketEvents.Stations.DELETE_STATION, deletedStation)
        }))

        socket.on(SocketEvents.Consoles.UPDATE_CONSOLE_FIELDS, (updateFieldData) => {
            consoleStore.updateFields(updateFieldData)
            io.emit(SocketEvents.Consoles.UPDATE_CONSOLE_FIELDS, updateFieldData)
        })

        socket.on('disconnect', () => {
            logger.debug("User Disconnected!")
        });
    });
};
