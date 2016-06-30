'use strict';

var path = require ('path');
var webpack = require ('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.join(__dirname, '/'),

    entry: {
        vendor: [
            'angular',
            'angularfire',
            'angular-ui-router',
            'angular-i18n/angular-locale_ru-ru',
            'firebase',
            'angular-ui-bootstrap',
            'babel-polyfill',
            'jquery'
        ],
        penzarun: './src/index.js'
    },

    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'bundle.[name].[chunkhash].js'
    },
    
    watchOptions: {
        aggregateTimeout: 300
    },

    //devtool: 'source-map',

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            LANG: JSON.stringify('ru')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         drop_console: true,
        //         unsafe: true
        //     }
        // }),
        new ExtractTextPlugin('penzarun.css'),
        new ngAnnotatePlugin({
            add: true
        }),
        new HtmlWebPackPlugin({
            template: './index.html'
        })
    ],

    resolve: {
        root: __dirname,
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js'],
        alias: {
            components: 'src/components'
        }
    },

    resolveLoader: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'stage-0']
                }
            },
            {
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract('css?sourceMap')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')
            }, 
            {
                test: /\.html/, 
                loader: 'html'
            }
        ]
    },

    noParse: [
        /\/node_modules\/(angular|bootstrap|jquery|font-awesome)/
    ]
};

