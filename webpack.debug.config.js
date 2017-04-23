'use strict';

var path = require ('path');
var extend = require('extend');
var webpack = require ('webpack');
var config = require('./webpack.config.js');

module.exports = extend({}, config, {
    watch: true,

    watchOptions: {
        aggregateTimeout: 300
    }
});
