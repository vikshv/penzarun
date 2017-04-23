'use strict';

var path = require ('path');
var webpack = require ('webpack');
var config = require('./webpack.config.js');

const prodRules = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'ng-annotate-loader'
    }
];

module.exports = Object.assign({}, config, {
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath:  './',
        filename: 'bundle.[name].[chunkhash].js'
    },

    plugins: config.plugins.concat([
        new webpack.LoaderOptionsPlugin({
            minimize: false,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true
            },
            output: {
                comments: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]),

    module: Object.assign({}, config.module, {
        rules: prodRules.concat(config.module.rules)
    })
});
