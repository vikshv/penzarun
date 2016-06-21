import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

const moduleName = 'app.events';

angular.module(moduleName, [])
.config(function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('events', {
            url: '/events',
            template: '<events></events>'
        });
})
.component('events', {
    template,
    controller
})

export default moduleName;
