import angular from 'angular';
import uiRouter from 'angular-ui-router';

import eventPage from './eventPage';
import eventsListPage from './eventsListPage';

export default angular.module('app.components.pages.events', [
        uiRouter,
        eventPage.name,
        eventsListPage.name
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('events', {
                abstract: true,
                url: '/events',
                template: '<ui-view />'
            })
            .state('events.list', {
                url: '/list',
                template: '<events-list-page></events-list-page>'
            })
            .state('events.new', {
                url: '/new',
                template: '<event-page></event-page>',
                resolve: {
                    auth: function(AuthService) {
                        'ngInject';
                        return AuthService.requireSignIn();
                    }
                }
            })
            .state('events.edit', {
                url: '/edit/:id',
                template: '<event-page id="$ctrl.id"></event-page>',
                resolve: {
                    auth: function(AuthService) {
                        'ngInject';
                        return AuthService.requireSignIn();
                    },
                    load: function($stateParams, EventService) {
                        'ngInject';
                        return EventService.getEvent($stateParams.id);
                    }
                },
                controller: function($stateParams) {
                    'ngInject';
                    this.id = $stateParams.id;
                },
                controllerAs: '$ctrl'
            });
    });
