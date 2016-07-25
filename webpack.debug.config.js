'use strict';

var path = require ('path');
var extend = require('extend');
var webpack = require ('webpack');
var config = require('./webpack.config.js');

module.exports = extend({}, config, {
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath:  '/dist/',
        filename: 'bundle.[name].[chunkhash].js'
    },
    
    watchOptions: {
        aggregateTimeout: 300
    },

    //devtool: 'source-map'
});
