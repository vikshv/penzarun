import angular from 'angular';

import authService from './authService';
import eventService from './eventService';
import firebaseService from './firebaseService';
import fileStorageService from './fileStorageService';

export default angular.module('app.services', [
    authService.name,
    eventService.name,
    firebaseService.name,
    fileStorageService.name
]);
