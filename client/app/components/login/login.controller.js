class LoginController {
    constructor($state, todoService, localStorageService, $q, notify) {
        "ngInject";

        this.$state = $state;
        this.todoService = todoService;
        this._localStorageService = localStorageService;
        this._$q = $q;
        this.notify = notify;

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

        this.todoService.login(loginForm)
            .then(function (response,error) {

                if(response.status=='success'){
                let sessionId =response.sessionId ;
                let username =response.username ;
                localStorageService.set('sessionId', sessionId);
                localStorageService.set('username', username);
                $state.go('todo_app');

                }else if(response.status=='error'){
                    notify({message: response.error, classes: 'alert-danger'});
                    $state.reload();
                }
            });
    }
}

export default LoginController;
