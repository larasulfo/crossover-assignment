import TaskModule from './task';
import TaskController from './task.controller';
import TaskComponent from './task.component';
import TaskTemplate from './task.html';

describe('Task', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TaskModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TaskController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs

  });



  describe('Component', () => {
    // component/directive specs
    let component = TaskComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(TaskTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(TaskController);
    });
  });
});
