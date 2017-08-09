class LoginController {
    constructor($state, todoService, localStorageService, notify,$rootScope) {
        "ngInject";

        this.$state = $state;
        this.todoService = todoService;
        this._localStorageService = localStorageService;
        this.notify = notify;
        this.$rootScope = $rootScope;

        this.loading = true;
        let sessionId = localStorageService.get('sessionId');
        let username = localStorageService.get('username');
        if (sessionId && username) {
            this.$state.go('todo_app');
        } else {
            this.loading = false;
        }

    }

    submitLogin(loginForm) {
        let notify = this.notify;
        let localStorageService = this._localStorageService;
        let $state = this.$state;
        let $rootScope = this.$rootScope;

        this.todoService.login(loginForm)
            .then(function (response,error) {

                if(response.status=='success'){
                let sessionId =response.sessionId ;
                let username =response.username ;
                localStorageService.set('sessionId', sessionId);
                localStorageService.set('username', username);
                $rootScope.$broadcast('authUser', {status: true});
                $state.go('todo_app');

                }else if(response.status=='error'){
                    notify({message: response.error, classes: 'alert-danger'});
                    $state.reload();
                }
            });
    }
}

export default LoginController;
