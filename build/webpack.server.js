const fs = require('fs');
const webpack = require('webpack');

const buildpaths = require('../buildpaths');

const excludedNodeModules = ['.bin'];

let bannerString = 'require(\'source-map-support\').install();';

const Webpack5Replacement = (webpack.version && webpack.version[0] <= 4) ?
    new webpack.NormalModuleReplacementPlugin( //Webpack 5 fix. If upgrading to webpack 5 make sure to remove this
        /plugin-webpack5/,
        (res) => {
            if (res.context.includes('vue-loader'))
                res.request = res.request.replace(/plugin-webpack5/g, 'plugin-webpack4')
        }
    ) : null;

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
        Webpack5Replacement,
        new webpack.BannerPlugin({
            banner: bannerString,
            raw: true,
            entryOnly: false
        })
    ],
    devtool: 'source-map'
};