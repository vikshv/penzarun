import angular from 'angular';

import navbar from './common/navbar';
import footer from './common/footer';

import pages from './pages';

export default angular.module('app.components', [
    navbar.name,
    footer.name,
    pages.name
]);
