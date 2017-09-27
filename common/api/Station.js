import StationStatus from './StationStatus'

export default class Station {

    constructor(id, stationName, status, consoleOptions, playerName, currentConsole, currentGame) {
        this.id = id;
        this.stationName = stationName || id;
        this.status = status || StationStatus.DEFAULT;
        this.consoleOptions = consoleOptions || [];
        this.playerName = playerName || '';
        this.currentConsole = currentConsole || '';
        this.currentGame = currentGame || '';
    }

};