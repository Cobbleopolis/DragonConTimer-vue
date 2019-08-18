import StationStatus from './StationStatus'
import moment from 'moment'

export default class Station {

    constructor(id, stationName, status, consoleOptions, playerName, currentConsole, currentGame, checkoutTime) {
        this.id = id;
        this.stationName = stationName || id;
        this.status = status || StationStatus.DEFAULT;
        this.consoleOptions = consoleOptions || [];
        this.playerName = playerName || '';
        this.currentConsole = currentConsole || '';
        this.currentGame = currentGame || '';
        this.checkoutTime = checkoutTime ? moment(checkoutTime) : null;
    }

};