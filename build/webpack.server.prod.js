const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebPackConfig = require('./webpack.server');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const buildpaths = require('../buildpaths');

module.exports = merge(baseWebPackConfig, {
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.NormalModuleReplacementPlugin(/^(.*)\.dev(.*)$/,
            (resource) => resource.request = resource.request.replace(/(\.dev)/, '')
        ),
        new CopyWebpackPlugin([
            {
                from: buildpaths.config.path,
                to: buildpaths.output.base
            },
            {
                from: buildpaths.storeData.path,
                to: buildpaths.output.base
            }
        ], {
            ignore: [
                'local*',
                '.gitkeep'
            ],
            copyUnmodified: true
        })
    ]
});