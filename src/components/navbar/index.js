import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

const moduleName = 'app.navbar';

angular.module(moduleName, []).component('navbar', {
    template,
    controller
});

export default moduleName;
