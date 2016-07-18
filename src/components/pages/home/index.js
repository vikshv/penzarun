import angular from 'angular';
import component from './component';
import components from './components';

export default angular.module('app.components.pages.home', [
        components.name
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('home', {
                url: '/home',
                template: '<home></home>'
            });
    })
    .component('home', component);
