import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularfire from 'angularfire';

import navbar from './components/navbar';
import footer from './components/footer';

import home from './components/home';
import news from './components/news';
import calendar from './components/calendar';
import events from './components/events';
import about from './components/about';
import login from './components/login';

import './style.less';

angular.module('app', [
    uiRouter,
    angularfire,
    navbar,
    footer,
    home,
    news,
    calendar,
    events,
    about,
    login
])
.config(function($urlRouterProvider) {
    'ngInject';

    $urlRouterProvider.otherwise('/home');
});
