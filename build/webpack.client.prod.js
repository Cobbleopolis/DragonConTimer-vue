const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebPackConfig = require('./webpack.client');
const buildpaths = require('../buildpaths');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(baseWebPackConfig, {
    mode: 'production',
    devtool: '#source-map',
    output: {
        path: buildpaths.output.base,
        filename: buildpaths.output.assets(['js', '[name].[chunkhash].js']),
        chunkFilename: buildpaths.output.assets(['js', '[id].[chunkhash].js'])
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new ExtractTextPlugin({
            filename: buildpaths.output.assets(['css', 'style.css'])
        }),
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
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
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                // any required modules inside node_modules are extracted to vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                );
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
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