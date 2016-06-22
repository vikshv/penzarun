import angular from 'angular';
import uiRouter from 'angular-ui-router';
import firebase from 'firebase';
import angularfire from 'angularfire';

import components from './components';
import services from './services';

import './style.less';

angular.module('app', [
    uiRouter,
    'firebase',

    components.name,
    services.name
])
.config(function($urlRouterProvider) {
    'ngInject';
    
    $urlRouterProvider.otherwise('/home');

    window.firebase.initializeApp({
        apiKey: "AIzaSyBmx88VowTEZpgtDyM02J3Y0Ntq6wBPaOE",
        authDomain: "project-5043437142388192252.firebaseapp.com",
        databaseURL: "https://project-5043437142388192252.firebaseio.com",
        storageBucket: ""
    });
});
