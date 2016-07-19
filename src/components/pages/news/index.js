import angular from 'angular';
import uiRouter from 'angular-ui-router';

import newsList from './newsList';
import newsCard from './newsCard';
import newsForm from './newsForm';

export default angular.module('app.components.pages.news', [
        uiRouter,
        newsList.name,
        newsCard.name,
        newsForm.name
    ])
    .config(function($stateProvider) {
        'ngInject';

        $stateProvider
            .state('news', {
                abstract: true,
                url: '/news',
                template: '<ui-view />'
            })
            .state('news.list', {
                url: '/list',
                template: '<news-list-page></news-list-page>'
            })
            .state('news.card', {
                url: '/card/:id',
                template: '<news-card-page id="$ctrl.id"></news-card-page>',
                controller: idStateController,
                controllerAs: '$ctrl'
            })
            .state('news.new', {
                url: '/new',
                template: '<news-form-page></news-form-page>',
                resolve: {
                    authResolve
                }
            })
            .state('news.edit', {
                url: '/edit/:id',
                template: '<news-form-page id="$ctrl.id"></news-form-page>',
                resolve: {
                    authResolve
                },
                controller: idStateController,
                controllerAs: '$ctrl'
            })
    });

function idStateController($stateParams) {
    'ngInject';
    this.id = $stateParams.id;
}

function authResolve(AuthService) {
    'ngInject';
    return AuthService.requireSignIn();
}
