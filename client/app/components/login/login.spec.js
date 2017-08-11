import LoginModule from './login';
import LoginController from './login.controller';
import LoginComponent from './login.component';
import LoginTemplate from './login.html';

describe('Login', () => {
    let makeController;

    beforeEach(window.module(LoginModule));
    beforeEach(window.module("app"));


    beforeEach(inject(() => {


        makeController = ($state, todoService, localStorageService, notify, $rootScope) => {
            return new LoginController($state, todoService, localStorageService, notify, $rootScope);
        };


    }));


    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        // controller specs
        describe('login', function () {
            it('should login', inject(function ($httpBackend, $state, $rootScope) {

                let todoService = {
                    login:(obj)=>{
                        return new Promise(
                            ()=>{
                                resolve({username:obj.username, sessionId: '1234',status:'success'});
                            }
                            );
                    }
                };
                let localStorageService = {
                    set:(a, b) => {
                        this[a] = b;
                    },
                    get: (a) => {
                        return this[a];
                    }

                };
                let notify = {};
                let LoginController = makeController($state, todoService, localStorageService, notify, $rootScope);


                LoginController.submitLogin({username: 'ali', password: '1234'});


                let username=localStorageService.get('username');

                    username.should.equal('ali');


            }));
        });

    });

    describe('Template', () => {
        // template specs

    });

    describe('Component', () => {
        // component/directive specs
        let component = LoginComponent;

        it('includes the intended template', () => {
            expect(component.template).to.equal(LoginTemplate);
        });

        it('invokes the right controller', () => {
            expect(component.controller).to.equal(LoginController);
        });
    });
});
