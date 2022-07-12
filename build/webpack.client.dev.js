const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebPackConfig = require('./webpack.client');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('@soda/friendly-errors-webpack-plugin');

const buildpaths = require('../buildpaths');

baseWebPackConfig.entry.unshift('webpack-hot-middleware/client?reload=true');

module.exports = merge(baseWebPackConfig, {
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            template: buildpaths.client.htmlTemplateFile,
            inject: 'body',
            filename: path.basename(buildpaths.client.htmlTemplateFile)
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin()
    ]
});