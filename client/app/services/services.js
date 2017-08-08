import angular from 'angular';
import todo from './todo/todo';


let servicesModule = angular.module('app.services', [
    todo
])

    .name;

export default servicesModule;