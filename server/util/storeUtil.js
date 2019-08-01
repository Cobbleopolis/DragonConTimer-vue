import path from 'path'
import config from 'config'
import fs from 'fs'

const storeDataDir = config.has('storeDataDir') ? config.get('storeDataDir') : './storeData';

function getStoreFileLocation(storeFileName) {
    return path.resolve(storeDataDir, storeFileName);
}

function ensureStoreFile(storeFileName, defaultContent) {
    if (!fs.existsSync(storeDataDir))
        fs.mkdirSync(storeDataDir);
    let storeFilePath = getStoreFileLocation(storeFileName);
    if (!fs.existsSync(storeFilePath))
        updateStoreFile(storeFileName, defaultContent ? defaultContent : '[]');
}

function getStoreFileContent(storeFileName) {
    return JSON.parse(fs.readFileSync(getStoreFileLocation(storeFileName)))
}

function updateStoreFile(storeFileName, content) {
    let formattedContent = content;
    if (typeof content != 'string')
        formattedContent = JSON.stringify(content, null, 2);
    fs.writeFileSync(getStoreFileLocation(storeFileName), formattedContent);
}

export default {
    getStoreFileLocation,
    ensureStoreFile,
    getStoreFileContent,
    updateStoreFile
}