const webpack = require('webpack');
const { merge } = require('webpack-merge');
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
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: buildpaths.config.path,
                    to: buildpaths.output.configPath,
                    globOptions: {
                        ignore: [
                            '**/local*',
                            '**/.gitkeep'
                        ]
                    }
                },
                {
                    from: buildpaths.storeData.path,
                    to: buildpaths.output.productionStoreDataPath,
                    globOptions: {
                        ignore: [
                            '**/local*',
                            '**/.gitkeep'
                        ]
                    }
                    
                },
                {
                    from: buildpaths.productionConf.path,
                    to: buildpaths.output.productionConfPath,
                    globOptions: {
                        ignore: [
                            '**/local*',
                            '**/.gitkeep'
                        ]
                    }
                },
                {
                    from: buildpaths.packageDetail.path,
                    to: buildpaths.output.packageDetailPath,
                    globOptions: {
                        ignore: [
                            '**/local*',
                            '**/.gitkeep'
                        ]
                    }
                }
            ]
        })
    ]
});