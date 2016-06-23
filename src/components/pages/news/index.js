import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.components.pages.news', [])
.config(function($stateProvider) {
    'ngInject';

    $stateProvider
        .state('news', {
            url: '/news',
            template: '<news></news>'
        });
})
.component('news', {
    template,
    controller
});
