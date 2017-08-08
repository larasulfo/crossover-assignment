class TodoService {

    constructor($q, Restangular,localStorageService) {
        "ngInject";
        this._Restangular = Restangular;
        this._$q = $q;
        this._localStorageService = localStorageService;

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

}

export default TodoService;