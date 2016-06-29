import angular from 'angular';
import component from './component';

import filter from './components/filter';
import eventsList from 'components/common/eventsList';
import progressBar from 'components/common/progressBar';

export default angular.module('app.components.pages.events.list', [
        filter.name,
        eventsList.name,
        progressBar.name
    ])
    .component('eventsListPage', component);
