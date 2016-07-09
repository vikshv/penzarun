import angular from 'angular';
import 'angular-ckeditor/angular-ckeditor.min.js';
import component from './component';

export default angular.module('app.components.pages.events.event.form', [
        'ckeditor'
    ])
    .component('eventFormPage', component);
