import angular from 'angular';

import eventService from './eventService';
import firebaseService from './firebaseService';

export default angular.module('app.services', [
    eventService.name,
    firebaseService.name
]);
