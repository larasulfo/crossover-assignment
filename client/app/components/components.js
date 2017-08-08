import angular from 'angular';
import todoApp from './todoApp/todoApp';
import login from './login/login';

let componentModule = angular.module('app.components', [
    todoApp,
    login
])

    .name;

export default componentModule;
