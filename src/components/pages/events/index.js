import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './component';

export default angular.module('app.events', [
        uiRouter
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider.state('events', {
            url: '/events',
            template: '<events></events>',
            resolve: {
                load: function(EventService) {
                    'ngInject';
                    return EventService.load();
                }
            }
        });
    })
    .component('events', component);
