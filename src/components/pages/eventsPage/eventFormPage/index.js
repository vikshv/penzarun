import angular from 'angular';
import 'angular-ckeditor/angular-ckeditor.min.js';
import component from './component';
import progressBar from 'components/common/progressBar';

export default angular.module('app.components.pages.events.event.form', [
        'ckeditor',
        progressBar.name
    ])
    .component('eventFormPage', component);
