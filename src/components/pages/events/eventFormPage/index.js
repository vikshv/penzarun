import angular from 'angular';
import angularMessages from 'angular-messages';
import 'angular-ckeditor/angular-ckeditor.min.js';
import component from './component';

export default angular.module('app.components.pages.events.event.form', [
        angularMessages,
        'ckeditor'
    ])
    .component('eventFormPage', component);
