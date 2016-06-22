import angular from 'angular';
import navbar from './navbar';
import footer from './footer';

export default angular.module('app.common', [
    navbar.name,
    footer.name
]);
