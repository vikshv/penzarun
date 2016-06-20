import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

const moduleName = 'app.footer';

angular.module(moduleName, []).component('footer', {
    template,
    controller
});

export default moduleName;
