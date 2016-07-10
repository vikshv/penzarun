import angular from 'angular';
import component from './component';
import eventCardHeader from './components/eventCardHeader';
import eventCardBody from './components/eventCardBody';
import eventCardFooter from './components/eventCardFooter';

export default angular.module('app.components.pages.events.event.card', [
        eventCardHeader.name,
        eventCardBody.name,
        eventCardFooter.name
    ])
    .component('eventCardPage', component);
