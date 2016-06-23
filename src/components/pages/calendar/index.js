import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './component';
import eventsList from 'components/common/eventsList';

export default angular.module('app.components.pages.calendar', [
        uiRouter,
        eventsList.name
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('calendar', {
                url: '/calendar/:filter',
                template: '<calendar filter="$ctrl.filter"></calendar>',
                controller: function($stateParams) {
                    'ngInject';
                    this.filter = $stateParams.filter;
                },
                controllerAs: '$ctrl'
            });
    })
    .component('calendar', component);
