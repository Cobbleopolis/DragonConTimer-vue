const path = require('path');

const assetSrc = path.resolve('.', 'assets');

const clientSrc = path.resolve('.', 'client');
const clientJsOutputName = 'main.js';
const clientEntry = path.join(clientSrc, clientJsOutputName);
const clientHtmlTemplateFile = path.join(clientSrc, 'index.html');

const commonSrc = path.resolve('.', 'common');

const configPath = path.resolve('.', 'config');

const storeDataPath = path.resolve('.', 'storeData', '*');

const productionConfigPath = path.resolve('.', 'production.json');

const packageDetailPath = path.resolve('.', 'package.json');

const outputBasePath = path.resolve('.', 'dist');
const outputAssetPath = 'public';
const outputConfigPath = path.join(outputBasePath, path.basename(configPath));
const outputProductionConfigPath = path.join(outputConfigPath, path.basename(productionConfigPath));
const outputPackageDetailPath = path.join(outputBasePath, path.basename(packageDetailPath));

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
    storeData: {
        path: storeDataPath
    },
    productionConf: {
        path: productionConfigPath
    },
    packageDetail: {
        path: packageDetailPath
    },
    output: {
        base: outputBasePath,
        assets(assetExt) {
            return getAssetPath(outputAssetPath, assetExt)
        },
        configPath: outputConfigPath,
        productionConfPath: outputProductionConfigPath,
        packageDetailPath: outputPackageDetailPath
    },
    server: {
        src: serverSrc,
        entry: serverEntry,
        devEntry: serverDevEntry,
        outputName: serverOutputName
    }
};

module.exports = paths;