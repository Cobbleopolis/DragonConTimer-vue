const buildpaths = require('../buildpaths');
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const isProduction = process.env.NODE_ENV === 'production'

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
            },
            {
                test: /\.css$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                indentedSyntax: true
                            }
                        }
                    }

                ]
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: buildpaths.output.assets(['css', 'styles.css']),
            chunkFilename: buildpaths.output.assets(['css', '[id].css'])
        })
    ]
};