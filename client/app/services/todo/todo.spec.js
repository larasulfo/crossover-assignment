import TodoModule from './todo';
import TodoService from './todo.service';


describe('Todo', () => {
    let $rootScope, makeService;

    beforeEach(window.module(TodoModule));
    beforeEach(inject((_$rootScope_) => {
        $rootScope = _$rootScope_;
        makeService = () => {
            return new TodoService();
        };
    }));

    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Service', () => {
        // controller specs
        it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
            let service = makeService();
            expect(service).to.have.property('name');
        });
    });


});