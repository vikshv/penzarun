import angular from 'angular';
import controller from './controller';

export default angular.module('app.services.counter', [])
    .service('CounterService', controller)
    .constant('CounterServiceConstants', {
        adminEmail: 'vikshv@yandex.ru',
        databaseName: 'visitors'
    })
    .name;
