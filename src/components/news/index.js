import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

const moduleName = 'app.news';

angular.module(moduleName, [])
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
})

export default moduleName;
