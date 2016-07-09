import angular from 'angular';
import uiRouter from 'angular-ui-router';
import component from './component';

export default angular.module('app.components.pages.calendar', [
        uiRouter
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
