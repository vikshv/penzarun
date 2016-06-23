import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.components.pages.about', [])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('about', {
                url: '/about',
                template: '<about></about>'
            });
    })
    .component('about', {
        template,
        controller
    });
