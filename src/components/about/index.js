import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

const moduleName = 'app.about';

angular.module(moduleName, [])
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
})

export default moduleName;
