import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './component';
import filter from './components/filter';
import event from './components/event';
import eventsList from 'components/common/eventsList';

export default angular.module('app.components.pages.events', [
        uiRouter,
        event.name,
        filter.name,
        eventsList.name
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
                template: '<events></events>',
                resolve: {
                    load: function(EventService) {
                        'ngInject';
                        return EventService.load();
                    }
                }
            })
            .state('events.new', {
                url: '/new',
                template: '<event></event>',
                resolve: {
                    auth: function() {
                        'ngInject';
                        return true;
                    }
                }
            })
            .state('events.edit', {
                url: '/edit/:id',
                template: '<event id="$ctrl.id"></event>',
                resolve: {
                    auth: function() {
                        'ngInject';
                        return true;
                    }
                },
                controller: function($stateParams) {
                    'ngInject';
                    this.id = $stateParams.id;
                },
                controllerAs: '$ctrl'
            });
    })
    .component('events', component);
