import angular from 'angular';
import ngAnimate from 'angular-animate';
import angularSanitize from 'angular-sanitize';
import component from './component';

export default angular.module('app.components.pages.events.event.card.body', [
        angularSanitize,
        'ui.bootstrap',
        ngAnimate
    ])
    .component('eventCardBody', component);
