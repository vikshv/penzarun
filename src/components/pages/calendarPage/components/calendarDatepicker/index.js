import angular from 'angular';
import component from './component';
//import directives from './directives';
import templates from './templates';

export default angular.module('app.components.pages.calendar.components.calendarDatepicker', [
        //directives.name,
        templates.name
    ])
    .component('calendarDatepicker', component);
