import angular from 'angular';
import component from './component';
import filter from './components/filter';

export default angular.module('app.components.pages.events.list', [
        filter.name
    ])
    .component('eventsListPage', component);
