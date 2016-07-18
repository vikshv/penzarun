import angular from 'angular';
import infoNews from './infoNews';
import infoEvent from './infoEvent';
import infoUpdate from './infoUpdate';

export default angular.module('app.components.pages.home.components.info.components', [
        infoNews.name,
        infoEvent.name,
        infoUpdate.name
    ]);
