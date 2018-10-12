const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebPackConfig = require('./webpack.client');
const buildpaths = require('../buildpaths');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseWebPackConfig, {
    mode: 'production',
    devtool: '#source-map',
    output: {
        path: buildpaths.output.base,
        filename: buildpaths.output.assets(['js', '[name].[chunkhash].js']),
        chunkFilename: buildpaths.output.assets(['js', '[id].[chunkhash].js'])
    },
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
            maxSize: 249856,
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    reuseExistingChunk: true
                },
                styles: {
                    name: 'styles',
                    test: /(?!^[\/]node_modules[\/])^.*\.css$/,
                    // test: /\.css$/,
                    chunks: 'all',
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new OptimizeCSSPlugin({}),
        new HtmlWebpackPlugin({
            template: buildpaths.client.htmlTemplateFile,
            inject: 'body',
            filename: path.basename(buildpaths.client.htmlTemplateFile),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            chunksSortMode: 'dependency'
        }),
        new CopyWebpackPlugin([
            {
                from: buildpaths.assets(),
                to: buildpaths.output.assets(),
                ignore: [',*']
            }
        ]),
    ]
});