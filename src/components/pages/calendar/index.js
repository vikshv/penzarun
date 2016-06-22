import angular from 'angular';
import uiRouter from 'angular-ui-router';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.calendar', [
        uiRouter
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('calendar', {
                url: '/calendar',
                template: '<calendar></calendar>'
            })
            .state('calendar.events', {
                url: '/events',
                template: '<calendar></calendar>'
            })
            .state('calendar.probegs', {
                url: '/probegs',
                template: '<calendar></calendar>'
            })
            .state('calendar.marathons', {
                url: '/marathons',
                template: '<calendar></calendar>'
            })
            .state('calendar.trainings', {
                url: '/trainings',
                template: '<calendar></calendar>'
            });
    })
    .component('calendar', {
        template,
        controller
    });
