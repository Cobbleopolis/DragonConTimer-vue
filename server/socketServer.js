import logger from 'winston'
import stationStore from './stationStore'
import SocketEvents from '../common/ref/SocketEvents'

let io;

export default (server) => {

    io = require('socket.io')(server);

    io.on('connection', socket => {
        logger.debug("User Connected!");

        socket.emit(SocketEvents.Stations.ADD_STATION, Array.from(stationStore.getStations()));

        socket.on(SocketEvents.Stations.UPDATE_STATION_FIELDS, (updateFieldData) => {
            stationStore.updateFields(updateFieldData);
            io.emit(SocketEvents.Stations.UPDATE_STATION_FIELDS, updateFieldData)
        });

        socket.on('disconnect', () => {
            logger.debug("User Disconnected!")
        });
    });
};
