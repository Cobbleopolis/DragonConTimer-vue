import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackConfig from '../build/webpack.client.dev'

const app =  express();

const compiler = webpack(webpackConfig);
const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

export default app;