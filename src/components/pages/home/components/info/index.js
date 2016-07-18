import angular from 'angular';
import component from './component';
import components from './components';

export default angular.module('app.components.pages.home.components.info', [
        components.name
    ])
    .component('info', component);
