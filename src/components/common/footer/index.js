import angular from 'angular';
import controller from './controller';
import template from './template.html';
import './style.less';

export default angular.module('app.components.footer', []).component('footer', {
    template,
    controller
});
