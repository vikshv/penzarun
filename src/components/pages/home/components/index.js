import angular from 'angular';
import jumbotron from './jumbotron';
import info from './info';

export default angular.module('app.components.pages.home.components', [
        jumbotron.name,
        info.name
    ]);
