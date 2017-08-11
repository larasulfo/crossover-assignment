import LoginModule from './login';
import LoginController from './login.controller';
import LoginComponent from './login.component';
import LoginTemplate from './login.html';

describe('Login', () => {
    let $componentController,$rootScope,$state;


    beforeEach(window.module(LoginModule));

    beforeEach(inject(($injector) => {
        $rootScope = $injector.get('$rootScope');
        $componentController = $injector.get('$componentController');
        $state = $injector.get('$state');

    }));


    describe('Module', () => {
        // top-level specs: i.e., routes, injection, naming
    });

    describe('Controller', () => {
        // controller specs

        let todoService = {
            login:(obj)=>{
                return new Promise(
                    ()=>{
                        resolve({username:obj.username, sessionId: '1234',status:'success'});
                    }
                );
            }
        };

        class localStorageService  {
            constructor(){
                this.sessionId=null;
                   this.username=null;
            }
            set (a, b)  {
                this[a] = b;
            }

            get (a){
                return this[a];
            }
        };

        let notify={};
        let scope={};
        let controller;
        beforeEach(() => {
            controller = $componentController('login', {
                $state: $state,
                todoService:todoService,
                localStorageService:new localStorageService(),
                notify:notify,
                $rootScope:$rootScope,
                $scope:scope
            });
        });

        describe('login', function () {
            it('should login', inject(function () {
                scope.$ctrl.submitLogin({username: 'ali', password: '1234'});

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
