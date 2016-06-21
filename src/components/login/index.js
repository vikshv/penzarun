import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

const moduleName = 'app.login';

angular.module(moduleName, [])
.config(function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        });
})
.component('login', {
    template,
    controller
})

export default moduleName;
