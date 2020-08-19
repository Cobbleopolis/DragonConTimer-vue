import StationStatus from './StationStatus'
import moment from 'moment'

export default class Station {

    constructor(id, stationName, status, consoleOptions, playerName, currentConsole, currentGame, checkoutTime, notes) {
        this.id = id;
        this.stationName = stationName || id;
        this.status = status || StationStatus.DEFAULT;
        this.consoleOptions = consoleOptions || [];
        this.playerName = playerName || '';
        this.currentConsole = currentConsole || '';
        this.currentGame = currentGame || '';
        this.checkoutTime = checkoutTime ? moment(checkoutTime) : null;
        this.notes = notes || '';
    }

    timeSinceCheckout() {
        return this.checkoutTime ? moment.duration(moment(moment.now()).diff(this.checkoutTime)) : null
    }

};