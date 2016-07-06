import angular from 'angular';
import angularSanitize from 'angular-sanitize';
import component from './component';
import progressBar from 'components/common/progressBar';

export default angular.module('app.components.pages.events.event.card', [
        angularSanitize,
        progressBar.name
    ])
    .component('eventCardPage', component);
