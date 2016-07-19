import angular from 'angular';

import home from './home';
import news from './news';
import calendar from './calendar';
import events from './events';
import about from './about';
import login from './login';
import user from './user';

export default angular.module('app.components.pages', [
    home.name,
    news.name,
    calendar.name,
    events.name,
    about.name,
    login.name,
    user.name
]);
