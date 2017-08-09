class TodoService {

    constructor($q, Restangular, localStorageService, notify, $state) {
        "ngInject";
        this._Restangular = Restangular;
        this._$q = $q;
        this._localStorageService = localStorageService;
        this.notify = notify;
        this.$state = $state;

    }

    /**
     * before calls, checking login status
     */
    checkLoginStatus() {
        let sessionId = this._localStorageService.get('sessionId');
        let username = this._localStorageService.get('username');
        if (!sessionId || !username) {
            this.$state.go('todo_app');
        } else {
            return sessionId;
        }
    }

    /**
     * handling erros, if user is not auth, clearing local vars
     * @param resp
     */

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


    /**
     * login request
     * @param data
     * @returns {Function}
     */
    login(data) {
        let deferred = this._$q.defer();
        this._Restangular.all('user').all('auth').post(data).then((response) => {
            deferred.resolve(response);
        }).catch((e) => {
            deferred.reject(e);
        });

        return deferred.promise;
    }

    /**
     * logout request
     * @param data
     * @returns {Function}
     */
    logOut(data) {
        let deferred = this._$q.defer();
        this._Restangular.one('user').one('logout').get(data).then((response) => {
            deferred.resolve(response);
        }).catch((e) => {
            deferred.reject(e);
            this.checkErrors(e);
        });

        return deferred.promise;
    }

    /**
     * getting task list from api
     * @param skip
     * @param limit
     * @returns {Function}
     */
    getTodos(skip, limit) {
        let deferred = this._$q.defer();
        let sessionId = this.checkLoginStatus();
        if (sessionId) {
            this._Restangular.one('todos').get({sessionId: sessionId, skip: skip, limit: limit}).then((response) => {

                deferred.resolve(response);

            }).catch((resp) => {

                this.checkErrors(resp);

            });
        }

        return deferred.promise;
    }

    /**
     * it inserts and updates to the task.
     * formatting input object and sending with session id query paramteres
     * @param data
     * @returns {Function}
     */
    editTodo(data) {
        let deferred = this._$q.defer();
        let sessionId = this.checkLoginStatus();
        let todoObj = {
            id: data._id,
            title: data.title,
            description: data.description,
            status: data.status,
        };
        this._Restangular.one('todo').customPUT(todoObj, null, {sessionId: sessionId}).then((response) => {
            deferred.resolve(response);
        }).catch((e) => {
            deferred.reject(e);
            this.checkErrors(e);
        });

        return deferred.promise;
    }
    /**
     * it deletes to the task.
     * using id param of the task object, calling delete endpoint?sessionId with input object
     * @param data
     * @returns {Function}
     */

    apiDeleteTask(data) {
        let deferred = this._$q.defer();
        let sessionId = this.checkLoginStatus();
        let todoObj = {
            id: data._id,
        };
        this._Restangular.all('todo?sessionId=' + sessionId).customOperation("remove", null, null, null, todoObj).then((response) => {
            deferred.resolve(response);
        }).catch((e) => {
            deferred.reject(e);
            this.checkErrors(e);
        });

        return deferred.promise;
    }


}

export default TodoService;