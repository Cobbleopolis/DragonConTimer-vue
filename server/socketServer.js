import logger from 'winston'
import stationStore from './stores/stationStore'
import consoleStore from './stores/consoleStore'
import SocketEvents from '../common/ref/SocketEvents'

let io;

export default (server) => {

    io = require('socket.io')(server);

    io.on('connection', socket => {
        logger.debug("User Connected!");

        socket.emit(SocketEvents.Stations.ADD_STATION, Array.from(stationStore.getStations()));
        socket.emit(SocketEvents.Consoles.ADD_CONSOLE, Array.from(consoleStore.getConsoles()));

        socket.on(SocketEvents.Stations.UPDATE_STATION_FIELDS, (updateFieldData) => {
            stationStore.updateFields(updateFieldData);
            io.emit(SocketEvents.Stations.UPDATE_STATION_FIELDS, updateFieldData)
        });

        socket.on('disconnect', () => {
            logger.debug("User Disconnected!")
        });
    });
};
