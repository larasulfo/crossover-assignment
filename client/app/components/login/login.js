import angular from 'angular';
import uiRouter from 'angular-ui-router';
import loginComponent from './login.component';

let loginModule = angular.module('login', [
    uiRouter
])

    .component('login', loginComponent)
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('login', {
                url: '/login',
                component: 'login'
            });
    })
    .name;

export default loginModule;
