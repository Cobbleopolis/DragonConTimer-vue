const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebPackConfig = require('./webpack.client');

const buildpaths = require('../buildpaths');

module.exports = merge(baseWebPackConfig, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('testing')
        }),
        new webpack.optimize.OccurrenceOrderPlugin()
    ]
});