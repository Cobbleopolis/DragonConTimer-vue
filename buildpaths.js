const path = require('path');

const assetSrc = path.resolve('.', 'assets');

const clientSrc = path.resolve('.', 'client');
const clientJsOutputName = 'main.js';
const clientEntry = path.join(clientSrc, clientJsOutputName);
const clientHtmlTemplateFile = path.join(clientSrc, 'index.html');

const commonSrc = path.resolve('.', 'common');

const configPath = path.resolve('.', 'config', '*');

const outputBasePath = path.resolve('.', 'dist');
const outputAssetPath = 'public';
const outputConfigPath = path.join(outputBasePath, path.basename(configPath));

const serverSrc = path.resolve('.', 'server');
const serverOutputName = 'server.js';
const serverEntry = path.join(serverSrc, serverOutputName);
const serverDevEntry = path.join(
    serverSrc,
    path.basename(
        serverEntry,
        path.extname(serverEntry)
    ) + '.dev' + path.extname(serverEntry)
);

function getAssetPath(prefix, assetExt) {
    if (assetExt)
        if (Array.isArray(assetExt))
            return path.join(prefix, ...assetExt);
        else
            return path.join(prefix, assetExt);
    else
        return prefix;
}

const paths = {
    assets(assetExt) {
        return getAssetPath(assetSrc, assetExt)
    },
    client: {
        src: clientSrc,
        entry: clientEntry,
        htmlTemplateFile: clientHtmlTemplateFile
    },
    common: {
        src: commonSrc
    },
    config: {
        path: configPath
    },
    output: {
        base: outputBasePath,
        assets(assetExt) {
            return getAssetPath(outputAssetPath, assetExt)
        },
        configPath: outputConfigPath
    },
    server: {
        src: serverSrc,
        entry: serverEntry,
        devEntry: serverDevEntry,
        outputName: serverOutputName
    }
};

module.exports = paths;