const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebPackConfig = require('./webpack.server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const buildpaths = require('../buildpaths');

module.exports = merge(baseWebPackConfig, {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('testing')
        })
    ]
});