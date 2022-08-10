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

function addConsole(addedConsoleData) {
    let addedConsole = new Console(
        addedConsoleData.id,
        addedConsoleData.name,
        addedConsoleData.games,
        addedConsoleData.checkoutWarning
    )
    consoles.set(addedConsole.id, addedConsole)
    StoreUtils.updateStoreFile(storeDataFileName, Array.from(consoles.values()))
}

function updateFields(updateFieldData) {
    logger.debug("Updating fields: " + JSON.stringify(updateFieldData))
    if (updateFieldData) {
        let console = consoles.get(updateFieldData.id);
        let updateData = updateFieldData.fields
        if (console) {
            if (updateFieldData.id !== updateData.id) {
                consoles.delete(updateFieldData.id)
                consoles.set(updateData.id, new Console(
                    updateData.id,
                    updateData.name,
                    updateData.games,
                    updateData.checkoutWarning
                ))
            } else {
                Object.keys(updateData).forEach(field => {
                    if (field === 'games') {
                        console[field] = input[field].map(o => new Game(o.name, o.count))
                    } else {
                        console[field] = input[field]
                    }
                })
                consoles.set(console.id, console)
            }
        }
    }
    StoreUtils.updateStoreFile(storeDataFileName, Array.from(consoles.values()))
}

function deleteConsole(deletedConsoleInfo) {
    logger.debug("Deleting console: " + JSON.stringify(deletedConsoleInfo))
    let key = typeof(deletedConsoleInfo) === 'string' ? deletedConsoleInfo : deletedConsoleInfo.id
    consoles.delete(key)
    StoreUtils.updateStoreFile(storeDataFileName, Array.from(consoles.values()))
}

export default {
    init,
    getConsoles,
    addConsole,
    updateFields,
    deleteConsole
};