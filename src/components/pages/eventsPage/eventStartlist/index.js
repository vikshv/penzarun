import angular from 'angular';
import component from './component';
import progressBar from 'components/common/progressBar';

export default angular.module('app.components.pages.events.startlist', [
        progressBar.name
    ])
    .component('eventStartlistPage', component);
