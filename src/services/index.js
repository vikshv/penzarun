import angular from 'angular';

import authService from './authService';
import eventService from './eventService';
import firebaseService from './firebaseService';
import provisionFileService from './provisionFileService';

export default angular.module('app.services', [
    authService.name,
    eventService.name,
    firebaseService.name,
    provisionFileService.name
]);
