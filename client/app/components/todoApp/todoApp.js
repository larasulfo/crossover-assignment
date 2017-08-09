import angular from 'angular';
import uiRouter from 'angular-ui-router';
import todoAppComponent from './todoApp.component';
import task from './task/task';

let todoAppModule = angular.module('todoApp', [
    uiRouter,
    task
])
    .config(($stateProvider, $urlRouterProvider) => {
        "ngInject";

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('todo_app', {
                url: '/',
                component: 'todoApp',
                resolve: {
                    todoList: (todoService) => {
                        "ngInject";
                        return todoService.getTodos();
                    }
                }
            });
    })
    .component('todoApp', todoAppComponent)
    .name;

export default todoAppModule;
