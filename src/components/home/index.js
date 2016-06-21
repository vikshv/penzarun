import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

const moduleName = 'app.home';

angular.module(moduleName, [])
.config(function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('home', {
            url: '/home',
            template: '<home></home>'
        });
})
.component('home', {
    template,
    controller
})

export default moduleName;
