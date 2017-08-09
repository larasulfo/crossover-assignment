import template from './task.html';
import controller from './task.controller';
import './task.scss';

let taskComponent = {
  bindings: {
      obj:'=',
      isOwner:'<',
      onDelete:'&',
      onUpdate:'&'
  },
  template,
  controller
};

export default taskComponent;
