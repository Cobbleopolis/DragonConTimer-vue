import logger from 'winston'
import config from 'config'
import Console from '../../common/api/Console'

let consoles = new Map();

function init() {
    config.get('consoles').map(consoleObj =>
        new Console(
            consoleObj.id,
            consoleObj.name,
            consoleObj.games
        )
    ).forEach(console => {consoles.set(console.id, console)});
}

function getConsoles() {
    return consoles.values();
}

function updateFields(updateFieldData) {
    logger.debug("Updating fields: " + JSON.stringify(updateFieldData))
    if (updateFieldData) {
        let console = consoles.get(updateFieldData.id);
        if (console) {
            console.id = updateFieldData.id;
            console.name = updateFieldData.name;
            console.games = updateFieldData.games;
            consoles.set(console.id, console);
        }
    }
}

export default {
    init,
    getConsoles,
    updateFields
};