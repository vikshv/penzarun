import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.home', [])
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
});
