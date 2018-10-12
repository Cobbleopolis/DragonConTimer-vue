const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    loaders: {
        'css': ['vue-style-loader', 'style-lader'],
        'scss': ['vue-style-loader', 'css-loader', 'sass-loader'],
        'sass': ['vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
    },
    extractCSS: isProduction
};