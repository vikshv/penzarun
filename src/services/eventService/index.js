import angular from 'angular';
import controller from './controller';

export default angular.module('app.eventService', [])
    .service('EventService', controller);
