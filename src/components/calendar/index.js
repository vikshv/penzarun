import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

const moduleName = 'app.calendar';

angular.module(moduleName, [])
.config(function($stateProvider, $urlRouterProvider) {
    'ngInject';

    $stateProvider
        .state('calendar', {
            url: '/calendar',
            template: '<calendar></calendar>'
        });
})
.component('calendar', {
    template,
    controller
})

export default moduleName;
