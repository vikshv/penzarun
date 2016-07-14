import angular from 'angular';
import uiRouter from 'angular-ui-router';
import components from './/components';
import component from './component';

export default angular.module('app.components.pages.calendar', [
        uiRouter,
        components.name
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('calendar', {
                url: '/calendar/:filter?dateBegin&dateEnd',
                template: '<calendar filter="$ctrl.filter" date-begin="$ctrl.dateBegin" date-end="$ctrl.dateEnd"></calendar>',
                controller: function($stateParams) {
                    'ngInject';
                    
                    this.filter = $stateParams.filter;
                    this.dateBegin = $stateParams.dateBegin;
                    this.dateEnd = $stateParams.dateEnd;
                },
                controllerAs: '$ctrl'
            });
    })
    .constant('Constants', {
        filterTagMap: {
            'events': null,
            'probegs': 'probeg',
            'marathons': 'marathon',
            'trainings': 'training'
        }
    })
    .component('calendar', component);
