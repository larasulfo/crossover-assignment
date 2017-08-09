import template from './task.html';
import controller from './task.controller';
import './task.scss';

let taskComponent = {
    //obj has two way binding, using isOwner for delete permission, onDelete and onUpdate methods is callbacks to bucket
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
