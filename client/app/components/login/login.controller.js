class LoginController {
    constructor($state, $http, todoService, localStorageService, $q, notify) {
        "ngInject";

        this.$state = $state;
        this.$http = $http;
        this.todoService = todoService;
        this._localStorageService = localStorageService;
        this._$q = $q;
        this.notify = notify;
        let token = localStorageService.get('authToken');
        // if (token) {
        //     $http.defaults.headers.common['Authorization'] = token;
        //     laabyApi.one('users', 'me').get().then((a) => {
        //         let user = a;
        //         if(user.type=='laaby'){
        //             user.type='admin';
        //         }
        //         let type = user.type;
        //         if (type === 'trainee') {
        //             $state.go('trainee.home');
        //         } else if (type === 'health_coach') {
        //             $state.go('health_coach.coach_panel');
        //         } else if (type == 'admin') {
        //             $state.go('admin.health_coaches');
        //         }
        //     });
        //
        //
        // } else {
        //     this.loading = false;
        // }

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
