import 'babel-polyfill';
import angular from 'angular';
import 'angular-i18n/angular-locale_ru-ru'
import uiRouter from 'angular-ui-router';
import firebase from 'firebase';
import angularfire from 'angularfire';
import uiBootstrap from 'angular-ui-bootstrap';

import components from './components';
import directives from './directives';
import services from './services';

import './style.less';

angular.module('app', [
        uiRouter,
        'firebase',
        uiBootstrap,

        components.name,
        directives.name,
        services.name
    ])
    .config(function($urlRouterProvider) {
        'ngInject';
        
        $urlRouterProvider.otherwise('/home');

        window.firebase.initializeApp({
            apiKey: 'AIzaSyBmx88VowTEZpgtDyM02J3Y0Ntq6wBPaOE',
            authDomain: 'project-5043437142388192252.firebaseapp.com',
            databaseURL: 'https://project-5043437142388192252.firebaseio.com',
            storageBucket: 'gs://project-5043437142388192252.appspot.com'
        });
    })
    .run(function($rootScope, $state) {
        'ngInject';

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            console.error('stateChangeError:', error);
            if (error === 'AUTH_REQUIRED') {
                $state.go('home');
            }
        });
    });
