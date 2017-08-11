class NavbarController {
    constructor($state, todoService, localStorageService,$rootScope) {
        "ngInject";
        this.todoService = todoService;
        this._localStorageService = localStorageService;
        this.$state = $state;
        this.$rootScope = $rootScope;

        let vm=this;
        if(this._localStorageService.get('sessionId') && this._localStorageService.get('username')){
            vm.authUser=true;
        }
        $rootScope.$on('authUser',
            function (event, data) {
                vm.authUser = data.status;
            });

    }


    logOut() {


        if (confirm("Are you sure you want to logout?") == true) {
            this.sessionId = this._localStorageService .get('sessionId');
            this.todoService.logOut({sessionId:this.sessionId}).then(()=>{
                this._localStorageService.remove('sessionId');
                this._localStorageService.remove('username');
                this.$rootScope.$broadcast('authUser', {status: false});
                this.$state.go('login');
            });
        } else {

        }
    }

}

export default NavbarController;
