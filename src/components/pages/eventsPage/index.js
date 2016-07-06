import angular from 'angular';
import uiRouter from 'angular-ui-router';

import eventFormPage from './eventFormPage';
import eventCardPage from './eventCardPage';
import eventsListPage from './eventsListPage';
import eventStartlist from './eventStartlist';

export default angular.module('app.components.pages.events', [
        uiRouter,
        eventFormPage.name,
        eventCardPage.name,
        eventsListPage.name,
        eventStartlist.name
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
                template: '<event-form-page></event-form-page>',
                resolve: {
                    auth: function(AuthService) {
                        'ngInject';
                        return AuthService.requireSignIn();
                    }
                }
            })
            .state('events.edit', {
                url: '/edit/:id',
                template: '<event-form-page id="$ctrl.id"></event-form-page>',
                resolve: {
                    auth: function(AuthService) {
                        'ngInject';
                        return AuthService.requireSignIn();
                    }
                },
                controller: function($stateParams) {
                    'ngInject';
                    this.id = $stateParams.id;
                },
                controllerAs: '$ctrl'
            })
            .state('events.card', {
                url: '/card/:id',
                template: '<event-card-page id="$ctrl.id"></event-card-page>',
                controller: function($stateParams) {
                    'ngInject';
                    this.id = $stateParams.id;
                },
                controllerAs: '$ctrl'
            })
            .state('events.startlist', {
                url: '/startlist/:id',
                template: '<event-startlist-page id="$ctrl.id"></event-startlist-page>',
                controller: function($stateParams) {
                    'ngInject';
                    this.id = $stateParams.id;
                },
                controllerAs: '$ctrl'
            });
    });
