'use strict';

var path = require ('path');
var webpack = require ('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebPackPlugin = require('html-webpack-plugin');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    entry: {
        penzarun: './src/index.js'
    },

    output: {
        filename: 'bundle.[name].[chunkhash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },

    resolve: {
        modules: [
            __dirname,
            'node_modules'
        ],
        alias: {
            components: 'src/components'
        }
    },

    resolveLoader: {
        moduleExtensions: ['-loader']
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ngAnnotatePlugin({
            add: true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: module => module.context && module.context.includes('node_modules')
        }),
        new ExtractTextPlugin('penzarun.css'),
        new HtmlWebPackPlugin({
            template: './index.html',
            favicon: './src/content/ico/favicon.ico'
        }),
        new ProgressBarPlugin()
    ],

    module: {
        noParse: [
            /\/node_modules\//
        ],
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel',
                        options: {
                            presets: [
                                ['es2015', {
                                    modules: false
                                }],
                                'stage-0'
                            ],
                            cacheDirectory: false
                        }
                    }
                ]
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
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html',
                        options: {
                            minimize: true
                        }
                    }
                ]
            }
        ]
    },

    stats: {
        children: false
    }
};
