const webpack = require('webpack');

let appSide = process.argv.find((arg) => arg === 'client' || arg === 'server');

let webpackConfigFile;

if (appSide !== 'client' && appSide !== 'server')
    webpackConfigFile = [getWebpackConfig('server'), getWebpackConfig('client')]
else
    webpackConfigFile = getWebpackConfig(appSide)

webpack(webpackConfigFile, (err, stats) => {
    if (err) {
        console.error('An error occurred while compiling')
        console.error(err)
        if (err.details)
            console.error(err.details)
        return
    }

    if (stats.hasErrors())
        console.error(stats.toJson().errors)

    if (stats.hasWarnings())
        console.warn(stats.toJson().warnings)

    console.log(stats.toString({
        chunks: true,
        colors: true
    }))
})

function getWebpackConfig(side) {
    switch (process.env.NODE_ENV) {
        case 'development':
            return require(`./webpack.${side}.dev`);
        case 'production':
            return require(`./webpack.${side}.prod`);
        case 'testing':
            return require(`./webpack.${side}.test`);
        default:
            return require(`./webpack.${side}`);
    }
}
