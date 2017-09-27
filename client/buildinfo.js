const packageConfig = require('../package.json');

module.exports = {
    displayName: packageConfig.displayName,
    projectVersion: packageConfig.version,
    description: packageConfig.description,
    author: packageConfig.author
};
