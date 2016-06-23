import angular from 'angular';
import component from './component';

import filter from './components/filter';
import eventsList from 'components/common/eventsList';

export default angular.module('app.components.pages.events.list', [
        filter.name,
        eventsList.name
    ])
    .component('eventsListPage', component);
