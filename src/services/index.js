import angular from 'angular';

import authService from './authService';
import eventService from './eventService';
import firebaseService from './firebaseService';
import fileStorageService from './fileStorageService';
import startlistService from './startlistService';
import updateService from './updateService';
import newsService from './newsService';
import counterService from './counterService';

export default angular.module('app.services', [
    authService.name,
    eventService.name,
    firebaseService.name,
    fileStorageService.name,
    startlistService.name,
    updateService.name,
    newsService.name,
    counterService
]);
