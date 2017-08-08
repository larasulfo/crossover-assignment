class TodoService {

    constructor($q, Restangular, localStorageService, notify,$state) {
        "ngInject";
        this._Restangular = Restangular;
        this._$q = $q;
        this._localStorageService = localStorageService;
        this.notify = notify;
        this.$state = $state;

    }

    checkLoginStatus() {
        let sessionId = this._localStorageService.get('sessionId');
        let username = this._localStorageService.get('username');
        if (!sessionId || !username) {
            this.$state.go('todo_app');
        } else {
            return sessionId;
        }
    }

    checkErrors(resp) {
        if (resp.status.toString() === '401') {
            this.notify({message: 'You must login to continue.', classes: 'alert-danger'});
            this._localStorageService.remove('sessionId');
            this._localStorageService.remove('username');
            this.$state.go('login');
        } else {
            this.notify({message: 'Something went wrong.', classes: 'alert-danger'});
        }
    }


    login(data) {
        let deferred = this._$q.defer();
        this._Restangular.all('user').all('auth').post(data).then((response) => {
            deferred.resolve(response);
        }).catch((e) => {
            deferred.reject(e);
        });

        return deferred.promise;
    }

    getTodos(skip, limit) {
        let deferred = this._$q.defer();
        let sessionId = this.checkLoginStatus();
        if (sessionId) {
            this._Restangular.one('todos').get({sessionId: sessionId, skip: skip, limit: limit}).then((response) => {


                let result={
                    notCompleted:[],
                    completed:[],
                };
                for(let todo of response.plain()){
                    if(todo.status=='notCompleted'){
                        result.notCompleted.push(todo);
                    }else if(todo.status=='completed'){
                        result.completed.push(todo);
                    }
                }

                deferred.resolve(result);

            }).catch((resp) => {

            this.checkErrors(resp);

            });
        }

        return deferred.promise;
    }



}

export default TodoService;