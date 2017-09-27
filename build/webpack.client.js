const buildpaths = require('../buildpaths');
const path = require('path');

module.exports = {
    entry: [
        buildpaths.client.entry
    ],
    output: {
        path: buildpaths.output.clientPath,
        filename: '[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': buildpaths.client.src
        },
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: require('./vueLoaderOptions')
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [buildpaths.client.src, buildpaths.common.src]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: buildpaths.assets(['img', '[name].[hash:7].[ext]'])
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: buildpaths.assets(['media', '[name].[hash:7].[ext]'])
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: buildpaths.assets(['fonts', '[name].[hash:7].[ext]'])
                }
            }
        ]
    }
};