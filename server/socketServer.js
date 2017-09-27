import logger from 'winston'
import stationStore from './stationStore'

let io;

export default (server) => {

    io = require('socket.io')(server);

    io.on('connection', socket => {
        logger.debug("User Connected!");

        socket.emit('add_station', Array.from(stationStore.getStations()));

        socket.on('update_station_fields', (updateFieldData) => {
            stationStore.updateFields(updateFieldData);
            io.emit('update_station_fields', updateFieldData)
        });

        socket.on('disconnect', () => {
            logger.debug("User Disconnected!")
        });
    });
};
