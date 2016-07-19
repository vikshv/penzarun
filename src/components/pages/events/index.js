import angular from 'angular';
import uiRouter from 'angular-ui-router';

import eventFormPage from './eventFormPage';
import eventCardPage from './eventCardPage';
import eventsListPage from './eventsListPage';
import eventStartlistPage from './eventStartlistPage';
import eventRegisterPage from './eventRegisterPage';

export default angular.module('app.components.pages.events', [
        uiRouter,
        eventFormPage.name,
        eventCardPage.name,
        eventsListPage.name,
        eventStartlistPage.name,
        eventRegisterPage.name
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
                    authResolve
                }
            })
            .state('events.edit', {
                url: '/edit/:id',
                template: '<event-form-page id="$ctrl.id"></event-form-page>',
                resolve: {
                    authResolve
                },
                controller: idStateController,
                controllerAs: '$ctrl'
            })
            .state('events.card', {
                url: '/card/:id',
                template: '<event-card-page id="$ctrl.id"></event-card-page>',
                controller: idStateController,
                controllerAs: '$ctrl'
            })
            .state('events.startlist', {
                url: '/startlist/:id',
                template: '<event-startlist-page id="$ctrl.id"></event-startlist-page>',
                controller: idStateController,
                controllerAs: '$ctrl'
            })
            .state('events.register', {
                url: '/register/:id',
                template: '<event-register-page id="$ctrl.id"></event-register-page>',
                resolve: {
                    authResolve
                },
                controller: idStateController,
                controllerAs: '$ctrl'
            });
    });

function idStateController($stateParams) {
    'ngInject';
    this.id = $stateParams.id;
}

function authResolve(AuthService) {
    'ngInject';
    return AuthService.requireSignIn();
}
