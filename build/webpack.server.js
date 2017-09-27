const webpack = require('webpack');
const fs = require('fs');

const buildpaths = require('../buildpaths');

const excludedNodeModules = ['.bin'];

let bannerString = 'require(\'source-map-support\').install();';

let nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (module) {
        return excludedNodeModules.indexOf(module) === -1;
    })
    .forEach(function (module) {
        nodeModules[module] = 'commonjs ' + module;
    });

module.exports = {
    entry: [buildpaths.server.entry],
    target: 'node',
    output: {
        path: buildpaths.output.base,
        filename: buildpaths.server.outputName
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [ buildpaths.server.src, buildpaths.common.src ]
            }
        ]
    },
    externals: nodeModules,
    plugins: [
        new webpack.BannerPlugin({
            banner: bannerString,
            raw: true,
            entryOnly: false
        })
    ],
    devtool: 'source-map'
};