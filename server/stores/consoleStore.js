import logger from 'winston'
import Console from '../../common/api/Console'
import StoreUtils from '../util/storeUtil'

const storeDataFileName = 'consoles.json'

const storeDefaultData = []

let consoles = new Map();

function init() {
    StoreUtils.ensureStoreFile(storeDataFileName, storeDefaultData)
    StoreUtils.getStoreFileContent(storeDataFileName).map(consoleObj =>
        new Console(
            consoleObj.id,
            consoleObj.name,
            consoleObj.games,
            consoleObj.checkoutWarning
        )
    ).forEach(console => {
        consoles.set(console.id, console)
    })
    // config.get('consoles').map(consoleObj =>
    //     new Console(
    //         consoleObj.id,
    //         consoleObj.name,
    //         consoleObj.games,
    //         consoleObj.checkoutWarning
    //     )
    // ).forEach(console => {consoles.set(console.id, console)});
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
            console.checkoutWarning = updateFieldData.checkoutWarning;
            consoles.set(console.id, console);
        } else {
            let addedConsole = new Console(
                updateFieldData.id,
                updateFieldData.name,
                updateFieldData.games,
                updateFieldData.checkoutWarning
            )
            consoles.set(addedConsole.id, addedConsole)
        }
    }
    StoreUtils.updateStoreFile(storeDataFileName, Array.from(consoles.values()))
}

export default {
    init,
    getConsoles,
    updateFields
};