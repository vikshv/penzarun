import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularfire from 'angularfire';

import navbar from './components/navbar';
import footer from './components/footer';
import calendar from './components/calendar';

import './style.less';

angular.module('app', [
    uiRouter,
    angularfire,
    navbar,
    footer,
    calendar
])
.config(function($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('about', {
            url: '/about',
            template: '<about></about>'
        });
});
