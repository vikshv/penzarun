import angular from 'angular';
import datepickerTemplate from './datepicker.html';
import dayTemplate from './day.html';

export default angular.module('app.components.pages.calendar.components.calendarDatepicker.templates', [])
    .run(function($templateCache) {
        'ngInject';

        $templateCache.put('calendarDatepicker/templates/datepicker.html', datepickerTemplate);
        $templateCache.put('calendarDatepicker/templates/day.html', dayTemplate);
    });
