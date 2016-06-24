import angular from 'angular';

import home from './home';
import news from './news';
import calendarPage from './calendarPage';
import eventsPage from './eventsPage';
import about from './about';
import login from './login';
import userPage from './userPage';

export default angular.module('app.components.pages', [
    home.name,
    news.name,
    calendarPage.name,
    eventsPage.name,
    about.name,
    login.name,
    userPage.name
]);
