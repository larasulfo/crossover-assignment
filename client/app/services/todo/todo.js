import angular from 'angular';
import TodoService from './todo.service';

let HelpersModule = angular.module('helpers', [])

    .service('todoService', TodoService)
    .name;

export default HelpersModule;
