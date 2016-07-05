import angular from 'angular';
import 'textangular/dist/textAngular-sanitize.min';
import textAngular from 'textAngular';
import component from './component';
import progressBar from 'components/common/progressBar';

export default angular.module('app.components.pages.events.event.form', [
        textAngular,
        progressBar.name
    ])
    .component('eventFormPage', component);
