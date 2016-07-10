import angular from 'angular';
import angularSanitize from 'angular-sanitize';
import component from './component';

export default angular.module('app.components.pages.events.event.card.body', [
        angularSanitize
    ])
    .component('eventCardBody', component);
