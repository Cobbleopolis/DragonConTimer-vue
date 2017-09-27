
const path = require('path');
const webpackConfig = require('../../build/webpack.client.test');

webpackConfig.module.rules.forEach(loader => {
    if (/^babel(-loader)?$/.test(loader.loader))
        loader.include.push(path.resolve('.', 'test', 'client'))
});

module.exports = (config) => {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec'],
        files: ['./**/*.spec.js'],
        preprocessors: {
            './**/*.spec.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            noInfo: true
        }
    })
};