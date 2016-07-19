import angular from 'angular';
import component from './component';
import templates from './templates';

export default angular.module('app.components.pages.calendar.components.calendarDatepicker', [
        templates.name
    ])
    .component('calendarDatepicker', component);
