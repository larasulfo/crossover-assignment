class LoginController {
    constructor($state, todoService, localStorageService, notify,$rootScope) {
        "ngInject";

        //injections
        this.$state = $state;
        this.todoService = todoService;
        this._localStorageService = localStorageService;
        this.notify = notify;
        this.$rootScope = $rootScope;

        //checking login status
        this.loading = true;
        this.sessionId = localStorageService.get('sessionId');
        this.username = localStorageService.get('username');
        if (this.sessionId && this.username) {
            this.$state.go('todo_app');
        } else {
            this.loading = false;
        }

    }

    submitLogin(loginForm) {
        //describing used services
        let notify = this.notify;
        let localStorageService = this._localStorageService;
        let $state = this.$state;
        let $rootScope = this.$rootScope;

        //sending api
        this.todoService.login(loginForm)
            .then(function (response,error) {

                if(response.status=='success'){
                    //defining auth user, and brodcasting to  navbar component
                let sessionId =response.sessionId ;
                let username =response.username ;
                localStorageService.set('sessionId', sessionId);
                localStorageService.set('username',  username);
                $rootScope.$broadcast('authUser', {status: true});

                //redirecting app page
                $state.go('todo_app');

                }else if(response.status=='error'){
                    //notifying user and refreshing page
                    notify({message: response.error, classes: 'alert-danger'});
                    $state.reload();
                }
            });
    }
}

export default LoginController;
