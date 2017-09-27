const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    loaders: {
        'scss': ['vue-style-loader', 'css-loader', 'sass-loader'],
        'sass': ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
    },
    extractCSS: isProduction
};