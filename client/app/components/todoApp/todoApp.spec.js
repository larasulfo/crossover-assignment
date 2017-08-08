import TodoAppModule from './todoApp';
import TodoAppController from './todoApp.controller';
import TodoAppComponent from './todoApp.component';
import TodoAppTemplate from './todoApp.html';

describe('TodoApp', () => {
  let $rootScope, makeController;

  beforeEach(window.module(TodoAppModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new TodoAppController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(TodoAppTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
    // component/directive specs
    let component = TodoAppComponent;

    it('includes the intended template', () => {
      expect(component.template).to.equal(TodoAppTemplate);
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(TodoAppController);
    });
  });
});
