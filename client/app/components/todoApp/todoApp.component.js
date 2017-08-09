import template from './todoApp.html';
import controller from './todoApp.controller';
import './todoApp.scss';

let todoAppComponent = {
    restrict: 'E',
    bindings: {
        todoList: '='
    },
    template,
    controller
};

export default todoAppComponent;
