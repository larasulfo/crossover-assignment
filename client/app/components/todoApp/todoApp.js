import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todoAppComponent from './todoApp.component';

let todoAppModule = angular.module('todoApp', [
    uiRouter
])

    .component('todoApp', todoAppComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('todo_app', {
                url: '/',
                component: 'todoApp'
            });
    })
    .name;

export default todoAppModule;
